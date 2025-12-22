import React from 'react';
import './RoomCardSkeleton.css';

const RoomCardSkeleton = ({ count = 1, className = '' }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={`room-card-skeleton ${className}`}>
          {/* Badge skeleton */}
          <div className="room-card-skeleton-badge" />

          {/* Category skeleton */}
          <div className="room-card-skeleton-category" />

          {/* Topic skeleton (2 lines) */}
          <div className="room-card-skeleton-topic">
            <div className="room-card-skeleton-line" style={{ width: '100%' }} />
            <div className="room-card-skeleton-line" style={{ width: '80%' }} />
          </div>

          {/* Participants skeleton */}
          <div className="room-card-skeleton-participants">
            <div className="room-card-skeleton-avatars">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="room-card-skeleton-avatar" />
              ))}
            </div>
            <div className="room-card-skeleton-count" />
          </div>

          {/* Button skeleton */}
          <div className="room-card-skeleton-button" />
        </div>
      ))}
    </>
  );
};

export default RoomCardSkeleton;

