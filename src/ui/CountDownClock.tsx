"use client"
import React from 'react';
import { useTimer } from 'react-timer-hook';

const CountdownClock = () => {
  // Set the expiration timestamp to 05/27/2024
  const expiryDate = new Date('2024-05-27T00:00:00');

  const {
    seconds,
    minutes,
    hours,
    days,
  } = useTimer({ expiryTimestamp: expiryDate, onExpire: () => console.warn('onExpire called') });

  return (
    <>
      <div className="time-count day">
        <span>{days}</span>days
      </div>
      <div className="time-count hour">
        <span>{hours}</span>hours
      </div>
      <div className="time-count min">
        <span>{minutes}</span>mins
      </div>
      <div className="time-count sec">
        <span>{seconds}</span>secs
      </div>
    </>
  );
}

export default CountdownClock;
