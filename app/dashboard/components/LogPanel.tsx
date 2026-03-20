export const LogPanel = ({ logs }: { logs: string[] }) => {
  return (
    <div>
      <h3>Event Log</h3>
      <ul>
        {logs.slice(-5).map((log, i) => (
          <li key={i}>{log}</li>
        ))}
      </ul>
    </div>
  )
}