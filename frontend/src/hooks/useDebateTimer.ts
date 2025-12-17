import { useState, useEffect } from 'react';

const useDebateTimer = (initial = 60) => {
  const [time, setTime] = useState<number>(initial);
  const [running, setRunning] = useState<boolean>(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setTime(t => Math.max(0, t - 1)), 1000);
    return () => clearInterval(id);
  }, [running]);

  return { time, running, setRunning, setTime } as const;
};

export default useDebateTimer;
