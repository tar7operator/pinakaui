'use client';

import { useState, useEffect } from "react";



const Time = () => {
  const [ctime, getTime] = useState("00:00:00");

  useEffect(() => {
    const intervalId = setInterval(() => {
      getTime(new Date().toLocaleTimeString('en-US', {
        hour12: false,
        hour: "numeric",
        minute: "numeric", second: "numeric"
      }));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  });
  return ctime
};

export default Time;

