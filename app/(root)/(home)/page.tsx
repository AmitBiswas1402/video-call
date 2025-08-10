"use client";

import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import MeetingTypeList from "@/components/MeetingTypeList";

const Home = () => {
  const { user } = useUser();

  const now = new Date();
  const hours = now.getHours();

  const getGreeting = () => {
    if (hours < 12) return "Good morning ☀️";
    if (hours < 18) return "Good afternoon 🌤️";
    return "Good evening 🌙";
  };

  const getTimeEmoji = () => {
    if (hours < 6) return "🌌";
    if (hours < 12) return "🌞";
    if (hours < 18) return "☀️";
    return "🌆";
  };

  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(
    now
  );

  return (
    <section className="flex size-full flex-col gap-5 text-white">
      <div className="relative h-[303px] w-full rounded-[20px] overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/hero-background.png"
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />

        {/* Overlay */}
        <div className="absolute inset-0 flex flex-col justify-between bg-black/30 max-md:px-5 max-md:py-8 lg:p-11">
          {/* Dynamic Greeting */}
          <h2 className="glassmorphism max-w-max rounded font-sans py-2 px-4 text-center text-6xl font-extrabold">
            {getGreeting()} {user?.firstName || "Guest"}
          </h2>

          {/* Time & Date */}
          <div className="flex flex-col gap-2 ml-4 font-sans">
            <h1 className="text-4xl font-bold lg:text-3xl">
              {time} {getTimeEmoji()}
            </h1>
            <h5 className="text-slate-600 text-lg">
              Reload the page for updating clock
            </h5>
            <p className="text-lg font-medium text-sky-1 lg:text-xl">{date}</p>
          </div>
        </div>
      </div>

      <MeetingTypeList />
    </section>
  );
};

export default Home;
