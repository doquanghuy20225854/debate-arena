/**
 * DebaterPanel Component Usage Examples
 */

import React, { useState } from 'react';
import DebaterPanel from './DebaterPanel';

// Example 1: Empty State
export const EmptyDebaterPanel = () => {
  return (
    <DebaterPanel
      debater={null}
      role="Debater 1"
      onJoin={() => console.log('Join as Debater 1')}
    />
  );
};

// Example 2: Idle State
export const IdleDebaterPanel = () => {
  const debater = {
    id: 1,
    username: 'debater1',
    avatar: null,
  };

  return (
    <DebaterPanel
      debater={debater}
      isActive={false}
      timeUsed={0}
      totalTime={60}
      argumentsCount={0}
      totalArguments={2}
      role="Debater 1"
    />
  );
};

// Example 3: Speaking State
export const SpeakingDebaterPanel = () => {
  const debater = {
    id: 1,
    username: 'debater1',
    avatar: null,
  };

  return (
    <DebaterPanel
      debater={debater}
      isActive={true}
      timeUsed={45}
      totalTime={60}
      argumentsCount={1}
      totalArguments={2}
      role="Debater 1"
    />
  );
};

// Example 4: Completed State
export const CompletedDebaterPanel = () => {
  const debater = {
    id: 1,
    username: 'debater1',
    avatar: null,
  };

  return (
    <DebaterPanel
      debater={debater}
      isActive={false}
      timeUsed={60}
      totalTime={60}
      argumentsCount={2}
      totalArguments={2}
      role="Debater 1"
    />
  );
};

// Example 5: With Avatar Image
export const DebaterPanelWithAvatar = () => {
  const debater = {
    id: 1,
    username: 'John Doe',
    avatar: 'https://i.pravatar.cc/150?img=1',
  };

  return (
    <DebaterPanel
      debater={debater}
      isActive={true}
      timeUsed={30}
      totalTime={60}
      argumentsCount={1}
      totalArguments={2}
      role="Debater 1"
    />
  );
};

// Example 6: Dynamic State Changes
export const DynamicDebaterPanel = () => {
  const [isActive, setIsActive] = useState(false);
  const [timeUsed, setTimeUsed] = useState(0);

  const debater = {
    id: 1,
    username: 'debater1',
    avatar: null,
  };

  return (
    <div>
      <DebaterPanel
        debater={debater}
        isActive={isActive}
        timeUsed={timeUsed}
        totalTime={60}
        argumentsCount={Math.floor(timeUsed / 30)}
        totalArguments={2}
        role="Debater 1"
      />
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button onClick={() => setIsActive(!isActive)}>
          {isActive ? 'Stop Speaking' : 'Start Speaking'}
        </button>
        <button onClick={() => setTimeUsed(Math.min(timeUsed + 10, 60))}>
          +10s
        </button>
        <button onClick={() => setTimeUsed(0)}>Reset</button>
      </div>
    </div>
  );
};

