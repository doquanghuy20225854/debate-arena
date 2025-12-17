import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import Timer from '../components/ui/Timer';
import DebaterPanel from '../components/ui/DebaterPanel';
import TurnIndicator from '../components/ui/TurnIndicator';
import '../styles/debateRoom.css';

// Mock data
const mockTopic = {
  title: 'Should artificial intelligence be regulated by governments?',
  category: 'Tech',
};

const mockDebater1 = {
  id: 1,
  username: 'debater1',
  initials: 'D1',
  isSpeaking: true,
  timeUsed: 45,
  timeLimit: 60,
};

const mockDebater2 = {
  id: 2,
  username: 'debater2',
  initials: 'D2',
  isSpeaking: false,
  timeUsed: 0,
  timeLimit: 60,
};

const mockAudience = [
  { id: 1, username: 'user1', initials: 'U1', online: true },
  { id: 2, username: 'user2', initials: 'U2', online: true },
  { id: 3, username: 'user3', initials: 'U3', online: true },
  { id: 4, username: 'user4', initials: 'U4', online: false },
  { id: 5, username: 'user5', initials: 'U5', online: true },
  { id: 6, username: 'user6', initials: 'U6', online: true },
  { id: 7, username: 'user7', initials: 'U7', online: true },
  { id: 8, username: 'user8', initials: 'U8', online: true },
  { id: 9, username: 'user9', initials: 'U9', online: true },
  { id: 10, username: 'user10', initials: 'U10', online: true },
  { id: 11, username: 'user11', initials: 'U11', online: true },
  { id: 12, username: 'user12', initials: 'U12', online: true },
];

const mockMessages = [
  { id: 1, type: 'system', text: 'debater1 joined the debate', timestamp: '10:00 AM' },
  { id: 2, type: 'system', text: 'debater2 joined the debate', timestamp: '10:01 AM' },
  { id: 3, type: 'user', userId: 1, username: 'user1', initials: 'U1', text: 'This is going to be interesting!', timestamp: '10:02 AM' },
  { id: 4, type: 'user', userId: 2, username: 'user2', initials: 'U2', text: 'I agree with the first point', timestamp: '10:03 AM' },
];

const mockRaisedHands = [
  { id: 1, userId: 3, username: 'user3', question: 'What about privacy concerns?', answered: false },
  { id: 2, userId: 4, username: 'user4', question: 'How would this affect innovation?', answered: true },
  { id: 3, userId: 5, username: 'user5', question: 'What are the costs?', answered: false },
];

const DebateRoom = () => {
  const [searchParams] = useSearchParams();
  const roomCode = searchParams.get('roomCode') || 'ABC123';

  // Debate states: 'waiting' | 'debating' | 'between-turns' | 'voting' | 'finished'
  const [debateState, setDebateState] = useState('debating');
  const [currentTurn, setCurrentTurn] = useState(2);
  const [totalTurns, setTotalTurns] = useState(4);
  const [timeRemaining, setTimeRemaining] = useState(45);
  const [timeLimit, setTimeLimit] = useState(60);
  const [currentDebater, setCurrentDebater] = useState(mockDebater1);
  const [debater1, setDebater1] = useState(mockDebater1);
  const [debater2, setDebater2] = useState(mockDebater2);
  const [audience, setAudience] = useState(mockAudience);
  const [argument, setArgument] = useState('');
  const [messages, setMessages] = useState(mockMessages);
  const [chatInput, setChatInput] = useState('');
  const [raisedHands, setRaisedHands] = useState(mockRaisedHands);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const messagesEndRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const isCurrentUserTurn = currentDebater.id === 999; // Mock: current user ID

  // Socket.IO Integration Comments
  useEffect(() => {
    // TODO: Initialize Socket.IO connection
    // import { io } from 'socket.io-client';
    // const socket = io('/');
    // socket.emit('join-debate', { roomCode });
    //
    // socket.on('debate-started', (data) => {
    //   setDebateState('debating');
    //   setCurrentTurn(1);
    // });
    //
    // socket.on('turn-started', (data) => {
    //   const { debaterId, turnNumber, timeLimit } = data;
    //   setCurrentDebater(data.debater);
    //   setCurrentTurn(turnNumber);
    //   setTimeLimit(timeLimit);
    //   setTimeRemaining(timeLimit);
    //   setDebateState('debating');
    // });
    //
    // socket.on('turn-ended', (data) => {
    //   setDebateState('between-turns');
    //   setShowConfetti(true);
    //   setTimeout(() => setShowConfetti(false), 2000);
    // });
    //
    // socket.on('argument-updated', (data) => {
    //   if (data.debaterId === currentDebater.id) {
    //     setArgument(data.argument);
    //   }
    // });
    //
    // socket.on('timer-update', (data) => {
    //   setTimeRemaining(data.timeRemaining);
    // });
    //
    // socket.on('chat-message', (data) => {
    //   setMessages(prev => [...prev, data]);
    // });
    //
    // socket.on('hand-raised', (data) => {
    //   setRaisedHands(prev => [...prev, data]);
    // });
    //
    // socket.on('debate-finished', (data) => {
    //   setDebateState('finished');
    //   // Navigate to results page
    // });
    //
    // return () => {
    //   socket.emit('leave-debate', { roomCode });
    //   socket.disconnect();
    // };

    // Timer countdown is now handled by Timer component
    // This effect is kept for Socket.IO integration
  }, [debateState, timeRemaining, roomCode, currentDebater.id]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmitArgument = () => {
    if (argument.trim().length === 0) return;
    
    // TODO: Socket.IO emit argument
    // socket.emit('submit-argument', { roomCode, argument });
    
    console.log('Submitting argument:', argument);
    setArgument('');
  };

  const handleSendMessage = () => {
    if (chatInput.trim().length === 0) return;
    
    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      userId: 999,
      username: 'you',
      initials: 'YO',
      text: chatInput,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };
    
    // TODO: Socket.IO emit message
    // socket.emit('chat-message', { roomCode, message: chatInput });
    
    setMessages(prev => [...prev, newMessage]);
    setChatInput('');
  };

  const handleRaiseHand = () => {
    // TODO: Socket.IO emit raise hand
    // socket.emit('raise-hand', { roomCode, question: prompt('Enter your question:') });
    
    const question = prompt('Enter your question:');
    if (question) {
      const newHand = {
        id: raisedHands.length + 1,
        userId: 999,
        username: 'you',
        question,
        answered: false,
      };
      setRaisedHands(prev => [...prev, newHand]);
    }
  };

  const getInitials = (username) => {
    if (!username) return '';
    return username
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleTimeUp = () => {
    // Turn ended
    setDebateState('between-turns');
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
    // TODO: Socket.IO emit turn ended
    // socket.emit('turn-ended', { roomCode });
  };

  const handleTimerTick = (newTime) => {
    setTimeRemaining(newTime);
    // TODO: Socket.IO emit timer update
    // socket.emit('timer-update', { roomCode, timeRemaining: newTime });
  };

  const getCharCount = () => {
    return argument.length;
  };

  const maxChars = 500;

  return (
    <div className="debate-room-container">
      <div className="debate-room-layout">
        {/* Left Column - Participants */}
        <div className="debate-room-participants">
          {/* Host Badge */}
          <div className="debate-room-host-badge">
            <span>👑</span>
            <span>Host</span>
          </div>

          {/* Debater 1 */}
          <DebaterPanel
            debater={debater1 ? {
              id: debater1.id,
              username: debater1.username,
              avatar: null,
            } : null}
            isActive={debater1?.isSpeaking || false}
            timeUsed={debater1?.timeUsed || 0}
            totalTime={debater1?.timeLimit || 60}
            argumentsCount={1}
            totalArguments={2}
            role="Debater 1"
          />

          {/* Debater 2 */}
          <DebaterPanel
            debater={debater2 ? {
              id: debater2.id,
              username: debater2.username,
              avatar: null,
            } : null}
            isActive={debater2?.isSpeaking || false}
            timeUsed={debater2?.timeUsed || 0}
            totalTime={debater2?.timeLimit || 60}
            argumentsCount={0}
            totalArguments={2}
            role="Debater 2"
          />

          {/* Audience List */}
          <div className="debate-room-audience-section">
            <div className="debate-room-audience-title">
              👥 Audience ({audience.length})
            </div>
            <div className="debate-room-audience-list">
              {audience.map((user) => (
                <div key={user.id} className="debate-room-audience-item">
                  <div className="debate-room-audience-avatar">
                    {user.initials || getInitials(user.username)}
                    {user.online && <div className="debate-room-online-indicator" />}
                  </div>
                  <div style={{ fontSize: '14px', color: '#1f2937' }}>{user.username}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center Column */}
        <div className="debate-room-center">
          {/* Topic Card */}
          <div className="debate-room-topic-card">
            <div className="debate-room-topic-header">
              <h2 className="debate-room-topic-title">{mockTopic.title}</h2>
              <span className="debate-room-topic-category">{mockTopic.category}</span>
            </div>
            <div className="debate-room-turn-indicator">
              Turn {currentTurn}/{totalTurns}
            </div>
          </div>

          {/* Timer Component */}
          <div className="debate-room-timer-container">
            <Timer
              timeLeft={timeRemaining}
              totalTime={timeLimit}
              onTimeUp={handleTimeUp}
              isPaused={debateState !== 'debating'}
              status={debateState === 'debating' ? 'active' : debateState === 'finished' ? 'ended' : 'paused'}
              onTick={handleTimerTick}
              size={200}
            />
          </div>

          {/* Debate Content */}
          <div className="debate-room-content">
            {isCurrentUserTurn ? (
              <>
                <textarea
                  className="debate-room-argument-input"
                  placeholder="Type your argument here..."
                  value={argument}
                  onChange={(e) => setArgument(e.target.value)}
                  maxLength={maxChars}
                />
                <div className="debate-room-argument-footer">
                  <span className="debate-room-char-count">
                    {getCharCount()}/{maxChars}
                  </span>
                  <button
                    className="debate-room-submit-button"
                    onClick={handleSubmitArgument}
                    disabled={argument.trim().length === 0 || debateState !== 'debating'}
                  >
                    Submit
                  </button>
                </div>
              </>
            ) : (
              <div className="debate-room-argument-display">
                {currentDebater.isSpeaking
                  ? `This is ${currentDebater.username}'s argument. They are currently speaking about the topic...`
                  : 'Waiting for debater to speak...'}
              </div>
            )}
          </div>

          {/* Turn Timeline */}
          <TurnIndicator
            currentTurn={currentTurn}
            debater1Name={debater1?.username || 'Debater 1'}
            debater2Name={debater2?.username || 'Debater 2'}
            onTurnChange={(turn) => {
              console.log('Turn changed to:', turn);
              // TODO: Socket.IO emit turn change
              // socket.emit('turn-changed', { roomCode, turn });
            }}
            showConfetti={true}
          />
        </div>

        {/* Right Column - Chat */}
        <div className="debate-room-chat">
          {/* Chat Section */}
          <div className="debate-room-chat-section">
            <div className="debate-room-chat-header">💬 Chat</div>
            <div className="debate-room-chat-messages">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`debate-room-message ${message.type === 'system' ? 'system' : ''}`}
                >
                  {message.type === 'user' && (
                    <div className="debate-room-message-avatar">
                      {message.initials || getInitials(message.username)}
                    </div>
                  )}
                  <div className="debate-room-message-content">
                    {message.type === 'user' && (
                      <div className="debate-room-message-username">{message.username}</div>
                    )}
                    <div className="debate-room-message-text">{message.text}</div>
                    {message.type === 'user' && (
                      <div className="debate-room-message-time">{message.timestamp}</div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="debate-room-chat-input-area">
              <input
                type="text"
                className="debate-room-chat-input"
                placeholder="Type a message..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
              />
              <button
                className="debate-room-chat-button"
                onClick={handleSendMessage}
                title="Send message"
              >
                ✈️
              </button>
            </div>
          </div>

          {/* Raise Hand Section */}
          <div className="debate-room-raise-hand">
            <div className="debate-room-raise-hand-title">
              🙋 Raised Hands ({raisedHands.length})
            </div>
            <div className="debate-room-raise-hand-list">
              {raisedHands.map((hand) => (
                <div key={hand.id} className="debate-room-raise-hand-item">
                  <div className="debate-room-raise-hand-question">{hand.question}</div>
                  {hand.answered && (
                    <span className="debate-room-raise-hand-badge">Answered</span>
                  )}
                </div>
              ))}
              {raisedHands.length === 0 && (
                <div style={{ textAlign: 'center', color: '#9ca3af', padding: '20px' }}>
                  No questions yet
                </div>
              )}
            </div>
            <button
              className="debate-room-submit-button"
              onClick={handleRaiseHand}
              style={{ marginTop: '12px', width: '100%' }}
            >
              🙋 Raise Hand
            </button>
          </div>
        </div>
      </div>

      {/* Confetti Animation */}
      {showConfetti && (
        <div className="debate-room-confetti">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: '10px',
                height: '10px',
                background: ['#9333ea', '#ec4899', '#fbbf24', '#10b981'][Math.floor(Math.random() * 4)],
                borderRadius: '50%',
                animation: `fall ${2 + Math.random() * 2}s linear forwards`,
              }}
            />
          ))}
        </div>
      )}

      {/* Confetti CSS Animation */}
      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default DebateRoom;

