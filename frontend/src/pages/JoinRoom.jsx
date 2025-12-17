import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import '../styles/joinRoom.css';

// Mock active rooms for suggestions
const mockActiveRooms = [
  {
    id: 1,
    code: 'ABC123',
    topic: 'Should AI replace human teachers?',
    participants: 12,
  },
  {
    id: 2,
    code: 'XYZ789',
    topic: 'Is remote work more productive?',
    participants: 8,
  },
  {
    id: 3,
    code: 'DEF456',
    topic: 'Should social media ban political ads?',
    participants: 15,
  },
];

const JoinRoom = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [selectedRole, setSelectedRole] = useState('debater');
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState('');
  const [inputStates, setInputStates] = useState(['', '', '', '', '', '']); // 'normal', 'error', 'success'
  const inputRefs = useRef([]);

  // Initialize refs
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  const handleCodeChange = (index, value) => {
    // Only allow alphanumeric characters
    const filteredValue = value.replace(/[^A-Z0-9]/gi, '').toUpperCase().slice(0, 1);
    
    const newCode = [...code];
    newCode[index] = filteredValue;
    setCode(newCode);
    setError('');
    
    // Clear error state
    const newStates = [...inputStates];
    if (newStates[index] === 'error') {
      newStates[index] = '';
      setInputStates(newStates);
    }

    // Auto-focus next input
    if (filteredValue && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/[^A-Z0-9]/gi, '').toUpperCase().slice(0, 6);
    
    if (pastedData.length > 0) {
      const newCode = [...code];
      const newStates = [...inputStates];
      
      for (let i = 0; i < 6; i++) {
        if (i < pastedData.length) {
          newCode[i] = pastedData[i];
          newStates[i] = '';
        }
      }
      
      setCode(newCode);
      setInputStates(newStates);
      setError('');
      
      // Focus the next empty input or the last one
      const nextIndex = Math.min(pastedData.length, 5);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const handleQuickJoin = (roomCode) => {
    const codeArray = roomCode.split('').slice(0, 6);
    const newCode = [...code];
    const newStates = [...inputStates];
    
    for (let i = 0; i < 6; i++) {
      newCode[i] = codeArray[i] || '';
      newStates[i] = '';
    }
    
    setCode(newCode);
    setInputStates(newStates);
    setError('');
    
    // Focus first input
    inputRefs.current[0]?.focus();
  };

  const validateAndJoin = async () => {
    const roomCode = code.join('');
    
    if (roomCode.length !== 6) {
      setError('Please enter a complete 6-character room code');
      const newStates = code.map((char, index) => (char ? '' : 'error'));
      setInputStates(newStates);
      return;
    }

    setIsJoining(true);
    setError('');

    try {
      // Simulate API call to validate room code
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Mock validation - in real app, check with backend
      // For demo, accept any 6-character code
      const isValid = /^[A-Z0-9]{6}$/.test(roomCode);
      
      if (!isValid) {
        throw new Error('Invalid room code format');
      }

      // Show success animation
      const newStates = code.map(() => 'success');
      setInputStates(newStates);

      // Wait a bit to show success state
      await new Promise((resolve) => setTimeout(resolve, 500));

      // TODO: Replace with actual API call
      console.log('Joining room:', {
        code: roomCode,
        role: selectedRole,
      });

      // Navigate to room lobby
      navigate(`/room-lobby?roomCode=${roomCode}&role=${selectedRole}`);
    } catch (err) {
      setError(err.message || 'Room not found. Please check the code and try again.');
      const newStates = code.map(() => 'error');
      setInputStates(newStates);
      setIsJoining(false);
    }
  };

  return (
    <PageWrapper>
      <div className="join-room-container">
        <div className="join-room-card">
          <h1 className="join-room-heading">Join a Room</h1>
          <p className="join-room-subheading">Enter room code to join</p>

          {/* Room Code Input */}
          <div className="join-room-code-section">
            <div className="join-room-code-inputs">
              {code.map((char, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  className={`join-room-code-box ${
                    inputStates[index] === 'error' ? 'error' : ''
                  } ${inputStates[index] === 'success' ? 'success' : ''}`}
                  value={char}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  maxLength={1}
                  autoFocus={index === 0}
                />
              ))}
            </div>
            <p className="join-room-code-helper">
              Room codes are 6 characters (e.g. ABC123)
            </p>
          </div>

          {/* Error Message */}
          {error && <div className="join-room-error">{error}</div>}

          {/* Role Selection */}
          <div className="join-room-role-section">
            <div className="join-room-role-label">Choose your role</div>
            <div className="join-room-role-cards">
              <div
                className={`join-room-role-card ${
                  selectedRole === 'debater' ? 'selected' : ''
                }`}
                onClick={() => setSelectedRole('debater')}
              >
                <div className="join-room-role-icon">🎤</div>
                <div className="join-room-role-title">Debater</div>
                <div className="join-room-role-description">
                  Present your arguments
                </div>
                <div className="join-room-role-meta">Max 2 per room</div>
              </div>
              <div
                className={`join-room-role-card ${
                  selectedRole === 'audience' ? 'selected' : ''
                }`}
                onClick={() => setSelectedRole('audience')}
              >
                <div className="join-room-role-icon">👥</div>
                <div className="join-room-role-title">Audience</div>
                <div className="join-room-role-description">
                  Watch, chat, and vote
                </div>
                <div className="join-room-role-meta">Unlimited</div>
              </div>
            </div>
          </div>

          {/* Join Button */}
          <button
            className="join-room-button"
            onClick={validateAndJoin}
            disabled={isJoining || code.join('').length !== 6}
          >
            {isJoining ? (
              <>
                <span className="join-room-loading" />
                Joining...
              </>
            ) : (
              'Join Room'
            )}
          </button>

          {/* Active Rooms Suggestion */}
          <div className="join-room-suggestions">
            <div className="join-room-suggestions-title">
              Or join an active room
            </div>
            <div className="join-room-suggestions-list">
              {mockActiveRooms.map((room) => (
                <div key={room.id} className="join-room-suggestion-item">
                  <div className="join-room-suggestion-info">
                    <div className="join-room-suggestion-topic">{room.topic}</div>
                    <div className="join-room-suggestion-meta">
                      <span className="join-room-suggestion-code">{room.code}</span>
                      <span>🔥 {room.participants} people</span>
                    </div>
                  </div>
                  <button
                    className="join-room-suggestion-button"
                    onClick={() => handleQuickJoin(room.code)}
                  >
                    Join
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default JoinRoom;

