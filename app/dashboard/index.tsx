"use client"
import { LogPanel } from "./components/LogPanel";
import { usePLC } from "./components/usePLC"

export const Dashboard = () => {
  const {
    running,
    setRunning,
    temperature,
    setpoint,
    setSetpoint,
    alarmActive,
    logs
  } = usePLC();

  return (
    <div style={{ padding: 20 }} className="flex flex-col border border-gray-500 bg-gray-600 rounded">
      <h1 className="font-semibold">SCADA Dashboard</h1>

      <p>Temperature: {temperature.toFixed(1)} °C</p>
      <p>Setpoint: {setpoint} °C</p>

      <p style={{ color: alarmActive ? "red" : "green" }}>
        Status: {alarmActive ? "ALARM" : "OK"}
      </p>

      <button className="bg-white text-black px-2 py-1 rounded" onClick={() => setRunning(!running)}>
        {running ? "Stop" : "Start"}
      </button>

      <label className="flex flex-col">Temperature:
        <input
          type="range"
          min="50"
          max="100"
          value={setpoint}
          onChange={(e) => setSetpoint(Number(e.target.value))}
        />
      </label>
      <div className="mt-5">
        <LogPanel logs={logs}/>
      </div>
    </div>
  );
}