"use client";
import { useState, useEffect } from "react";

export const usePLC = () => {
  const [running, setRunning] = useState(false);
  const [temperature, setTemperature] = useState(70);
  const [setpoint, setSetpoint] = useState(75);
  const [logs, setLogs] = useState<string[]>([]);
  const [alarmActive, setAlarmActive] = useState<boolean>(false);

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setTemperature((prev) => {
        let change = (setpoint - prev) * 0.1;

        return prev + change + (Math.random() * 2 - 1);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [running, setpoint]);

  useEffect(() => {
    if (temperature > 90 && !alarmActive) {
      setLogs(prev => [...prev,`ALARM: High temperature (${temperature.toFixed(1)}°C)`]);
      setAlarmActive(true);
    };

    if (temperature <= 90 && alarmActive) {
      setLogs(prev => [...prev, "ALARM CLEARED"]);
      setAlarmActive(false);
    }
  }, [temperature]);

  return {
    running,
    setRunning,
    temperature,
    setpoint,
    setSetpoint,
    alarmActive,
    logs
  };
};
