/**
 * VotingPanel Component Usage Examples
 */

import React, { useState } from 'react';
import VotingPanel from './VotingPanel';

// Example 1: Basic Voting Panel
export const BasicVotingPanel = () => {
  const [hasVoted, setHasVoted] = useState(false);
  const [votedFor, setVotedFor] = useState(null);
  const [votes, setVotes] = useState({ debater1: 5, debater2: 8 });

  const debaters = [
    {
      id: 'debater1',
      username: 'debater1',
      totalTime: 120,
      argumentsCount: 2,
      argumentPreview: 'AI regulation is necessary to protect society...',
    },
    {
      id: 'debater2',
      username: 'debater2',
      totalTime: 115,
      argumentsCount: 2,
      argumentPreview: 'Over-regulation will stifle innovation...',
    },
  ];

  const handleVote = (debaterId) => {
    setHasVoted(true);
    setVotedFor(debaterId);
    setVotes((prev) => ({
      ...prev,
      [debaterId]: prev[debaterId] + 1,
    }));
  };

  return (
    <VotingPanel
      debaters={debaters}
      onVote={handleVote}
      timeLeft={25}
      currentVotes={votes}
      hasVoted={hasVoted}
      votedFor={votedFor}
      onClose={() => console.log('Close')}
    />
  );
};

// Example 2: With Results
export const VotingPanelWithResults = () => {
  const [showResults, setShowResults] = useState(false);

  const debaters = [
    {
      id: 'debater1',
      username: 'John Doe',
      totalTime: 120,
      argumentsCount: 2,
    },
    {
      id: 'debater2',
      username: 'Jane Smith',
      totalTime: 115,
      argumentsCount: 2,
    },
  ];

  return (
    <VotingPanel
      debaters={debaters}
      timeLeft={0}
      currentVotes={{ debater1: 18, debater2: 12 }}
      hasVoted={true}
      votedFor="debater1"
      showResults={showResults}
      onViewReplay={() => console.log('View replay')}
      onBackToHome={() => console.log('Back to home')}
    />
  );
};

// Example 3: Real-time Updates
export const VotingPanelRealTime = () => {
  const [votes, setVotes] = useState({ debater1: 10, debater2: 15 });
  const [timeLeft, setTimeLeft] = useState(30);

  // Simulate real-time vote updates
  React.useEffect(() => {
    const interval = setInterval(() => {
      setVotes((prev) => ({
        debater1: prev.debater1 + Math.floor(Math.random() * 2),
        debater2: prev.debater2 + Math.floor(Math.random() * 2),
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const debaters = [
    {
      id: 'debater1',
      username: 'debater1',
      totalTime: 120,
      argumentsCount: 2,
    },
    {
      id: 'debater2',
      username: 'debater2',
      totalTime: 115,
      argumentsCount: 2,
    },
  ];

  return (
    <VotingPanel
      debaters={debaters}
      onVote={(id) => console.log('Voted for:', id)}
      timeLeft={timeLeft}
      currentVotes={votes}
      hasVoted={false}
      onClose={() => console.log('Close')}
    />
  );
};

