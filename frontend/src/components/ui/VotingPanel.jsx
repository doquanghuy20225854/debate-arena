import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './VotingPanel.css';

/**
 * VotingPanel Component - Modal for voting on debate winner
 * 
 * Features:
 * - Modal overlay with backdrop
 * - Two debater voting cards
 * - Real-time vote updates
 * - Timer countdown
 * - Results screen
 * - Confetti animations
 */

const VotingPanel = ({
  debaters = [],
  onVote,
  timeLeft: initialTimeLeft = 30,
  currentVotes = { debater1: 0, debater2: 0 },
  hasVoted = false,
  votedFor = null,
  onClose,
  showResults = false,
  onViewReplay,
  onBackToHome,
}) => {
  const [timeLeft, setTimeLeft] = useState(initialTimeLeft);
  const [localVotes, setLocalVotes] = useState(currentVotes);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const intervalRef = useRef(null);
  const confettiTimeoutRef = useRef(null);

  // Update local votes when prop changes
  useEffect(() => {
    setLocalVotes(currentVotes);
  }, [currentVotes]);

  // Countdown timer
  useEffect(() => {
    if (showResults || timeLeft <= 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [showResults, timeLeft]);

  // Show confetti when results are shown
  useEffect(() => {
    if (showResults) {
      setShowConfetti(true);
      confettiTimeoutRef.current = setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
    }

    return () => {
      if (confettiTimeoutRef.current) {
        clearTimeout(confettiTimeoutRef.current);
      }
    };
  }, [showResults]);

  const handleVote = (debaterId) => {
    if (hasVoted || timeLeft <= 0) return;
    
    // Optimistic update
    setLocalVotes((prev) => ({
      ...prev,
      [debaterId]: (prev[debaterId] || 0) + 1,
    }));

    if (onVote) {
      onVote(debaterId);
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      if (onClose) {
        onClose();
      }
    }, 300);
  };

  const getTimerColor = () => {
    if (timeLeft > 20) return 'green';
    if (timeLeft > 10) return 'yellow';
    return 'red';
  };

  const getTotalVotes = () => {
    return (localVotes.debater1 || 0) + (localVotes.debater2 || 0);
  };

  const getVotePercentage = (debaterId) => {
    const total = getTotalVotes();
    if (total === 0) return 0;
    return ((localVotes[debaterId] || 0) / total) * 100;
  };

  const getWinner = () => {
    if (!showResults) return null;
    const votes1 = localVotes.debater1 || 0;
    const votes2 = localVotes.debater2 || 0;
    if (votes1 > votes2) return debaters[0];
    if (votes2 > votes1) return debaters[1];
    return null; // Tie
  };

  const winner = getWinner();
  const debater1 = debaters[0] || {};
  const debater2 = debaters[1] || {};

  const getInitials = (username) => {
    if (!username) return '';
    return username
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (isClosing) {
    return null;
  }

  return (
    <div className="voting-panel-overlay" onClick={handleClose}>
      <div
        className="voting-panel-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {showResults ? (
          /* Results Screen */
          <div className="voting-panel-results">
            {winner && (
              <>
                <div className="voting-panel-winner-announcement">
                  <div className="voting-panel-winner-avatar-wrapper">
                    <div className="voting-panel-winner-avatar">
                      {winner.avatar ? (
                        <img src={winner.avatar} alt={winner.username} />
                      ) : (
                        <span>{getInitials(winner.username)}</span>
                      )}
                    </div>
                    <div className="voting-panel-crown">👑</div>
                  </div>
                  <h2 className="voting-panel-winner-title">
                    🎉 {winner.username} Wins!
                  </h2>
                  <div className="voting-panel-final-score">
                    {localVotes.debater1 || 0} - {localVotes.debater2 || 0}
                  </div>
                </div>

                {/* Stats Comparison */}
                <div className="voting-panel-stats-table">
                  <div className="voting-panel-stat-row">
                    <div className="voting-panel-stat-label">Total Speaking Time</div>
                    <div className="voting-panel-stat-values">
                      <span>{debater1.totalTime || 0}s</span>
                      <span>{debater2.totalTime || 0}s</span>
                    </div>
                  </div>
                  <div className="voting-panel-stat-row">
                    <div className="voting-panel-stat-label">Arguments Made</div>
                    <div className="voting-panel-stat-values">
                      <span>{debater1.argumentsCount || 0}</span>
                      <span>{debater2.argumentsCount || 0}</span>
                    </div>
                  </div>
                  <div className="voting-panel-stat-row">
                    <div className="voting-panel-stat-label">Votes Received</div>
                    <div className="voting-panel-stat-values">
                      <span>{localVotes.debater1 || 0}</span>
                      <span>{localVotes.debater2 || 0}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="voting-panel-results-actions">
                  {onViewReplay && (
                    <button
                      className="voting-panel-button voting-panel-button-primary"
                      onClick={onViewReplay}
                    >
                      📹 View Debate Replay
                    </button>
                  )}
                  {onBackToHome && (
                    <button
                      className="voting-panel-button voting-panel-button-outline"
                      onClick={onBackToHome}
                    >
                      🏠 Back to Home
                    </button>
                  )}
                </div>
              </>
            )}

            {!winner && (
              <div className="voting-panel-tie">
                <h2 className="voting-panel-tie-title">🤝 It's a Tie!</h2>
                <div className="voting-panel-final-score">
                  {localVotes.debater1 || 0} - {localVotes.debater2 || 0}
                </div>
                <p className="voting-panel-tie-text">
                  Both debaters received equal votes!
                </p>
                <div className="voting-panel-results-actions">
                  {onBackToHome && (
                    <button
                      className="voting-panel-button voting-panel-button-primary"
                      onClick={onBackToHome}
                    >
                      🏠 Back to Home
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Voting Screen */
          <>
            {/* Header */}
            <div className="voting-panel-header">
              <h2 className="voting-panel-title">🏆 Vote for the Winner</h2>
              <p className="voting-panel-subtitle">
                Who presented the better argument?
              </p>
              
              {/* Timer */}
              <div className="voting-panel-timer">
                <span className="voting-panel-timer-icon">⏱️</span>
                <span className="voting-panel-timer-text">
                  {timeLeft} seconds remaining
                </span>
                <div className="voting-panel-timer-progress">
                  <div
                    className={`voting-panel-timer-progress-bar voting-panel-timer-${getTimerColor()}`}
                    style={{ width: `${(timeLeft / initialTimeLeft) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Voting Cards */}
            <div className="voting-panel-cards">
              {/* Debater 1 Card */}
              <div className="voting-panel-card">
                <div className="voting-panel-card-avatar">
                  {debater1.avatar ? (
                    <img src={debater1.avatar} alt={debater1.username} />
                  ) : (
                    <span>{getInitials(debater1.username)}</span>
                  )}
                </div>
                <h3 className="voting-panel-card-username">{debater1.username}</h3>
                
                {/* Stats Summary */}
                <div className="voting-panel-card-stats">
                  <div className="voting-panel-card-stat">
                    <span className="voting-panel-card-stat-icon">⏱️</span>
                    <span className="voting-panel-card-stat-text">
                      {debater1.totalTime || 0}s
                    </span>
                  </div>
                  <div className="voting-panel-card-stat">
                    <span className="voting-panel-card-stat-icon">💬</span>
                    <span className="voting-panel-card-stat-text">
                      {debater1.argumentsCount || 0} arguments
                    </span>
                  </div>
                </div>

                {/* Argument Preview */}
                {debater1.argumentPreview && (
                  <div className="voting-panel-card-preview">
                    "{debater1.argumentPreview}"
                  </div>
                )}

                {/* Vote Button */}
                <button
                  className={`voting-panel-vote-button ${
                    hasVoted && votedFor === debater1.id
                      ? 'voting-panel-vote-button-voted'
                      : ''
                  }`}
                  onClick={() => handleVote(debater1.id)}
                  disabled={hasVoted || timeLeft <= 0}
                >
                  {hasVoted && votedFor === debater1.id ? (
                    <>
                      <span>✓</span> You Voted
                    </>
                  ) : (
                    'Vote'
                  )}
                </button>

                {/* Vote Count */}
                <div className="voting-panel-vote-count">
                  <span className="voting-panel-vote-count-icon">🔥</span>
                  <span className="voting-panel-vote-count-number">
                    {localVotes.debater1 || 0}
                  </span>
                  <span className="voting-panel-vote-count-label">votes</span>
                </div>
              </div>

              {/* Debater 2 Card */}
              <div className="voting-panel-card">
                <div className="voting-panel-card-avatar">
                  {debater2.avatar ? (
                    <img src={debater2.avatar} alt={debater2.username} />
                  ) : (
                    <span>{getInitials(debater2.username)}</span>
                  )}
                </div>
                <h3 className="voting-panel-card-username">{debater2.username}</h3>
                
                {/* Stats Summary */}
                <div className="voting-panel-card-stats">
                  <div className="voting-panel-card-stat">
                    <span className="voting-panel-card-stat-icon">⏱️</span>
                    <span className="voting-panel-card-stat-text">
                      {debater2.totalTime || 0}s
                    </span>
                  </div>
                  <div className="voting-panel-card-stat">
                    <span className="voting-panel-card-stat-icon">💬</span>
                    <span className="voting-panel-card-stat-text">
                      {debater2.argumentsCount || 0} arguments
                    </span>
                  </div>
                </div>

                {/* Argument Preview */}
                {debater2.argumentPreview && (
                  <div className="voting-panel-card-preview">
                    "{debater2.argumentPreview}"
                  </div>
                )}

                {/* Vote Button */}
                <button
                  className={`voting-panel-vote-button ${
                    hasVoted && votedFor === debater2.id
                      ? 'voting-panel-vote-button-voted'
                      : ''
                  }`}
                  onClick={() => handleVote(debater2.id)}
                  disabled={hasVoted || timeLeft <= 0}
                >
                  {hasVoted && votedFor === debater2.id ? (
                    <>
                      <span>✓</span> You Voted
                    </>
                  ) : (
                    'Vote'
                  )}
                </button>

                {/* Vote Count */}
                <div className="voting-panel-vote-count">
                  <span className="voting-panel-vote-count-icon">🔥</span>
                  <span className="voting-panel-vote-count-number">
                    {localVotes.debater2 || 0}
                  </span>
                  <span className="voting-panel-vote-count-label">votes</span>
                </div>
              </div>
            </div>

            {/* Vote Distribution Bar */}
            <div className="voting-panel-distribution">
              <div className="voting-panel-distribution-bar">
                <div
                  className="voting-panel-distribution-segment voting-panel-distribution-debater1"
                  style={{ width: `${getVotePercentage('debater1')}%` }}
                >
                  {getVotePercentage('debater1') > 10 && (
                    <span className="voting-panel-distribution-percentage">
                      {Math.round(getVotePercentage('debater1'))}%
                    </span>
                  )}
                </div>
                <div
                  className="voting-panel-distribution-segment voting-panel-distribution-debater2"
                  style={{ width: `${getVotePercentage('debater2')}%` }}
                >
                  {getVotePercentage('debater2') > 10 && (
                    <span className="voting-panel-distribution-percentage">
                      {Math.round(getVotePercentage('debater2'))}%
                    </span>
                  )}
                </div>
              </div>
              <div className="voting-panel-distribution-labels">
                <span>{debater1.username}</span>
                <span>{debater2.username}</span>
              </div>
            </div>

            {/* You Voted Message */}
            {hasVoted && (
              <div className="voting-panel-voted-message">
                ✓ You voted for {votedFor === debater1.id ? debater1.username : debater2.username}
              </div>
            )}
          </>
        )}

        {/* Close Button */}
        {onClose && !showResults && (
          <button
            className="voting-panel-close-button"
            onClick={handleClose}
            aria-label="Close voting panel"
          >
            ×
          </button>
        )}

        {/* Confetti Animation */}
        {showConfetti && (
          <div className="voting-panel-confetti">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="voting-panel-confetti-piece"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: ['#9333ea', '#ec4899', '#fbbf24', '#10b981'][Math.floor(Math.random() * 4)],
                  animationDelay: `${Math.random() * 0.5}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// PropTypes validation
VotingPanel.propTypes = {
  debaters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      username: PropTypes.string.isRequired,
      avatar: PropTypes.string,
      totalTime: PropTypes.number,
      argumentsCount: PropTypes.number,
      argumentPreview: PropTypes.string,
    })
  ).isRequired,
  onVote: PropTypes.func,
  timeLeft: PropTypes.number,
  currentVotes: PropTypes.object,
  hasVoted: PropTypes.bool,
  votedFor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClose: PropTypes.func,
  showResults: PropTypes.bool,
  onViewReplay: PropTypes.func,
  onBackToHome: PropTypes.func,
};

export default VotingPanel;

