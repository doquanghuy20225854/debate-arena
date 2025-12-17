import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './TurnIndicator.css';

/**
 * TurnIndicator Component - Horizontal stepper showing debate turns
 * 
 * Features:
 * - 4-step timeline for debate turns
 * - Animated transitions
 * - Accessibility support
 * - Confetti animation on turn completion
 */

const TurnIndicator = ({
  currentTurn = 1,
  debater1Name = 'Debater 1',
  debater2Name = 'Debater 2',
  onTurnChange,
  showConfetti = true,
}) => {
  const [previousTurn, setPreviousTurn] = useState(currentTurn);
  const [showConfettiAnimation, setShowConfettiAnimation] = useState(false);

  const totalTurns = 4;

  // Turn configuration
  const getTurnConfig = (turnNumber) => {
    const isDebater1 = turnNumber % 2 === 1;
    const isOpening = turnNumber <= 2;
    
    return {
      debater: isDebater1 ? debater1Name : debater2Name,
      type: isOpening ? 'Opening' : 'Rebuttal',
      debaterNumber: isDebater1 ? 1 : 2,
    };
  };

  // Detect turn completion for confetti
  useEffect(() => {
    if (currentTurn > previousTurn && currentTurn <= totalTurns) {
      setShowConfettiAnimation(true);
      setTimeout(() => setShowConfettiAnimation(false), 2000);
      
      if (onTurnChange) {
        onTurnChange(currentTurn);
      }
    }
    setPreviousTurn(currentTurn);
  }, [currentTurn, previousTurn, onTurnChange]);

  const getStepState = (stepNumber) => {
    if (stepNumber < currentTurn) return 'completed';
    if (stepNumber === currentTurn) return 'current';
    return 'upcoming';
  };

  const getConnectorState = (stepNumber) => {
    if (stepNumber < currentTurn) return 'completed';
    return 'upcoming';
  };

  return (
    <div className="turn-indicator-container" role="navigation" aria-label="Debate turns timeline">
      <div className="turn-indicator-stepper">
        {[...Array(totalTurns)].map((_, index) => {
          const stepNumber = index + 1;
          const state = getStepState(stepNumber);
          const connectorState = getConnectorState(stepNumber);
          const config = getTurnConfig(stepNumber);
          const isLast = stepNumber === totalTurns;

          return (
            <React.Fragment key={stepNumber}>
              {/* Step Circle */}
              <div className="turn-indicator-step">
                <div
                  className={`turn-indicator-circle turn-indicator-circle-${state}`}
                  aria-label={`Turn ${stepNumber}: ${config.debater} - ${config.type}`}
                  role="button"
                  tabIndex={0}
                >
                  {state === 'completed' ? (
                    <span className="turn-indicator-checkmark">✓</span>
                  ) : state === 'current' ? (
                    <span className="turn-indicator-number">{stepNumber}</span>
                  ) : (
                    <span className="turn-indicator-number">{stepNumber}</span>
                  )}
                </div>

                {/* Step Label */}
                <div className="turn-indicator-label">
                  <div className="turn-indicator-label-turn">Turn {stepNumber}</div>
                  <div className="turn-indicator-label-debater">{config.debater}</div>
                  <div className="turn-indicator-label-type">{config.type}</div>
                </div>
              </div>

              {/* Connector Line */}
              {!isLast && (
                <div className="turn-indicator-connector">
                  <div
                    className={`turn-indicator-connector-line turn-indicator-connector-${connectorState}`}
                    aria-hidden="true"
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Confetti Animation */}
      {showConfetti && showConfettiAnimation && (
        <div className="turn-indicator-confetti">
          {[...Array(30)].map((_, i) => {
            const angle = (i / 30) * 360;
            const distance = 60 + Math.random() * 40;
            const x = Math.cos((angle * Math.PI) / 180) * distance;
            const y = Math.sin((angle * Math.PI) / 180) * distance;
            
            return (
              <div
                key={i}
                className="turn-indicator-confetti-piece"
                style={{
                  left: '50%',
                  top: '50%',
                  background: ['#9333ea', '#ec4899', '#fbbf24', '#10b981'][i % 4],
                  animation: `confettiBurst 1.5s ease-out forwards`,
                  animationDelay: `${i * 0.02}s`,
                  '--end-x': `${x}px`,
                  '--end-y': `${y}px`,
                }}
              />
            );
          })}
        </div>
      )}

      {/* ARIA Live Region */}
      <div className="turn-indicator-sr-only" role="status" aria-live="polite" aria-atomic="true">
        {currentTurn <= totalTurns
          ? `Turn ${currentTurn} of ${totalTurns} - ${getTurnConfig(currentTurn).debater} - ${getTurnConfig(currentTurn).type}`
          : 'All turns completed'}
      </div>
    </div>
  );
};

// PropTypes validation
TurnIndicator.propTypes = {
  currentTurn: PropTypes.number.isRequired,
  debater1Name: PropTypes.string,
  debater2Name: PropTypes.string,
  onTurnChange: PropTypes.func,
  showConfetti: PropTypes.bool,
};

export default TurnIndicator;

