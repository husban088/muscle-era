"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function LoadingOverlay({
  isLoading,
  onComplete,
}: {
  isLoading: boolean;
  onComplete: () => void;
}) {
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        onComplete();
      }, 1500); // 1.5s animation duration
      return () => clearTimeout(timer);
    }
  }, [isLoading, onComplete]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-[300] font-zen-dots">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.75 }}
      >
        <Image
          src="/images/logo.png"
          alt="Loading Logo"
          width={150}
          height={150}
          className="object-contain"
        />
      </motion.div>
    </div>
  );
}
