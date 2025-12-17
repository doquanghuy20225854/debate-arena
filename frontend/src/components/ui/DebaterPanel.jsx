import React from 'react';
import PropTypes from 'prop-types';
import './DebaterPanel.css';

/**
 * DebaterPanel Component - Displays debater information in debate room
 * 
 * Features:
 * - Multiple states (empty, idle, speaking, completed)
 * - Animated progress bar
 * - Status badges
 * - Smooth transitions and animations
 */

const DebaterPanel = ({
  debater = null,
  isActive = false,
  timeUsed = 0,
  totalTime = 60,
  argumentsCount = 0,
  totalArguments = 2,
  role = 'Debater 1',
  onJoin = null,
}) => {
  // Determine state
  const getState = () => {
    if (!debater) return 'empty';
    if (isActive) return 'speaking';
    if (timeUsed >= totalTime) return 'completed';
    return 'idle';
  };

  const state = getState();
  const progress = debater ? (timeUsed / totalTime) * 100 : 0;

  const getInitials = (username) => {
    if (!username) return '';
    return username
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getStatusBadge = () => {
    switch (state) {
      case 'speaking':
        return { text: '🎤 Speaking', className: 'debater-panel-badge-speaking' };
      case 'idle':
        return { text: '⏳ Waiting', className: 'debater-panel-badge-waiting' };
      case 'completed':
        return { text: '✅ Done', className: 'debater-panel-badge-done' };
      default:
        return null;
    }
  };

  const statusBadge = getStatusBadge();

  // Empty state
  if (state === 'empty') {
    return (
      <div className="debater-panel-card debater-panel-empty">
        <div className="debater-panel-empty-content">
          <div className="debater-panel-empty-avatar">
            <span>+</span>
          </div>
          <p className="debater-panel-empty-text">Waiting for player...</p>
          {onJoin && (
            <button
              className="debater-panel-join-button"
              onClick={onJoin}
              aria-label={`Join as ${role}`}
            >
              Join as {role}
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`debater-panel-card debater-panel-${state} ${
        isActive ? 'debater-panel-active' : ''
      }`}
    >
      {/* Avatar Section */}
      <div className="debater-panel-avatar-section">
        <div
          className={`debater-panel-avatar-wrapper debater-panel-avatar-${state}`}
        >
          <div className="debater-panel-avatar">
            {debater.avatar ? (
              <img src={debater.avatar} alt={debater.username} />
            ) : (
              <span>{getInitials(debater.username)}</span>
            )}
          </div>
          {isActive && <div className="debater-panel-glow-ring" />}
        </div>
        {statusBadge && (
          <div className={`debater-panel-status-badge ${statusBadge.className}`}>
            {statusBadge.text}
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="debater-panel-info">
        <div className="debater-panel-header">
          <h3 className="debater-panel-username">{debater.username}</h3>
          <span className="debater-panel-role-badge">{role}</span>
        </div>

        {/* Stats Row */}
        <div className="debater-panel-stats">
          <div className="debater-panel-stat-item">
            <span className="debater-panel-stat-icon">⏱️</span>
            <span className="debater-panel-stat-text">
              {timeUsed}/{totalTime}s
            </span>
          </div>
          <div className="debater-panel-stat-item">
            <span className="debater-panel-stat-icon">💬</span>
            <span className="debater-panel-stat-text">
              {argumentsCount}/{totalArguments}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="debater-panel-progress-container">
          <div className="debater-panel-progress-bar">
            <div
              className="debater-panel-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// PropTypes validation
DebaterPanel.propTypes = {
  debater: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    username: PropTypes.string,
    avatar: PropTypes.string,
    status: PropTypes.string,
  }),
  isActive: PropTypes.bool,
  timeUsed: PropTypes.number,
  totalTime: PropTypes.number,
  argumentsCount: PropTypes.number,
  totalArguments: PropTypes.number,
  role: PropTypes.string,
  onJoin: PropTypes.func,
};

export default DebaterPanel;

