import React, { useState, useEffect } from 'react';
import '../../styles/designSystem.css';
import './RaisedHandsList.css';

const RaisedHandsList = ({
  raisedHands,
  userId,
  isHost = false,
  onMarkAnswered,
  onUpvote,
  sortBy = 'latest',
  onSortChange,
}) => {
  const [sortedHands, setSortedHands] = useState([]);
  const [newQuestions, setNewQuestions] = useState(new Set());

  // Sort questions
  useEffect(() => {
    const sorted = [...raisedHands].sort((a, b) => {
      if (sortBy === 'upvotes') {
        const upvotesA = a.upvotes || 0;
        const upvotesB = b.upvotes || 0;
        if (upvotesB !== upvotesA) {
          return upvotesB - upvotesA;
        }
      }
      // Default to latest (most recent first)
      const timeA = new Date(a.timestamp).getTime();
      const timeB = new Date(b.timestamp).getTime();
      return timeB - timeA;
    });
    setSortedHands(sorted);
  }, [raisedHands, sortBy]);

  // Track new questions for pulse animation
  useEffect(() => {
    const newIds = new Set();
    raisedHands.forEach((hand) => {
      const timeDiff = Date.now() - new Date(hand.timestamp).getTime();
      if (timeDiff < 5000) {
        // Questions less than 5 seconds old
        newIds.add(hand.id);
      }
    });
    setNewQuestions(newIds);

    // Remove pulse after animation
    const timer = setTimeout(() => {
      setNewQuestions(new Set());
    }, 3000);
    return () => clearTimeout(timer);
  }, [raisedHands]);

  const getInitials = (username) => {
    if (!username) return '';
    return username
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatTimestamp = (timestamp) => {
    const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const handleMarkAnswered = (questionId) => {
    if (onMarkAnswered) {
      onMarkAnswered(questionId);
      // TODO: Socket.IO emit
      // socket.emit('mark-question-answered', { roomCode, questionId });
    }
  };

  const handleUpvote = (questionId, e) => {
    e.stopPropagation();
    if (onUpvote) {
      onUpvote(questionId);
      // TODO: Socket.IO emit
      // socket.emit('upvote-question', { roomCode, questionId });
    }
  };

  const pendingHands = sortedHands.filter((h) => !h.answered);
  const answeredHands = sortedHands.filter((h) => h.answered);

  return (
    <div className="raised-hands-list">
      {/* Header */}
      <div className="raised-hands-list-header">
        <h3 className="raised-hands-list-title">
          🙋 Raised Hands ({pendingHands.length})
        </h3>
        {pendingHands.length > 0 && (
          <select
            className="raised-hands-sort"
            value={sortBy}
            onChange={(e) => {
              const newSort = e.target.value as 'latest' | 'upvotes';
              if (onSortChange) {
                onSortChange(newSort);
              }
            }}
            aria-label="Sort questions"
          >
            <option value="latest">Latest</option>
            <option value="upvotes">Most Upvoted</option>
          </select>
        )}
      </div>

      {/* Pending Questions */}
      {pendingHands.length > 0 ? (
        <div className="raised-hands-section">
          {pendingHands.map((hand) => {
            const isNew = newQuestions.has(hand.id);
            const isOwnQuestion = userId === hand.userId;

            return (
              <div
                key={hand.id}
                className={`raised-hand-card ${isNew ? 'raised-hand-card-new' : ''} ${
                  isOwnQuestion ? 'raised-hand-card-own' : ''
                }`}
                style={{ animationDelay: `${hand.id * 0.05}s` }}
              >
                {/* User Info */}
                <div className="raised-hand-user">
                  <div className="raised-hand-avatar">
                    {hand.avatar ? (
                      <img src={hand.avatar} alt={hand.username} />
                    ) : (
                      <span>{getInitials(hand.username)}</span>
                    )}
                  </div>
                  <div className="raised-hand-user-info">
                    <div className="raised-hand-username">
                      {hand.username}
                      {isOwnQuestion && (
                        <span className="raised-hand-badge-you" title="Your question">
                          You
                        </span>
                      )}
                    </div>
                    <div className="raised-hand-timestamp">{formatTimestamp(hand.timestamp)}</div>
                  </div>
                </div>

                {/* Question Text */}
                <div className="raised-hand-question">{hand.question}</div>

                {/* Actions */}
                <div className="raised-hand-actions">
                  <div className="raised-hand-actions-left">
                    {onUpvote && (
                      <button
                        className="raised-hand-upvote"
                        onClick={(e) => handleUpvote(hand.id, e)}
                        aria-label={`Upvote question by ${hand.username}`}
                        title="Upvote"
                      >
                        <span>👍</span>
                        {hand.upvotes !== undefined && hand.upvotes > 0 && (
                          <span className="raised-hand-upvote-count">{hand.upvotes}</span>
                        )}
                      </button>
                    )}
                  </div>
                  <div className="raised-hand-actions-right">
                    {isHost && !hand.answered && (
                      <button
                        className="raised-hand-button-answered"
                        onClick={() => handleMarkAnswered(hand.id)}
                        aria-label={`Mark question as answered`}
                      >
                        Mark Answered
                      </button>
                    )}
                    <span
                      className={`raised-hand-status-badge ${
                        hand.answered ? 'raised-hand-status-answered' : 'raised-hand-status-pending'
                      }`}
                    >
                      {hand.answered ? '✓ Answered' : '⏳ Pending'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="raised-hands-empty">
          <p className="raised-hands-empty-text">No questions yet</p>
          <p className="raised-hands-empty-hint">Be the first to raise your hand!</p>
        </div>
      )}

      {/* Answered Questions (Collapsible) */}
      {answeredHands.length > 0 && (
        <details className="raised-hands-answered-section">
          <summary className="raised-hands-answered-summary">
            Answered Questions ({answeredHands.length})
          </summary>
          <div className="raised-hands-section">
            {answeredHands.map((hand) => (
              <div
                key={hand.id}
                className="raised-hand-card raised-hand-card-answered"
                style={{ animationDelay: `${hand.id * 0.05}s` }}
              >
                <div className="raised-hand-user">
                  <div className="raised-hand-avatar">
                    {hand.avatar ? (
                      <img src={hand.avatar} alt={hand.username} />
                    ) : (
                      <span>{getInitials(hand.username)}</span>
                    )}
                  </div>
                  <div className="raised-hand-user-info">
                    <div className="raised-hand-username">{hand.username}</div>
                    <div className="raised-hand-timestamp">{formatTimestamp(hand.timestamp)}</div>
                  </div>
                </div>
                <div className="raised-hand-question">{hand.question}</div>
                <div className="raised-hand-actions">
                  <span className="raised-hand-status-badge raised-hand-status-answered">
                    ✓ Answered
                  </span>
                </div>
              </div>
            ))}
          </div>
        </details>
      )}
    </div>
  );
};

export default RaisedHandsList;

