/**
 * Timer Component Usage Examples
 * 
 * This file demonstrates how to use the Timer component in different scenarios
 */

import React, { useState } from 'react';
import Timer from './Timer';

// Example 1: Basic Timer
export const BasicTimerExample = () => {
  const [timeLeft, setTimeLeft] = useState(60);

  return (
    <Timer
      timeLeft={timeLeft}
      totalTime={60}
      onTimeUp={() => {
        console.log('Time is up!');
        alert('Time is up!');
      }}
      onTick={(newTime) => {
        setTimeLeft(newTime);
      }}
    />
  );
};

// Example 2: Timer with Pause Control
export const PausableTimerExample = () => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div>
      <Timer
        timeLeft={timeLeft}
        totalTime={60}
        isPaused={isPaused}
        onTimeUp={() => {
          console.log('Time is up!');
        }}
        onTick={(newTime) => {
          setTimeLeft(newTime);
        }}
      />
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button onClick={() => setIsPaused(!isPaused)}>
          {isPaused ? 'Resume' : 'Pause'}
        </button>
      </div>
    </div>
  );
};

// Example 3: Timer with Status Control
export const StatusTimerExample = () => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [status, setStatus] = useState('active');

  return (
    <div>
      <Timer
        timeLeft={timeLeft}
        totalTime={60}
        status={status}
        onTimeUp={() => {
          setStatus('ended');
          console.log('Time is up!');
        }}
        onTick={(newTime) => {
          setTimeLeft(newTime);
        }}
      />
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button onClick={() => setStatus('paused')}>Pause</button>
        <button onClick={() => setStatus('active')}>Resume</button>
        <button onClick={() => setStatus('ended')}>Stop</button>
      </div>
    </div>
  );
};

// Example 4: Custom Size Timer
export const CustomSizeTimerExample = () => {
  const [timeLeft, setTimeLeft] = useState(30);

  return (
    <Timer
      timeLeft={timeLeft}
      totalTime={30}
      size={200}
      showSecondsLabel={false}
      onTimeUp={() => {
        console.log('Time is up!');
      }}
      onTick={(newTime) => {
        setTimeLeft(newTime);
      }}
    />
  );
};

