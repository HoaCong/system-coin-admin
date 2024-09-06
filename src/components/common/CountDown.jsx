/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

const CountDown = React.memo(({ seconds, callback }) => {
  const [time, setTime] = useState({
    hours: Math.floor(seconds / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: Math.round(seconds % 60),
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
        clearInterval(intervalId);
        callback();
      } else {
        setTime((prevTime) => {
          let newHours = prevTime.hours;
          let newMinutes = prevTime.minutes;
          let newSeconds = prevTime.seconds - 1;

          if (newSeconds < 0) {
            newMinutes -= 1;
            newSeconds = 59;

            if (newMinutes < 0) {
              newHours -= 1;
              newMinutes = 59;
            }
          }

          return {
            hours: newHours,
            minutes: newMinutes,
            seconds: newSeconds,
          };
        });
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [time]);

  return (
    <div className="text-center">
      <h1 className="d-inline-block box-countdown">
        {time.hours.toString().padStart(2, "0")}:
        {time.minutes.toString().padStart(2, "0")}:
        {time.seconds.toString().padStart(2, "0")}
      </h1>
    </div>
  );
});

export default CountDown;
