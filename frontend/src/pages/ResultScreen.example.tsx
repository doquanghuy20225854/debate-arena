import React from 'react';
import { useNavigate } from 'react-router-dom';
import ResultScreen from './ResultScreen';

/**
 * Example usage of ResultScreen component
 * 
 * This demonstrates how to use the ResultScreen component
 * with real data from a debate session.
 */

const ResultScreenExample: React.FC = () => {
  const navigate = useNavigate();

  // Example data from a completed debate
  const debateData = {
    topic: 'Should AI replace human jobs?',
    debater1: {
      id: 1,
      username: 'Alex Johnson',
      avatar: undefined, // or URL to avatar image
      votes: 18,
      totalSpeakingTime: 420, // seconds
      turnsCompleted: 3,
      averageArgumentLength: 150, // words
      audienceEngagement: 45, // chat messages
    },
    debater2: {
      id: 2,
      username: 'Sarah Chen',
      avatar: undefined,
      votes: 12,
      totalSpeakingTime: 380,
      turnsCompleted: 3,
      averageArgumentLength: 180,
      audienceEngagement: 52,
    },
    totalVotes: 30,
    keyArguments: [
      {
        debater: 'Alex Johnson',
        argument: 'AI can handle repetitive tasks more efficiently, freeing humans for creative work.',
      },
      {
        debater: 'Sarah Chen',
        argument: 'Mass job displacement will create economic inequality and social unrest.',
      },
      {
        debater: 'Alex Johnson',
        argument: 'Historical precedent shows technology creates more jobs than it destroys.',
      },
      {
        debater: 'Sarah Chen',
        argument: 'The transition period will be too painful for millions of workers.',
      },
    ],
    mostEngagingMoment: {
      timestamp: '12:34 PM',
      description: 'Audience discussion about universal basic income during Q&A session',
    },
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleViewTranscript = () => {
    // Navigate to transcript page or open modal
    console.log('View transcript');
    // navigate('/transcript');
  };

  return (
    <ResultScreen
      topic={debateData.topic}
      debater1={debateData.debater1}
      debater2={debateData.debater2}
      totalVotes={debateData.totalVotes}
      keyArguments={debateData.keyArguments}
      mostEngagingMoment={debateData.mostEngagingMoment}
      onBackToHome={handleBackToHome}
      onViewTranscript={handleViewTranscript}
    />
  );
};

export default ResultScreenExample;

/**
 * Integration with DebateRoom:
 * 
 * When the debate ends and voting is complete, navigate to ResultScreen:
 * 
 * ```tsx
 * import { useNavigate } from 'react-router-dom';
 * 
 * const navigate = useNavigate();
 * 
 * // After voting ends
 * const handleVotingComplete = (results) => {
 *   navigate('/results', {
 *     state: {
 *       topic: debateTopic,
 *       debater1: {
 *         id: debater1.id,
 *         username: debater1.username,
 *         votes: results.debater1Votes,
 *         totalSpeakingTime: debater1.totalTime,
 *         turnsCompleted: debater1.turnsCompleted,
 *         averageArgumentLength: debater1.avgArgumentLength,
 *         audienceEngagement: debater1.engagementScore,
 *       },
 *       debater2: {
 *         id: debater2.id,
 *         username: debater2.username,
 *         votes: results.debater2Votes,
 *         totalSpeakingTime: debater2.totalTime,
 *         turnsCompleted: debater2.turnsCompleted,
 *         averageArgumentLength: debater2.avgArgumentLength,
 *         audienceEngagement: debater2.engagementScore,
 *       },
 *       totalVotes: results.totalVotes,
 *       keyArguments: debateArguments,
 *       mostEngagingMoment: mostEngagingMoment,
 *     },
 *   });
 * };
 * ```
 * 
 * Then in ResultScreen route:
 * 
 * ```tsx
 * import { useLocation } from 'react-router-dom';
 * 
 * const location = useLocation();
 * const results = location.state;
 * 
 * <ResultScreen {...results} />
 * ```
 */

