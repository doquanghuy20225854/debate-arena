import React from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import '../styles/profile.css';

// Mock data
const mockUser = {
  username: 'debater_pro',
  email: 'debater@example.com',
  avatar: null, // Set to null to show placeholder
  stats: {
    totalDebates: 24,
    winRate: 75,
    rank: 8,
  },
};

const mockDebates = [
  {
    id: 1,
    topic: 'Should AI replace human teachers in classrooms?',
    status: 'won',
    timestamp: '2 hours ago',
    opponent: 'tech_enthusiast',
  },
  {
    id: 2,
    topic: 'Is remote work better than office work?',
    status: 'won',
    timestamp: '1 day ago',
    opponent: 'office_advocate',
  },
  {
    id: 3,
    topic: 'Should social media platforms ban political ads?',
    status: 'lost',
    timestamp: '3 days ago',
    opponent: 'free_speech_defender',
  },
  {
    id: 4,
    topic: 'Is cryptocurrency the future of money?',
    status: 'won',
    timestamp: '1 week ago',
    opponent: 'crypto_skeptic',
  },
  {
    id: 5,
    topic: 'Should universities be free for everyone?',
    status: 'pending',
    timestamp: '2 weeks ago',
    opponent: 'education_reformer',
  },
];

const Profile = () => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'won':
        return '✓';
      case 'lost':
        return '✗';
      case 'pending':
        return '○';
      default:
        return '•';
    }
  };

  const getInitials = (username) => {
    return username
      .split('_')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <PageWrapper>
      <div className="profile-container">
        {/* Header Section */}
        <div className="profile-header">
          <div className="profile-avatar-wrapper">
            {mockUser.avatar ? (
              <img
                src={mockUser.avatar}
                alt={mockUser.username}
                className="profile-avatar"
              />
            ) : (
              <div className="profile-avatar-placeholder">
                {getInitials(mockUser.username)}
              </div>
            )}
          </div>
          <h1 className="profile-username">{mockUser.username}</h1>
          <p className="profile-email">{mockUser.email}</p>
          <button className="profile-edit-button">Edit Profile</button>
        </div>

        {/* Statistics Cards */}
        <div className="profile-stats">
          <div className="profile-stat-card">
            <div className="profile-stat-label">Total Debates</div>
            <div className="profile-stat-value">{mockUser.stats.totalDebates}</div>
          </div>
          <div className="profile-stat-card">
            <div className="profile-stat-label">Win Rate</div>
            <div className="profile-stat-value">{mockUser.stats.winRate}%</div>
          </div>
          <div className="profile-stat-card">
            <div className="profile-stat-label">Rank</div>
            <div className="profile-stat-value">#{mockUser.stats.rank}</div>
          </div>
        </div>

        {/* Recent Debates Section */}
        <div className="profile-section">
          <h2 className="profile-section-title">Recent Debates</h2>
          <div className="profile-debates-list">
            {mockDebates.map((debate) => (
              <div key={debate.id} className="profile-debate-item">
                <div className="profile-debate-icon">{getStatusIcon(debate.status)}</div>
                <div className="profile-debate-content">
                  <div className="profile-debate-topic">{debate.topic}</div>
                  <div className="profile-debate-meta">
                    <span className={`profile-debate-status ${debate.status}`}>
                      {debate.status === 'won' ? 'Won' : debate.status === 'lost' ? 'Lost' : 'Pending'}
                    </span>
                    <span>vs {debate.opponent}</span>
                    <span className="profile-debate-timestamp">• {debate.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Profile;

