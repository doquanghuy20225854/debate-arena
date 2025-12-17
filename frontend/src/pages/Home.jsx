import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import '../styles/home.css';

// Mock data for active rooms
const mockRooms = [
  {
    id: 1,
    topic: 'Should artificial intelligence be regulated by governments?',
    category: 'Tech',
    status: 'live',
    participants: 12,
    avatars: ['AB', 'CD', 'EF'],
  },
  {
    id: 2,
    topic: 'Is remote work more productive than office work?',
    category: 'Business',
    status: 'waiting',
    participants: 8,
    avatars: ['GH', 'IJ'],
  },
  {
    id: 3,
    topic: 'Should social media platforms ban political advertising?',
    category: 'Politics',
    status: 'live',
    participants: 15,
    avatars: ['KL', 'MN', 'OP', 'QR'],
  },
  {
    id: 4,
    topic: 'Is cryptocurrency the future of finance?',
    category: 'Finance',
    status: 'waiting',
    participants: 6,
    avatars: ['ST', 'UV'],
  },
  {
    id: 5,
    topic: 'Should universities be free for all students?',
    category: 'Education',
    status: 'live',
    participants: 20,
    avatars: ['WX', 'YZ', 'AA', 'BB', 'CC'],
  },
  {
    id: 6,
    topic: 'Is climate change the most pressing issue of our time?',
    category: 'Environment',
    status: 'live',
    participants: 18,
    avatars: ['DD', 'EE', 'FF', 'GG'],
  },
];

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchRooms = async () => {
      setLoading(true);
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      setRooms(mockRooms);
      setLoading(false);
    };

    fetchRooms();
  }, []);

  const getInitials = (text) => {
    return text
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <PageWrapper>
      <div className="home-container">
        {/* Hero Section */}
        <section className="home-hero">
          <div className="home-hero-content">
            <h1 className="home-hero-title">Join Live Debates</h1>
            <p className="home-hero-subtitle">
              Connect with debaters worldwide in real-time
            </p>
            <div className="home-hero-buttons">
              <Link to="/create-room" className="home-hero-button primary">
                🎤 Create Room
              </Link>
              <Link to="/join-room" className="home-hero-button outline">
                🚪 Join Room
              </Link>
            </div>
          </div>
          <div className="home-hero-illustration">🎭</div>
        </section>

        {/* Active Rooms Section */}
        <section className="home-rooms-section">
          <div className="home-section-header">
            <h2 className="home-section-title">Active Rooms</h2>
          </div>

          {loading ? (
            <div className="home-empty-state">
              <div className="home-empty-icon">⏳</div>
              <div className="home-empty-title">Loading rooms...</div>
            </div>
          ) : rooms.length === 0 ? (
            <div className="home-empty-state">
              <div className="home-empty-icon">🏛️</div>
              <div className="home-empty-title">No active rooms</div>
              <div className="home-empty-text">
                Be the first to create a debate room!
              </div>
              <Link to="/create-room" className="home-hero-button primary">
                🎤 Create Room
              </Link>
            </div>
          ) : (
            <div className="home-rooms-grid">
              {rooms.map((room) => (
                <div key={room.id} className="home-room-card">
                  <span
                    className={`home-room-badge ${
                      room.status === 'live' ? 'live' : 'waiting'
                    }`}
                  >
                    {room.status === 'live' ? '🔴 Live' : '⏳ Waiting'}
                  </span>

                  <div>
                    <span className="home-room-category">{room.category}</span>
                    <h3 className="home-room-topic">{room.topic}</h3>
                  </div>

                  <div className="home-room-participants">
                    <div className="home-room-avatars">
                      {room.avatars.slice(0, 4).map((avatar, index) => (
                        <div
                          key={index}
                          className="home-room-avatar-placeholder"
                          title={avatar}
                        >
                          {getInitials(avatar)}
                        </div>
                      ))}
                      {room.avatars.length > 4 && (
                        <div
                          className="home-room-avatar-placeholder"
                          title={`+${room.avatars.length - 4} more`}
                        >
                          +{room.avatars.length - 4}
                        </div>
                      )}
                    </div>
                    <div className="home-room-count">
                      🔥 {room.participants} {room.participants === 1 ? 'person' : 'people'}
                    </div>
                  </div>

                  <Link
                    to={`/room-lobby?roomId=${room.id}`}
                    className="home-room-join-button"
                  >
                    Join
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </PageWrapper>
  );
};

export default Home;

