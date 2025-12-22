import React, { useState } from 'react';
import RoomCardSkeleton from './RoomCardSkeleton';
import Spinner from './Spinner';
import PageLoader from './PageLoader';
import LoadingButton from './LoadingButton';

/**
 * Example usage of all loading components
 */

const LoadingComponentsExample = () => {
  const [showPageLoader, setShowPageLoader] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleButtonClick = async () => {
    setButtonLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setButtonLoading(false);
  };

  return (
    <div style={{ padding: '24px', minHeight: '100vh', background: '#fafaf9' }}>
      <h1 style={{ marginBottom: '32px' }}>Loading Components Examples</h1>

      {/* RoomCardSkeleton Example */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ marginBottom: '16px' }}>RoomCardSkeleton</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
          }}
        >
          <RoomCardSkeleton count={3} />
        </div>
      </section>

      {/* Spinner Examples */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ marginBottom: '16px' }}>Spinner Sizes</h2>
        <div
          style={{
            display: 'flex',
            gap: '32px',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <Spinner size="sm" />
            <p style={{ marginTop: '8px', fontSize: '14px', color: '#6b7280' }}>Small (24px)</p>
          </div>
          <div>
            <Spinner size="md" />
            <p style={{ marginTop: '8px', fontSize: '14px', color: '#6b7280' }}>Medium (48px)</p>
          </div>
          <div>
            <Spinner size="lg" />
            <p style={{ marginTop: '8px', fontSize: '14px', color: '#6b7280' }}>Large (64px)</p>
          </div>
          <div>
            <Spinner size="md" text="Loading..." />
          </div>
        </div>
      </section>

      {/* LoadingButton Examples */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ marginBottom: '16px' }}>LoadingButton</h2>
        <div
          style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <LoadingButton
            loading={buttonLoading}
            loadingText="Submitting..."
            onClick={handleButtonClick}
            variant="primary"
          >
            Submit Form
          </LoadingButton>

          <LoadingButton
            loading={buttonLoading}
            loadingText="Loading..."
            onClick={handleButtonClick}
            variant="secondary"
          >
            Secondary Button
          </LoadingButton>

          <LoadingButton
            loading={buttonLoading}
            loadingText="Processing..."
            onClick={handleButtonClick}
            variant="outline"
          >
            Outline Button
          </LoadingButton>

          <LoadingButton
            loading={buttonLoading}
            onClick={handleButtonClick}
            variant="primary"
            size="sm"
          >
            Small Button
          </LoadingButton>

          <LoadingButton
            loading={buttonLoading}
            onClick={handleButtonClick}
            variant="primary"
            size="lg"
          >
            Large Button
          </LoadingButton>
        </div>
      </section>

      {/* PageLoader Example */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ marginBottom: '16px' }}>PageLoader</h2>
        <button
          onClick={() => setShowPageLoader(true)}
          style={{
            padding: '12px 24px',
            background: 'linear-gradient(135deg, #9333ea 0%, #a855f7 100%)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '9999px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Show Page Loader
        </button>
        {showPageLoader && (
          <PageLoader
            message="Loading Debate Arena..."
            logo={<span style={{ fontSize: '64px' }}>🏛️</span>}
          />
        )}
        {showPageLoader && (
          <button
            onClick={() => setShowPageLoader(false)}
            style={{
              marginTop: '16px',
              padding: '8px 16px',
              background: '#ef4444',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            Close Page Loader
          </button>
        )}
      </section>

      {/* Usage in Home Page */}
      <section>
        <h2 style={{ marginBottom: '16px' }}>Usage Example: Home Page</h2>
        <pre
          style={{
            background: '#1f2937',
            color: '#f3f4f6',
            padding: '16px',
            borderRadius: '8px',
            overflow: 'auto',
            fontSize: '14px',
          }}
        >
          {`// In Home.jsx
import RoomCardSkeleton from '../components/ui/RoomCardSkeleton';

{loading ? (
  <div className="home-rooms-grid">
    <RoomCardSkeleton count={6} />
  </div>
) : (
  rooms.map((room) => (
    <RoomCard key={room.id} room={room} />
  ))
)}`}
        </pre>
      </section>
    </div>
  );
};

export default LoadingComponentsExample;

