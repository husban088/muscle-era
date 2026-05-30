"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { XMarkIcon, CheckIcon } from "@heroicons/react/24/solid";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Customer {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

interface Message {
  id: string;
  customer_id: string;
  sender: "customer" | "admin";
  message: string;
  created_at: string;
  seen: boolean;
}

export default function Chat({ toggleChat }: { toggleChat: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [customerId, setCustomerId] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("customerId");
    }
    return null;
  });
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAdminView, setIsAdminView] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(
    null
  );

  // Hardcoded admin email (replace with Supabase Auth in production)
  const ADMIN_EMAIL = "husbanahmad099@gmail.com";

  // Load customerId and customer data
  useEffect(() => {
    const storedCustomerId = localStorage.getItem("customerId");
    if (storedCustomerId && !customerId && !isAdminView) {
      setCustomerId(storedCustomerId);
      const fetchCustomer = async () => {
        try {
          const { data, error } = await supabase
            .from("customers")
            .select("name, email")
            .eq("id", storedCustomerId)
            .single();
          if (error) throw error;
          if (data) {
            setName(data.name);
            setEmail(data.email);
          }
        } catch (error: unknown) {
          setError("Failed to fetch customer data");
          console.error("Fetch customer error:", error);
        }
      };
      fetchCustomer();
    }
  }, [customerId, isAdminView]);

  // Load customers for admin view
  useEffect(() => {
    if (!isAdmin) return;

    const fetchCustomers = async () => {
      try {
        const { data, error } = await supabase
          .from("customers")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw error;
        setCustomers(data || []);
      } catch (error: unknown) {
        setError("Failed to load customers");
        console.error("Fetch customers error:", error);
      }
    };

    fetchCustomers();

    // Real-time subscription for new customers
    const subscription = supabase
      .channel("customers_channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "customers" },
        (payload) => {
          setCustomers((prev) => [payload.new as Customer, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [isAdmin]);

  // Load messages and handle real-time updates
  useEffect(() => {
    const currentCustomerId = isAdmin ? selectedCustomerId : customerId;
    if (!currentCustomerId) {
      setMessages([]);
      return;
    }

    const fetchMessages = async () => {
      try {
        const { data, error } = await supabase
          .from("messages")
          .select("*")
          .eq("customer_id", currentCustomerId)
          .order("created_at", { ascending: true });
        if (error) throw error;
        setMessages(data || []);

        // Mark unseen messages as seen
        const unseenMessages = data?.filter(
          (msg) => !msg.seen && msg.sender !== (isAdmin ? "admin" : "customer")
        );
        if (unseenMessages?.length) {
          await supabase
            .from("messages")
            .update({ seen: true })
            .in(
              "id",
              unseenMessages.map((msg) => msg.id)
            );
        }
      } catch (error: unknown) {
        setError("Failed to load messages");
        console.error("Fetch messages error:", error);
      }
    };

    fetchMessages();

    const subscription = supabase
      .channel(`messages_${currentCustomerId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
          filter: `customer_id=eq.${currentCustomerId}`,
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setMessages((prev) => [...prev, payload.new as Message]);
            if (
              (isAdmin && payload.new.sender === "customer") ||
              (!isAdmin && payload.new.sender === "admin")
            ) {
              supabase
                .from("messages")
                .update({ seen: true })
                .eq("id", payload.new.id)
                .then(({ error }) => {
                  if (error) {
                    console.error("Mark seen error:", error);
                    return;
                  }
                  setMessages((prev) =>
                    prev.map((msg) =>
                      msg.id === payload.new.id ? { ...msg, seen: true } : msg
                    )
                  );
                });
            }
          } else if (payload.eventType === "UPDATE") {
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === payload.new.id ? (payload.new as Message) : msg
              )
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [customerId, selectedCustomerId, isAdmin]);

  const handleSubmitDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setError("Please enter your name and email");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from("customers")
        .upsert({ name, email, id: customerId || undefined })
        .select()
        .single();
      if (error) throw error;
      setCustomerId(data.id);
      if (typeof window !== "undefined") {
        localStorage.setItem("customerId", data.id);
      }
    } catch (error: unknown) {
      setError("Failed to save details");
      console.error("Save details error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      setError("Please enter a message");
      return;
    }
    if (isAdmin && !selectedCustomerId) {
      setError("Please select a customer");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const { error } = await supabase.from("messages").insert({
        customer_id: isAdmin ? selectedCustomerId : customerId,
        sender: isAdmin ? "admin" : "customer",
        message: message.trim(),
        seen: false,
      });
      if (error) throw error;
      setMessage("");
    } catch (error: unknown) {
      setError("Failed to send message");
      console.error("Send message error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminEmail === ADMIN_EMAIL) {
      setIsAdmin(true);
      setIsAdminView(true);
      setError(null);
    } else {
      setError("Invalid admin email");
    }
  };

  const handleToggleView = () => {
    setIsAdminView(!isAdminView);
    setError(null);
    setAdminEmail("");
    setSelectedCustomerId(null);
    setMessages([]);
    if (!isAdminView) {
      setCustomerId(null);
      if (typeof window !== "undefined") {
        localStorage.removeItem("customerId");
      }
    }
  };

  return (
    <div className="p-4 h-96 flex flex-col bg-white rounded-t-md shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">
          {isAdmin && selectedCustomerId
            ? `Chat with ${
                customers.find((c) => c.id === selectedCustomerId)?.name ||
                "Customer"
              }`
            : `Chat with Husban Ahmad${name ? ` (${name})` : ""}`}
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleView}
            className="text-sm text-teal-500 hover:underline"
          >
            {isAdminView ? "Switch to Customer" : "Admin Login"}
          </button>
          <button onClick={toggleChat} className="text-gray-800">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
      {isAdminView && !isAdmin ? (
        <form
          onSubmit={handleAdminLogin}
          className="flex flex-col gap-4 flex-grow"
        >
          <div>
            <label className="block text-gray-800 mb-1">Admin Email</label>
            <input
              type="email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              placeholder="Enter admin email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Login
          </button>
        </form>
      ) : isAdmin ? (
        <div className="flex flex-col flex-grow">
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-800 mb-2">
              Customers
            </h4>
            <ul className="space-y-2 max-h-24 overflow-y-auto">
              {customers.map((customer) => (
                <li
                  key={customer.id}
                  onClick={() => setSelectedCustomerId(customer.id)}
                  className={`p-2 cursor-pointer rounded-md ${
                    selectedCustomerId === customer.id
                      ? "bg-teal-100"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <p className="text-gray-800 font-semibold">{customer.name}</p>
                  <p className="text-gray-600 text-xs">{customer.email}</p>
                </li>
              ))}
            </ul>
          </div>
          {selectedCustomerId ? (
            <div className="flex flex-col flex-grow">
              <div className="flex-grow overflow-y-auto mb-4 p-2 border rounded-md bg-gray-50">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`mb-2 p-2 rounded-md ${
                      msg.sender === "customer"
                        ? "bg-teal-100 ml-auto max-w-[80%]"
                        : "bg-gray-200 max-w-[80%]"
                    }`}
                  >
                    <p className="text-sm">
                      <strong>
                        {msg.sender === "customer"
                          ? customers.find((c) => c.id === msg.customer_id)
                              ?.name || "Customer"
                          : "Husban Ahmad"}
                        :
                      </strong>{" "}
                      {msg.message}
                    </p>
                    <div className="flex items-center justify-end gap-1">
                      <p className="text-xs text-gray-500">
                        {new Date(msg.created_at).toLocaleString("en-US", {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      <div className="flex items-center">
                        <CheckIcon
                          className={`h-3 w-3 ${
                            msg.seen ? "text-blue-500" : "text-gray-500"
                          }`}
                        />
                        <CheckIcon
                          className={`h-3 w-3 ${
                            msg.seen ? "text-blue-500" : "text-gray-500"
                          }`}
                        />
                        {msg.seen && (
                          <span className="text-xs text-blue-500 ml-1">
                            Seen
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your response..."
                  className="flex-grow px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Send
                </button>
              </form>
            </div>
          ) : (
            <p className="text-gray-800 flex-grow">
              Select a customer to view messages
            </p>
          )}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
      ) : !customerId ? (
        <form
          onSubmit={handleSubmitDetails}
          className="flex flex-col gap-4 flex-grow"
        >
          <div>
            <label className="block text-gray-800 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-gray-800 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Start Chat
          </button>
        </form>
      ) : (
        <div className="flex flex-col flex-grow">
          <div className="flex-grow overflow-y-auto mb-4 p-2 border rounded-md bg-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`mb-2 p-2 rounded-md ${
                  msg.sender === "customer"
                    ? "bg-teal-100 ml-auto max-w-[80%]"
                    : "bg-gray-200 max-w-[80%]"
                }`}
              >
                <p className="text-sm">
                  <strong>
                    {msg.sender === "customer" ? name : "Husban Ahmad"}:
                  </strong>{" "}
                  {msg.message}
                </p>
                <div className="flex items-center justify-end gap-1">
                  <p className="text-xs text-gray-500">
                    {new Date(msg.created_at).toLocaleString("en-US", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  {msg.sender === "customer" && (
                    <div className="flex items-center">
                      <CheckIcon
                        className={`h-3 w-3 ${
                          msg.seen ? "text-blue-500" : "text-gray-500"
                        }`}
                      />
                      <CheckIcon
                        className={`h-3 w-3 ${
                          msg.seen ? "text-blue-500" : "text-gray-500"
                        }`}
                      />
                      {msg.seen && (
                        <span className="text-xs text-blue-500 ml-1">Seen</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Send
            </button>
          </form>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
      )}
    </div>
  );
}
