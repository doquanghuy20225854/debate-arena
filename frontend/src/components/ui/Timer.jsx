import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './Timer.css';

/**
 * Timer Component - Circular countdown timer with Clubhouse aesthetic
 * 
 * Features:
 * - SVG circular progress bar with gradient
 * - Smooth animations and color transitions
 * - Pause/Resume functionality
 * - Accessibility support
 * - Sound and vibration effects
 */

const Timer = ({
  timeLeft: initialTimeLeft,
  totalTime = 60,
  onTimeUp,
  isPaused: externalIsPaused = false,
  status = 'active',
  showSecondsLabel = true,
  size = 150,
  onTick,
}) => {
  const [timeLeft, setTimeLeft] = useState(initialTimeLeft);
  const [isPaused, setIsPaused] = useState(externalIsPaused);
  const [hasPlayedWarning, setHasPlayedWarning] = useState(false);
  const intervalRef = useRef(null);
  const audioRef = useRef(null);
  const announceRef = useRef(null);

  // Update timeLeft when prop changes
  useEffect(() => {
    setTimeLeft(initialTimeLeft);
  }, [initialTimeLeft]);

  // Sync with external pause state
  useEffect(() => {
    setIsPaused(externalIsPaused);
  }, [externalIsPaused]);

  // Countdown logic
  useEffect(() => {
    if (status === 'ended' || isPaused || timeLeft <= 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        
        // Call onTick callback
        if (onTick) {
          onTick(newTime);
        }

        // Play warning sound at 5 seconds
        if (newTime === 5 && !hasPlayedWarning) {
          playWarningSound();
          setHasPlayedWarning(true);
        }

        // Vibrate when time is up
        if (newTime === 0) {
          vibrate();
          if (onTimeUp) {
            onTimeUp();
          }
        }

        return newTime;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, status, timeLeft, onTimeUp, onTick, hasPlayedWarning]);

  // Play warning sound
  const playWarningSound = () => {
    try {
      // Create audio context for beep sound
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 800;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
    } catch (error) {
      console.warn('Could not play sound:', error);
    }
  };

  // Vibrate on mobile
  const vibrate = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([200, 100, 200]);
    }
  };

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        handleTogglePause();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleTogglePause = () => {
    if (status === 'ended') return;
    setIsPaused((prev) => !prev);
  };

  const handleReset = () => {
    setTimeLeft(totalTime);
    setIsPaused(false);
    setHasPlayedWarning(false);
  };

  // Calculate progress
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (timeLeft / totalTime) * circumference;
  const offset = circumference - progress;

  // Get color based on time remaining
  const getColor = () => {
    if (timeLeft > 30) return 'gray';
    if (timeLeft > 10) return 'yellow';
    return 'red';
  };

  const getTextColor = () => {
    if (timeLeft > 30) return '#1f2937'; // gray-800
    if (timeLeft > 10) return '#f59e0b'; // yellow-500
    return '#ef4444'; // red-500
  };

  const color = getColor();
  const textColor = getTextColor();

  // Announce time for screen readers
  useEffect(() => {
    if (announceRef.current) {
      announceRef.current.textContent = `${timeLeft} seconds remaining`;
    }
  }, [timeLeft]);

  return (
    <div className="timer-container" style={{ width: size, height: size }}>
      {/* ARIA live region for screen readers */}
      <div
        ref={announceRef}
        className="timer-sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      />

      {/* SVG Circle Progress */}
      <svg
        className="timer-svg"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: 'rotate(-90deg)' }}
      >
        <defs>
          <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#9333ea" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>

        {/* Background circle */}
        <circle
          className="timer-circle-bg"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="8"
        />

        {/* Progress circle */}
        <circle
          className={`timer-circle-progress timer-circle-progress-${color} ${
            timeLeft <= 5 ? 'timer-shake' : ''
          } ${timeLeft <= 10 ? 'timer-pulse' : ''}`}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color === 'gray' ? 'url(#timerGradient)' : color === 'yellow' ? '#f59e0b' : '#ef4444'}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: 'stroke-dashoffset 0.3s ease, stroke 0.3s ease',
          }}
        />
      </svg>

      {/* Timer Content */}
      <div className="timer-content">
        <div
          className={`timer-number timer-number-${color} ${
            timeLeft <= 10 ? 'timer-pulse' : ''
          }`}
          style={{ color: textColor }}
        >
          {timeLeft}
        </div>
        {showSecondsLabel && (
          <div className="timer-label">seconds</div>
        )}
        {status === 'active' && (
          <button
            className="timer-pause-button"
            onClick={handleTogglePause}
            aria-label={isPaused ? 'Resume timer' : 'Pause timer'}
            title={isPaused ? 'Resume (Space)' : 'Pause (Space)'}
          >
            {isPaused ? '▶️' : '⏸️'}
          </button>
        )}
      </div>

      {/* Ring effect when counting down */}
      {timeLeft > 0 && timeLeft <= 10 && (
        <div className="timer-ring-effect" />
      )}
    </div>
  );
};

// PropTypes validation
Timer.propTypes = {
  timeLeft: PropTypes.number.isRequired,
  totalTime: PropTypes.number,
  onTimeUp: PropTypes.func,
  isPaused: PropTypes.bool,
  status: PropTypes.oneOf(['active', 'paused', 'ended']),
  showSecondsLabel: PropTypes.bool,
  size: PropTypes.number,
  onTick: PropTypes.func,
};

export default Timer;
