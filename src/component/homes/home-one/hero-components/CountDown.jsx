import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs-plugin-utc';
import countdownBox from '../assets/images/countdown-bg.png';

dayjs.extend(utc);

const CountdownItem = ({ value, label }) => {
  return (
    <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
      <div className="flex overflow-hidden relative flex-col grow px-14 py-7 font-semibold text-center text-white uppercase whitespace-nowrap shadow-sm aspect-[1.68] fill-slate-900 leading-[100%] md:px-5 md:py-3 sm:flex sm:items-center sm:justify-center">
        <img loading="lazy" src={countdownBox} className="absolute inset-0 w-full h-full" alt="" />
        {/* Adjust font size for different breakpoints */}
        <div className="relative text-4xl md:text-3xl sm:text-2xl">{value}</div>
        <div className="relative mt-3.5 text-2xl md:text-xl sm:text-lg">{label}</div>
      </div>
    </div>
  );
};

const Countdown = () => {
  const calculateTimeLeft = () => {
    const endDate = dayjs.utc('2024-04-02T20:30:00Z');
    const now = dayjs.utc();
    const difference = endDate.diff(now);

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const countdownValues = [
    { value: timeLeft.days, label: "days" },
    { value: timeLeft.hours, label: "hours" },
    { value: timeLeft.minutes, label: "minutes" },
    { value: timeLeft.seconds, label: "seconds" },
  ];

  return (
    <div className="relative px-px mt-6 max-md:mr-2 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        {countdownValues.map((value, index) => (
          <CountdownItem key={index} value={value.value} label={value.label} />
        ))}
      </div>
    </div>
  );
};

export default Countdown;
