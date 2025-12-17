import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import '../styles/roomLobby.css';

// Mock data
const mockTopic = {
  id: 1,
  title: 'Should artificial intelligence be regulated by governments?',
  description: 'Exploring the balance between innovation and safety in AI development.',
  category: 'Tech',
};

const mockTopics = [
  { id: 1, title: 'Should AI be regulated by governments?', description: 'Exploring the balance between innovation and safety' },
  { id: 2, title: 'Is remote work more productive?', description: 'Debating the pros and cons of working from home' },
  { id: 3, title: 'Should social media ban political ads?', description: 'Discussing free speech vs. misinformation' },
];

const RoomLobby = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roomCode = searchParams.get('roomCode') || 'ABC123';
  // eslint-disable-next-line no-unused-vars
  // const userRole = searchParams.get('role') || 'audience'; // TODO: Use for role-based UI

  // State
  // eslint-disable-next-line no-unused-vars
  const [roomCodeValue] = useState(roomCode);
  const [topic, setTopic] = useState(mockTopic);
  const [debater1, setDebater1] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [debater2, setDebater2] = useState(null); // setDebater2 will be used when implementing Socket.IO
  const [audience, setAudience] = useState([
    { id: 1, username: 'user1', initials: 'U1' },
    { id: 2, username: 'user2', initials: 'U2' },
    { id: 3, username: 'user3', initials: 'U3' },
    { id: 4, username: 'user4', initials: 'U4' },
    { id: 5, username: 'user5', initials: 'U5' },
  ]);
  // eslint-disable-next-line no-unused-vars
  const [isHost] = useState(true); // Mock: user is host (TODO: Use setIsHost when implementing host logic)
  const [copySuccess, setCopySuccess] = useState(false);
  const [toast, setToast] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const countdownIntervalRef = useRef(null);

  // Mock current user (in real app, get from auth context)
  const currentUser = { id: 999, username: 'you', initials: 'YO' };

  // Socket.IO Integration Comments
  useEffect(() => {
    // TODO: Initialize Socket.IO connection
    // import { io } from 'socket.io-client';
    // const socket = io('/');
    // socket.emit('join-room', { roomCode: roomCodeValue });
    //
    // socket.on('user-joined', (data) => {
    //   const { user, role } = data;
    //   if (role === 'debater') {
    //     if (!debater1) setDebater1(user);
    //     else if (!debater2) setDebater2(user);
    //   } else {
    //     setAudience(prev => [...prev, user]);
    //   }
    //   showToast(`${user.username} joined as ${role === 'debater' ? 'Debater' : 'Audience'}`);
    // });
    //
    // socket.on('user-left', (data) => {
    //   const { userId, role } = data;
    //   if (role === 'debater') {
    //     if (debater1?.id === userId) setDebater1(null);
    //     if (debater2?.id === userId) setDebater2(null);
    //   } else {
    //     setAudience(prev => prev.filter(u => u.id !== userId));
    //   }
    // });
    //
    // socket.on('topic-changed', (data) => {
    //   setTopic(data.topic);
    // });
    //
    // socket.on('debate-starting', (data) => {
    //   startCountdown(data.countdown);
    // });
    //
    // return () => {
    //   socket.emit('leave-room', { roomCode: roomCodeValue });
    //   socket.disconnect();
    // };

    // Mock real-time updates for demonstration
    const mockUpdates = setInterval(() => {
      // Simulate someone joining as debater
      if (!debater1 && Math.random() > 0.7) {
        setDebater1({ id: 101, username: 'debater1', initials: 'D1' });
        showToast('debater1 joined as Debater');
      }
      // Simulate someone joining as audience
      if (Math.random() > 0.8 && audience.length < 15) {
        const newUser = {
          id: 200 + audience.length,
          username: `user${audience.length + 1}`,
          initials: `U${audience.length + 1}`,
        };
        setAudience(prev => [...prev, newUser]);
        showToast(`${newUser.username} joined as Audience`);
      }
    }, 3000);

    return () => clearInterval(mockUpdates);
  }, [debater1, audience.length, roomCodeValue]);

  // Show confetti when 2 debaters are ready
  useEffect(() => {
    if (debater1 && debater2 && !showConfetti) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [debater1, debater2, showConfetti]);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(roomCodeValue);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleCopyLink = () => {
    const link = `${window.location.origin}/join-room?roomCode=${roomCodeValue}`;
    navigator.clipboard.writeText(link);
    showToast('Room link copied to clipboard!');
  };

  const handleShareSocial = (platform) => {
    const link = encodeURIComponent(`${window.location.origin}/join-room?roomCode=${roomCodeValue}`);
    const text = encodeURIComponent(`Join me in this debate: ${topic.title}`);
    
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${link}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${link}`,
      whatsapp: `https://wa.me/?text=${text}%20${link}`,
    };
    
    window.open(urls[platform], '_blank', 'width=600,height=400');
  };

  const handleTopicChange = (e) => {
    const selectedTopic = mockTopics.find(t => t.id === parseInt(e.target.value));
    if (selectedTopic) {
      setTopic(selectedTopic);
      // TODO: Socket.IO emit topic change
      // socket.emit('change-topic', { roomCode: roomCodeValue, topic: selectedTopic });
    }
  };

  const handleStartDebate = () => {
    if (!debater1 || !debater2) {
      alert('Need 2 debaters to start!');
      return;
    }

    // Start countdown
    startCountdown(3);
  };

  const startCountdown = (seconds) => {
    setCountdown(seconds);
    
    countdownIntervalRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownIntervalRef.current);
          // TODO: Socket.IO emit start debate
          // socket.emit('start-debate', { roomCode: roomCodeValue });
          navigate('/debate?roomCode=' + roomCodeValue);
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleCancelRoom = () => {
    if (window.confirm('Are you sure you want to cancel this room?')) {
      // TODO: Socket.IO emit cancel room
      // socket.emit('cancel-room', { roomCode: roomCodeValue });
      navigate('/');
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

  const isCurrentUser = (user) => {
    return user?.id === currentUser.id || user?.username === currentUser.username;
  };

  const visibleAudience = audience.slice(0, 8);
  const remainingAudience = audience.length - 8;

  return (
    <PageWrapper>
      <div className="room-lobby-container">
        <div className="room-lobby-content">
          {/* Header */}
          <div className="room-lobby-header">
            <div className="room-lobby-code-section">
              <div className="room-lobby-code-display">
                <span className="room-lobby-code-label">Room Code</span>
                <span className="room-lobby-code-value">{roomCodeValue}</span>
              </div>
              <button
                className={`room-lobby-copy-button ${copySuccess ? 'copied' : ''}`}
                onClick={handleCopyCode}
              >
                {copySuccess ? '✓ Copied!' : '📋 Copy'}
              </button>
            </div>

            <div className="room-lobby-topic-section">
              <h1 className="room-lobby-topic-title">{topic.title}</h1>
              <p className="room-lobby-topic-description">{topic.description}</p>
            </div>

            <div style={{ marginTop: '16px' }}>
              <span className="room-lobby-status-badge">
                ⏳ Waiting for players...
              </span>
            </div>
          </div>

          {/* Main Layout - 2 Columns */}
          <div className="room-lobby-main">
            {/* Left Column - Debater Slots */}
            <div className="room-lobby-debaters">
              {/* Debater 1 */}
              <div className={`room-lobby-debater-card ${debater1 ? 'filled' : 'empty'}`}>
                {debater1 ? (
                  <div className="room-lobby-debater-filled">
                    <div className="room-lobby-debater-avatar">
                      {getInitials(debater1.username)}
                    </div>
                    <div className="room-lobby-debater-info">
                      <div className="room-lobby-debater-header">
                        <span className="room-lobby-debater-label">Debater 1</span>
                        <span className="room-lobby-debater-badge ready">Ready</span>
                        {isCurrentUser(debater1) && (
                          <span className="room-lobby-debater-badge you">You</span>
                        )}
                      </div>
                      <div className="room-lobby-debater-username">{debater1.username}</div>
                    </div>
                  </div>
                ) : (
                  <div className="room-lobby-debater-empty-state">
                    Waiting for debater...
                  </div>
                )}
              </div>

              {/* Debater 2 */}
              <div className={`room-lobby-debater-card ${debater2 ? 'filled' : 'empty'}`}>
                {debater2 ? (
                  <div className="room-lobby-debater-filled">
                    <div className="room-lobby-debater-avatar">
                      {getInitials(debater2.username)}
                    </div>
                    <div className="room-lobby-debater-info">
                      <div className="room-lobby-debater-header">
                        <span className="room-lobby-debater-label">Debater 2</span>
                        <span className="room-lobby-debater-badge ready">Ready</span>
                        {isCurrentUser(debater2) && (
                          <span className="room-lobby-debater-badge you">You</span>
                        )}
                      </div>
                      <div className="room-lobby-debater-username">{debater2.username}</div>
                    </div>
                  </div>
                ) : (
                  <div className="room-lobby-debater-empty-state">
                    Waiting for debater...
                  </div>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="room-lobby-right-column">
              {/* Host Controls */}
              {isHost && (
                <div className="room-lobby-host-controls">
                  <h3 className="room-lobby-host-title">Host Controls</h3>
                  
                  <div className="room-lobby-control-group">
                    <label className="room-lobby-control-label">Topic</label>
                    <select
                      className="room-lobby-select"
                      value={topic.id}
                      onChange={handleTopicChange}
                    >
                      {mockTopics.map(t => (
                        <option key={t.id} value={t.id}>{t.title}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    className="room-lobby-button-primary"
                    onClick={handleStartDebate}
                    disabled={!debater1 || !debater2}
                  >
                    ✨ Start Debate
                  </button>

                  <button
                    className="room-lobby-button-danger"
                    onClick={handleCancelRoom}
                  >
                    Cancel Room
                  </button>
                </div>
              )}

              {/* Audience List */}
              <div className="room-lobby-audience">
                <h3 className="room-lobby-audience-title">
                  👥 Audience ({audience.length})
                </h3>
                <div className="room-lobby-audience-grid">
                  {visibleAudience.map((user) => (
                    <div
                      key={user.id}
                      className="room-lobby-audience-avatar"
                      title={user.username}
                    >
                      {user.initials || getInitials(user.username)}
                    </div>
                  ))}
                  {remainingAudience > 0 && (
                    <div className="room-lobby-audience-more">
                      +{remainingAudience}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section - Share */}
          <div className="room-lobby-share">
            <h3 className="room-lobby-share-title">Share Room</h3>
            <div className="room-lobby-share-buttons">
              <button
                className="room-lobby-share-button"
                onClick={handleCopyLink}
              >
                📋 Copy Link
              </button>
              <div className="room-lobby-share-social">
                <button
                  className="room-lobby-social-button twitter"
                  onClick={() => handleShareSocial('twitter')}
                  title="Share on Twitter"
                >
                  🐦
                </button>
                <button
                  className="room-lobby-social-button facebook"
                  onClick={() => handleShareSocial('facebook')}
                  title="Share on Facebook"
                >
                  📘
                </button>
                <button
                  className="room-lobby-social-button whatsapp"
                  onClick={() => handleShareSocial('whatsapp')}
                  title="Share on WhatsApp"
                >
                  💬
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Toast Notification */}
        {toast && (
          <div className="room-lobby-toast">
            <span>🎉</span>
            <span>{toast}</span>
          </div>
        )}

        {/* Confetti Animation */}
        {showConfetti && (
          <div className="room-lobby-confetti">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: '10px',
                  height: '10px',
                  background: ['#8B5CF6', '#EC4899', '#FBBF24', '#10B981'][Math.floor(Math.random() * 4)],
                  borderRadius: '50%',
                  animation: `fall ${2 + Math.random() * 2}s linear forwards`,
                }}
              />
            ))}
          </div>
        )}

        {/* Countdown Overlay */}
        {countdown && (
          <div className="room-lobby-countdown">
            <div className="room-lobby-countdown-number">{countdown}</div>
          </div>
        )}
      </div>

      {/* Confetti CSS Animation */}
      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </PageWrapper>
  );
};

export default RoomLobby;

