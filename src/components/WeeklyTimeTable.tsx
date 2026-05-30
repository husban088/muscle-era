"use client";

interface ClassSchedule {
  time: string;
  class: string;
  color: string;
}

interface DaySchedule {
  [day: string]: ClassSchedule | undefined;
}

interface Schedule {
  [time: string]: DaySchedule;
}

export default function WeeklyTimeTable() {
  const times = ["9am", "10am", "11am", "1pm", "4pm", "6pm"];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const schedule: Schedule = {
    "9am": {
      Mon: { time: "9am-10am", class: "Fitness", color: "text-blue-400" },
      Tue: { time: "9am-10am", class: "Boxing", color: "text-red-400" },
      Wed: { time: "9am-10am", class: "Cycling", color: "text-yellow-400" },
    },
    "10am": {
      Mon: {
        time: "10am-11am",
        class: "Bodybuilding",
        color: "text-green-400",
      },
      Fri: { time: "10am-11am", class: "Karate", color: "text-purple-400" },
      Sat: {
        time: "10am-11am",
        class: "Bodybuilding",
        color: "text-green-400",
      },
    },
    "11am": {
      Wed: {
        time: "11am-12pm",
        class: "Bodybuilding",
        color: "text-green-400",
      },
    },
    "1pm": {
      Wed: { time: "1pm-2pm", class: "Bodybuilding", color: "text-green-400" },
      Thu: { time: "1pm", class: "Boxing", color: "text-red-400" },
      Fri: { time: "1pm-2pm", class: "Meditation", color: "text-cyan-400" },
      Sat: { time: "1pm-2pm", class: "Boxing", color: "text-red-400" },
    },
    "4pm": {
      Mon: { time: "4pm-5pm", class: "Running", color: "text-orange-400" },
      Wed: { time: "4pm-5pm", class: "Running", color: "text-orange-400" },
      Sun: { time: "4pm-5pm", class: "Running", color: "text-orange-400" },
    },
    "6pm": {
      Mon: { time: "6pm-7pm", class: "Fitness", color: "text-blue-400" },
    },
  };

  return (
    <section
      className="bg-[#eee] py-16 relative"
      //   style={{
      //     backgroundImage: "url('/images/bgimg.jpg')",
      //     backgroundPosition: "top right",
      //     backgroundRepeat: "no-repeat",
      //     backgroundSize: "contain",
      //   }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-black mb-4">
          Time & Table
        </h2>
        <h3 className="text-xl md:text-2xl font-semibold text-center text-black mb-4">
          Weekly Class Schedule
        </h3>
        <p className="text-black text-center mb-8">
          Gymat an unknown printer took a galley of type and scrambled make a
          type specimen book.
        </p>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-700 p-4 bg-[#171717] text-white"></th>
                {days.map((day) => (
                  <th
                    key={day}
                    className="border border-gray-700 p-4 bg-[#171717] font-semibold text-white"
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {times.map((time) => (
                <tr key={time}>
                  <td className="border border-gray-700 p-4 bg-[#171717] font-semibold text-white">
                    {time}
                  </td>
                  {days.map((day) => (
                    <td
                      key={`${time}-${day}`}
                      className="border border-gray-700 p-4 text-center bg-[#111111]"
                    >
                      {schedule[time]?.[day] ? (
                        <div className="p-2 rounded-md">
                          <p className="text-white font-semibold">
                            {schedule[time][day].time}
                          </p>
                          <p className={schedule[time][day].color}>
                            {schedule[time][day].class}
                          </p>
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
