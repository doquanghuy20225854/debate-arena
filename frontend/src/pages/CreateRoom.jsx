import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import '../styles/createRoom.css';

// Mock topics data
const mockTopics = [
  {
    id: 1,
    title: 'Should AI replace human teachers?',
    description: 'Exploring the future of education and technology',
    category: 'Education',
    timesUsed: 45,
  },
  {
    id: 2,
    title: 'Is remote work more productive?',
    description: 'Debating the pros and cons of working from home',
    category: 'Business',
    timesUsed: 32,
  },
  {
    id: 3,
    title: 'Should social media ban political ads?',
    description: 'Discussing free speech vs. misinformation',
    category: 'Politics',
    timesUsed: 28,
  },
  {
    id: 4,
    title: 'Is cryptocurrency the future of money?',
    description: 'Exploring digital currencies and their impact',
    category: 'Finance',
    timesUsed: 67,
  },
  {
    id: 5,
    title: 'Should universities be free?',
    description: 'Debating accessibility in higher education',
    category: 'Education',
    timesUsed: 54,
  },
  {
    id: 6,
    title: 'Is climate change the most pressing issue?',
    description: 'Prioritizing global challenges',
    category: 'Environment',
    timesUsed: 89,
  },
  {
    id: 7,
    title: 'Should voting be mandatory?',
    description: 'Exploring democratic participation',
    category: 'Politics',
    timesUsed: 41,
  },
  {
    id: 8,
    title: 'Is space exploration worth the cost?',
    description: 'Debating investment in space programs',
    category: 'Science',
    timesUsed: 23,
  },
];

const CreateRoom = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [visibility, setVisibility] = useState('public');
  const [timeLimit, setTimeLimit] = useState(60);
  const [maxParticipants, setMaxParticipants] = useState(20);
  const [roomCode, setRoomCode] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [topics, setTopics] = useState(mockTopics);

  useEffect(() => {
    // Generate room code if private
    if (visibility === 'private' && !roomCode) {
      const code = Math.random().toString(36).substring(2, 8).toUpperCase();
      setRoomCode(code);
    }
  }, [visibility, roomCode]);

  // Filter topics based on search
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setTopics(mockTopics);
    } else {
      const filtered = mockTopics.filter(
        (topic) =>
          topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          topic.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          topic.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setTopics(filtered);
    }
  }, [searchQuery]);

  const handleNext = () => {
    if (currentStep === 1 && !selectedTopic) {
      alert('Please select a topic');
      return;
    }
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRandomTopic = () => {
    const randomTopic = mockTopics[Math.floor(Math.random() * mockTopics.length)];
    setSelectedTopic(randomTopic);
    setSearchQuery('');
  };

  const handleCreateRoom = async () => {
    setIsCreating(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // TODO: Replace with actual API call
      console.log('Creating room:', {
        topic: selectedTopic,
        visibility,
        timeLimit,
        maxParticipants,
        roomCode: visibility === 'private' ? roomCode : null,
      });

      // Navigate to room lobby
      navigate(`/room-lobby?roomId=123`);
    } catch (error) {
      console.error('Error creating room:', error);
      alert('Failed to create room. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  const getProgress = () => {
    return (currentStep / 3) * 100;
  };

  return (
    <PageWrapper>
      <div className="create-room-container">
        <div className="create-room-card">
          {/* Step Indicator */}
          <div className="create-room-steps">
            <div
              className={`create-room-step ${currentStep >= 1 ? 'active' : ''} ${
                currentStep > 1 ? 'completed' : ''
              }`}
            >
              <div className="create-room-step-number">1</div>
              <span>Select Topic</span>
            </div>
            <span className="create-room-step-arrow">→</span>
            <div
              className={`create-room-step ${currentStep >= 2 ? 'active' : ''} ${
                currentStep > 2 ? 'completed' : ''
              }`}
            >
              <div className="create-room-step-number">2</div>
              <span>Configure</span>
            </div>
            <span className="create-room-step-arrow">→</span>
            <div
              className={`create-room-step ${currentStep >= 3 ? 'active' : ''}`}
            >
              <div className="create-room-step-number">3</div>
              <span>Ready</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="create-room-progress">
            <div
              className="create-room-progress-bar"
              style={{ width: `${getProgress()}%` }}
            />
          </div>

          {/* Step 1 - Select Topic */}
          {currentStep === 1 && (
            <div className="create-room-step-content">
              <h2 className="create-room-step-title">Choose Your Debate Topic</h2>

              {/* Search Bar */}
              <div className="create-room-search">
                <span className="create-room-search-icon">🔍</span>
                <input
                  type="text"
                  className="create-room-search-input"
                  placeholder="Search topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Topics Grid */}
              <div className="create-room-topics-grid">
                {topics.map((topic) => (
                  <div
                    key={topic.id}
                    className={`create-room-topic-card ${
                      selectedTopic?.id === topic.id ? 'selected' : ''
                    }`}
                    onClick={() => setSelectedTopic(topic)}
                  >
                    <div className="create-room-topic-category">{topic.category}</div>
                    <div className="create-room-topic-title">{topic.title}</div>
                    <div className="create-room-topic-description">
                      {topic.description}
                    </div>
                    <div className="create-room-topic-meta">
                      Times used: {topic.timesUsed}
                    </div>
                  </div>
                ))}
              </div>

              {topics.length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px', color: '#6B7280' }}>
                  No topics found. Try a different search.
                </div>
              )}

              {/* Random Topic Button */}
              <div className="create-room-random-topic">
                <button
                  type="button"
                  className="create-room-random-topic-button"
                  onClick={handleRandomTopic}
                >
                  Or Generate Random Topic
                </button>
              </div>

              {/* Navigation */}
              <div className="create-room-navigation">
                <button
                  type="button"
                  className="create-room-button secondary"
                  onClick={() => navigate('/')}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="create-room-button primary"
                  onClick={handleNext}
                  disabled={!selectedTopic}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 2 - Configure */}
          {currentStep === 2 && (
            <div className="create-room-step-content">
              <h2 className="create-room-step-title">Configure Room Settings</h2>

              {/* Visibility */}
              <div className="create-room-config-group">
                <label className="create-room-config-label">Room Visibility</label>
                <div className="create-room-radio-group">
                  <div className="create-room-radio-option">
                    <input
                      type="radio"
                      id="public"
                      name="visibility"
                      value="public"
                      checked={visibility === 'public'}
                      onChange={(e) => setVisibility(e.target.value)}
                      className="create-room-radio-input"
                    />
                    <label htmlFor="public" className="create-room-radio-label">
                      Public
                    </label>
                  </div>
                  <div className="create-room-radio-option">
                    <input
                      type="radio"
                      id="private"
                      name="visibility"
                      value="private"
                      checked={visibility === 'private'}
                      onChange={(e) => setVisibility(e.target.value)}
                      className="create-room-radio-input"
                    />
                    <label htmlFor="private" className="create-room-radio-label">
                      Private
                    </label>
                  </div>
                </div>
                {visibility === 'private' && roomCode && (
                  <div className="create-room-room-code">
                    <div className="create-room-room-code-label">Room Code</div>
                    <div className="create-room-room-code-value">{roomCode}</div>
                  </div>
                )}
              </div>

              {/* Time Limit */}
              <div className="create-room-slider-group">
                <div className="create-room-slider-label">
                  <span className="create-room-slider-label-text">Time Limit per Turn</span>
                  <span className="create-room-slider-value">{timeLimit}s</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="120"
                  step="10"
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(Number(e.target.value))}
                  className="create-room-slider"
                />
              </div>

              {/* Max Participants */}
              <div className="create-room-slider-group">
                <div className="create-room-slider-label">
                  <span className="create-room-slider-label-text">Max Participants</span>
                  <span className="create-room-slider-value">{maxParticipants}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="50"
                  step="5"
                  value={maxParticipants}
                  onChange={(e) => setMaxParticipants(Number(e.target.value))}
                  className="create-room-slider"
                />
              </div>

              {/* Navigation */}
              <div className="create-room-navigation">
                <button
                  type="button"
                  className="create-room-button secondary"
                  onClick={handleBack}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="create-room-button primary"
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 3 - Ready */}
          {currentStep === 3 && (
            <div className="create-room-step-content">
              <h2 className="create-room-step-title">Ready to Create?</h2>

              {/* Preview */}
              <div className="create-room-preview">
                <div className="create-room-preview-title">Room Preview</div>

                <div className="create-room-preview-item">
                  <div className="create-room-preview-label">Topic</div>
                  <div className="create-room-preview-value">{selectedTopic?.title}</div>
                </div>

                {visibility === 'private' && roomCode && (
                  <div className="create-room-preview-item">
                    <div className="create-room-preview-label">Room Code</div>
                    <div className="create-room-preview-code">{roomCode}</div>
                  </div>
                )}

                <div className="create-room-preview-item">
                  <div className="create-room-preview-label">Visibility</div>
                  <div className="create-room-preview-value">
                    {visibility === 'public' ? 'Public' : 'Private'}
                  </div>
                </div>

                <div className="create-room-preview-item">
                  <div className="create-room-preview-label">Time Limit</div>
                  <div className="create-room-preview-value">{timeLimit} seconds per turn</div>
                </div>

                <div className="create-room-preview-item">
                  <div className="create-room-preview-label">Max Participants</div>
                  <div className="create-room-preview-value">{maxParticipants} people</div>
                </div>
              </div>

              {/* Navigation */}
              <div className="create-room-navigation">
                <button
                  type="button"
                  className="create-room-button secondary"
                  onClick={handleBack}
                  disabled={isCreating}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="create-room-button primary"
                  onClick={handleCreateRoom}
                  disabled={isCreating}
                >
                  {isCreating ? (
                    <>
                      <span className="create-room-loading" />
                      Creating...
                    </>
                  ) : (
                    <>
                      ✨ Create Room
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
};

export default CreateRoom;

