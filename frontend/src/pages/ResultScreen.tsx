import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import '../styles/designSystem.css';
import '../styles/ResultScreen.css';

interface Debater {
  id: number | string;
  username: string;
  avatar?: string;
  votes: number;
  totalSpeakingTime: number; // in seconds
  turnsCompleted: number;
  averageArgumentLength: number; // in words
  audienceEngagement: number; // chat messages
}

interface ResultScreenProps {
  topic?: string;
  debater1?: Debater;
  debater2?: Debater;
  totalVotes?: number;
  keyArguments?: Array<{ debater: string; argument: string }>;
  mostEngagingMoment?: { timestamp: string; description: string };
  onBackToHome?: () => void;
  onViewTranscript?: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({
  topic = 'Should AI replace human jobs?',
  debater1 = {
    id: 1,
    username: 'Alex Johnson',
    votes: 18,
    totalSpeakingTime: 420,
    turnsCompleted: 3,
    averageArgumentLength: 150,
    audienceEngagement: 45,
  },
  debater2 = {
    id: 2,
    username: 'Sarah Chen',
    votes: 12,
    totalSpeakingTime: 380,
    turnsCompleted: 3,
    averageArgumentLength: 180,
    audienceEngagement: 52,
  },
  totalVotes = 30,
  keyArguments = [],
  mostEngagingMoment,
  onBackToHome,
  onViewTranscript,
}) => {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);
  const [animatedVotes1, setAnimatedVotes1] = useState(0);
  const [animatedVotes2, setAnimatedVotes2] = useState(0);
  const [showShareCard, setShowShareCard] = useState(false);
  const [copied, setCopied] = useState(false);
  const confettiRef = useRef<HTMLCanvasElement>(null);
  const shareCardRef = useRef<HTMLDivElement>(null);

  // Determine winner
  const winner = debater1.votes > debater2.votes ? debater1 : debater2;
  const loser = debater1.votes > debater2.votes ? debater2 : debater1;
  const winnerPercentage = Math.round((winner.votes / totalVotes) * 100);
  const loserPercentage = Math.round((loser.votes / totalVotes) * 100);

  // Confetti animation (3 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Canvas confetti
  useEffect(() => {
    if (!confettiRef.current || !showConfetti) return;

    const canvas = confettiRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      size: number;
      rotation: number;
      rotationSpeed: number;
    }> = [];

    const colors = ['#9333ea', '#ec4899', '#fbbf24', '#10b981', '#3b82f6'];

    // Create particles
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: -10,
        vx: (Math.random() - 0.5) * 2,
        vy: Math.random() * 3 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
      });
    }

    const animate = () => {
      if (!showConfetti) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.rotation += particle.rotationSpeed;
        particle.vy += 0.1; // gravity

        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate((particle.rotation * Math.PI) / 180);
        ctx.fillStyle = particle.color;
        ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
        ctx.restore();
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, [showConfetti]);

  // Animated count-up for votes
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepTime = duration / steps;
    const step1 = debater1.votes / steps;
    const step2 = debater2.votes / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      setAnimatedVotes1(Math.min(Math.round(step1 * currentStep), debater1.votes));
      setAnimatedVotes2(Math.min(Math.round(step2 * currentStep), debater2.votes));

      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, [debater1.votes, debater2.votes]);

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Get initials
  const getInitials = (username: string) => {
    return username
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Copy link
  const handleCopyLink = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Download as image (using html2canvas would be ideal, but for now we'll use a simple approach)
  const handleDownloadImage = () => {
    // TODO: Implement with html2canvas library
    // import html2canvas from 'html2canvas';
    // if (shareCardRef.current) {
    //   html2canvas(shareCardRef.current).then(canvas => {
    //     const link = document.createElement('a');
    //     link.download = 'debate-results.png';
    //     link.href = canvas.toDataURL();
    //     link.click();
    //   });
    // }
    alert('Download image feature - install html2canvas to enable');
  };

  // Share to social media
  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out this debate: ${topic}`);
    const shareUrls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  const handleBackToHome = () => {
    if (onBackToHome) {
      onBackToHome();
    } else {
      navigate('/');
    }
  };

  return (
    <PageWrapper>
      <div className="result-screen">
        {/* Confetti Canvas */}
        {showConfetti && (
          <canvas
            ref={confettiRef}
            className="result-screen-confetti"
            style={{ position: 'fixed', top: 0, left: 0, zIndex: 1, pointerEvents: 'none' }}
          />
        )}

        {/* Hero Section */}
        <section className="result-screen-hero">
          <div className="result-screen-hero-content">
            <h1 className="result-screen-winner-text">🏆 Winner</h1>
            <div className="result-screen-winner-avatar-container">
              <div className="result-screen-winner-avatar">
                {winner.avatar ? (
                  <img src={winner.avatar} alt={winner.username} />
                ) : (
                  <span>{getInitials(winner.username)}</span>
                )}
                <div className="result-screen-crown">👑</div>
              </div>
            </div>
            <h2 className="result-screen-winner-name">{winner.username}</h2>
            <p className="result-screen-congratulations">Congratulations!</p>
          </div>
        </section>

        {/* Vote Results Card */}
        <section className="result-screen-section">
          <div className="result-screen-vote-card">
            <h3 className="result-screen-vote-title">Final Vote Count</h3>
            <div className="result-screen-vote-comparison">
              <div className="result-screen-vote-column">
                <div className="result-screen-vote-number">{animatedVotes1}</div>
                <div className="result-screen-vote-label">{debater1.username}</div>
                <div className="result-screen-vote-bar-container">
                  <div
                    className="result-screen-vote-bar"
                    style={{
                      width: `${(animatedVotes1 / totalVotes) * 100}%`,
                      background: debater1.id === winner.id
                        ? 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)'
                        : 'linear-gradient(135deg, #9333ea 0%, #a855f7 100%)',
                    }}
                  />
                </div>
                <div className="result-screen-vote-percentage">
                  {Math.round((animatedVotes1 / totalVotes) * 100)}%
                </div>
              </div>
              <div className="result-screen-vs">VS</div>
              <div className="result-screen-vote-column">
                <div className="result-screen-vote-number">{animatedVotes2}</div>
                <div className="result-screen-vote-label">{debater2.username}</div>
                <div className="result-screen-vote-bar-container">
                  <div
                    className="result-screen-vote-bar"
                    style={{
                      width: `${(animatedVotes2 / totalVotes) * 100}%`,
                      background: debater2.id === winner.id
                        ? 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)'
                        : 'linear-gradient(135deg, #9333ea 0%, #a855f7 100%)',
                    }}
                  />
                </div>
                <div className="result-screen-vote-percentage">
                  {Math.round((animatedVotes2 / totalVotes) * 100)}%
                </div>
              </div>
            </div>
            <div className="result-screen-total-votes">{totalVotes} total votes</div>
          </div>
        </section>

        {/* Statistics Comparison */}
        <section className="result-screen-section">
          <div className="result-screen-stats-card">
            <h3 className="result-screen-stats-title">Statistics Comparison</h3>
            <div className="result-screen-stats-table">
              <div className="result-screen-stat-row">
                <div className="result-screen-stat-label">Total Speaking Time</div>
                <div className="result-screen-stat-values">
                  <div className={`result-screen-stat-value ${debater1.id === winner.id ? 'winner' : ''}`}>
                    {formatTime(debater1.totalSpeakingTime)}
                  </div>
                  <div className={`result-screen-stat-value ${debater2.id === winner.id ? 'winner' : ''}`}>
                    {formatTime(debater2.totalSpeakingTime)}
                  </div>
                </div>
              </div>
              <div className="result-screen-stat-row">
                <div className="result-screen-stat-label">Turns Completed</div>
                <div className="result-screen-stat-values">
                  <div className={`result-screen-stat-value ${debater1.id === winner.id ? 'winner' : ''}`}>
                    {debater1.turnsCompleted}
                  </div>
                  <div className={`result-screen-stat-value ${debater2.id === winner.id ? 'winner' : ''}`}>
                    {debater2.turnsCompleted}
                  </div>
                </div>
              </div>
              <div className="result-screen-stat-row">
                <div className="result-screen-stat-label">Avg. Argument Length</div>
                <div className="result-screen-stat-values">
                  <div className={`result-screen-stat-value ${debater1.id === winner.id ? 'winner' : ''}`}>
                    {debater1.averageArgumentLength} words
                  </div>
                  <div className={`result-screen-stat-value ${debater2.id === winner.id ? 'winner' : ''}`}>
                    {debater2.averageArgumentLength} words
                  </div>
                </div>
              </div>
              <div className="result-screen-stat-row">
                <div className="result-screen-stat-label">Audience Engagement</div>
                <div className="result-screen-stat-values">
                  <div className={`result-screen-stat-value ${debater1.id === winner.id ? 'winner' : ''}`}>
                    {debater1.audienceEngagement} messages
                  </div>
                  <div className={`result-screen-stat-value ${debater2.id === winner.id ? 'winner' : ''}`}>
                    {debater2.audienceEngagement} messages
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Debate Summary */}
        <section className="result-screen-section">
          <div className="result-screen-summary-card">
            <h3 className="result-screen-summary-title">Debate Summary</h3>
            <div className="result-screen-topic-reminder">
              <strong>Topic:</strong> {topic}
            </div>
            {keyArguments.length > 0 && (
              <details className="result-screen-arguments-accordion">
                <summary className="result-screen-arguments-summary">Key Arguments</summary>
                <div className="result-screen-arguments-list">
                  {keyArguments.map((arg, index) => (
                    <div key={index} className="result-screen-argument-item">
                      <div className="result-screen-argument-debater">{arg.debater}:</div>
                      <div className="result-screen-argument-text">{arg.argument}</div>
                    </div>
                  ))}
                </div>
              </details>
            )}
            {mostEngagingMoment && (
              <div className="result-screen-engaging-moment">
                <strong>Most Engaging Moment:</strong> {mostEngagingMoment.timestamp} -{' '}
                {mostEngagingMoment.description}
              </div>
            )}
          </div>
        </section>

        {/* Action Buttons */}
        <section className="result-screen-actions">
          <button className="result-screen-button result-screen-button-primary" onClick={handleBackToHome}>
            Back to Home
          </button>
          {onViewTranscript && (
            <button
              className="result-screen-button result-screen-button-outline"
              onClick={onViewTranscript}
            >
              View Full Transcript
            </button>
          )}
          <button
            className="result-screen-button result-screen-button-share"
            onClick={() => setShowShareCard(!showShareCard)}
          >
            Share Results
          </button>
        </section>

        {/* Share Card */}
        {showShareCard && (
          <section className="result-screen-section">
            <div className="result-screen-share-card" ref={shareCardRef}>
              <div className="result-screen-share-header">
                <h3 className="result-screen-share-title">Share Results</h3>
                <button
                  className="result-screen-share-close"
                  onClick={() => setShowShareCard(false)}
                  aria-label="Close share card"
                >
                  ✕
                </button>
              </div>
              <div className="result-screen-share-content">
                <div className="result-screen-share-branding">Debate Arena</div>
                <div className="result-screen-share-topic">{topic}</div>
                <div className="result-screen-share-winner">
                  <div className="result-screen-share-winner-label">Winner:</div>
                  <div className="result-screen-share-winner-name">{winner.username}</div>
                </div>
                <div className="result-screen-share-votes">
                  <div className="result-screen-share-vote-item">
                    <span>{debater1.username}</span>
                    <span>{debater1.votes} votes</span>
                  </div>
                  <div className="result-screen-share-vote-item">
                    <span>{debater2.username}</span>
                    <span>{debater2.votes} votes</span>
                  </div>
                </div>
              </div>
              <div className="result-screen-share-actions">
                <button
                  className="result-screen-share-action-button"
                  onClick={handleDownloadImage}
                  title="Download as image"
                >
                  📥 Download
                </button>
                <button
                  className="result-screen-share-action-button"
                  onClick={handleCopyLink}
                  title="Copy link"
                >
                  {copied ? '✓ Copied!' : '🔗 Copy Link'}
                </button>
                <button
                  className="result-screen-share-action-button"
                  onClick={() => handleShare('twitter')}
                  title="Share on Twitter"
                >
                  🐦 Twitter
                </button>
                <button
                  className="result-screen-share-action-button"
                  onClick={() => handleShare('facebook')}
                  title="Share on Facebook"
                >
                  📘 Facebook
                </button>
                <button
                  className="result-screen-share-action-button"
                  onClick={() => handleShare('linkedin')}
                  title="Share on LinkedIn"
                >
                  💼 LinkedIn
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
    </PageWrapper>
  );
};

export default ResultScreen;
