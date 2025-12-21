import React, { useState } from 'react';
import RaiseHand from './RaiseHand';
import RaisedHandsList from './RaisedHandsList';
import type { RaisedHand } from './RaiseHand';

/**
 * Example usage of RaiseHand component
 * 
 * This demonstrates how to integrate the RaiseHand component
 * with Socket.IO and state management.
 */

const RaiseHandExample: React.FC = () => {
  const [raisedHands, setRaisedHands] = useState<RaisedHand[]>([
    {
      id: 1,
      userId: 123,
      username: 'John Doe',
      question: 'What is the main argument for this position?',
      timestamp: new Date(Date.now() - 120000), // 2 minutes ago
      answered: false,
      upvotes: 5,
    },
    {
      id: 2,
      userId: 456,
      username: 'Jane Smith',
      question: 'Can you provide more examples?',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      answered: false,
      upvotes: 2,
    },
  ]);

  const currentUserId = 999; // Current user ID
  const roomCode = 'ABC123';
  const isHost = true; // Set to true if current user is host/debater
  const [sortBy, setSortBy] = useState<'latest' | 'upvotes'>('latest');

  // Handle question submission
  const handleSubmit = async (question: string) => {
    // TODO: Replace with actual API call or Socket.IO emit
    const newQuestion: RaisedHand = {
      id: raisedHands.length + 1,
      userId: currentUserId,
      username: 'You',
      question,
      timestamp: new Date(),
      answered: false,
      upvotes: 0,
    };

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    setRaisedHands((prev) => [...prev, newQuestion]);

    // Socket.IO emit (uncomment when ready)
    // socket.emit('raise-hand', { roomCode, question });
  };

  // Handle marking question as answered
  const handleMarkAnswered = (questionId: number) => {
    setRaisedHands((prev) =>
      prev.map((hand) =>
        hand.id === questionId ? { ...hand, answered: true } : hand
      )
    );

    // Socket.IO emit (uncomment when ready)
    // socket.emit('mark-question-answered', { roomCode, questionId });
  };

  // Handle deleting question
  const handleDelete = async (questionId: number) => {
    setRaisedHands((prev) => prev.filter((hand) => hand.id !== questionId));

    // Socket.IO emit (uncomment when ready)
    // socket.emit('delete-question', { roomCode, questionId });
  };

  // Handle editing question
  const handleEdit = async (questionId: number, newQuestion: string) => {
    setRaisedHands((prev) =>
      prev.map((hand) =>
        hand.id === questionId ? { ...hand, question: newQuestion } : hand
      )
    );

    // Socket.IO emit (uncomment when ready)
    // socket.emit('edit-question', { roomCode, questionId, question: newQuestion });
  };

  // Handle upvoting question
  const handleUpvote = (questionId: number) => {
    setRaisedHands((prev) =>
      prev.map((hand) =>
        hand.id === questionId
          ? { ...hand, upvotes: (hand.upvotes || 0) + 1 }
          : hand
      )
    );

    // Socket.IO emit (uncomment when ready)
    // socket.emit('upvote-question', { roomCode, questionId });
  };

  return (
    <div style={{ padding: '24px', minHeight: '100vh', background: '#fafaf9' }}>
      <h1 style={{ marginBottom: '24px' }}>RaiseHand Component Example</h1>

      {/* Main Layout */}
      <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
        {/* Main Content Area */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '24px',
              minHeight: '400px',
            }}
          >
            <h2>Debate Content Area</h2>
            <p>This is where the debate content would be displayed.</p>
            <p>
              The RaiseHand floating button will appear in the bottom right
              corner.
            </p>
          </div>
        </div>

        {/* Sidebar with Raised Hands List */}
        <div style={{ width: '400px', flexShrink: 0 }}>
          <RaisedHandsList
            raisedHands={raisedHands}
            userId={currentUserId}
            isHost={isHost}
            onMarkAnswered={handleMarkAnswered}
            onUpvote={handleUpvote}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </div>
      </div>

      {/* RaiseHand Component - Floating Button */}
      <RaiseHand
        roomCode={roomCode}
        userId={currentUserId}
        onSubmit={handleSubmit}
        raisedHands={raisedHands}
        isHost={isHost}
        onMarkAnswered={handleMarkAnswered}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default RaiseHandExample;

/**
 * Socket.IO Integration Guide
 * 
 * To integrate with Socket.IO, follow these steps:
 * 
 * 1. Install socket.io-client:
 *    npm install socket.io-client
 * 
 * 2. Create or update socket connection:
 *    import { io } from 'socket.io-client';
 *    const socket = io('http://localhost:3000');
 * 
 * 3. In your component, listen for Socket.IO events:
 * 
 *    useEffect(() => {
 *      socket.emit('join-room', { roomCode });
 * 
 *      socket.on('hand-raised', (data) => {
 *        // Add new question to raisedHands
 *        setRaisedHands(prev => [...prev, data]);
 *      });
 * 
 *      socket.on('hand-acknowledged', (data) => {
 *        // Show notification if it's user's question
 *        if (data.userId === userId) {
 *          // Show toast notification
 *        }
 *      });
 * 
 *      socket.on('hand-answered', (data) => {
 *        // Update question status
 *        setRaisedHands(prev =>
 *          prev.map(h => h.id === data.questionId 
 *            ? { ...h, answered: true } 
 *            : h
 *          )
 *        );
 *      });
 * 
 *      socket.on('question-updated', (data) => {
 *        // Update question (edit/delete)
 *        setRaisedHands(prev =>
 *          prev.map(h => h.id === data.questionId 
 *            ? { ...h, ...data.updates } 
 *            : h
 *          )
 *        );
 *      });
 * 
 *      return () => {
 *        socket.emit('leave-room', { roomCode });
 *        socket.off('hand-raised');
 *        socket.off('hand-acknowledged');
 *        socket.off('hand-answered');
 *        socket.off('question-updated');
 *      };
 *    }, [roomCode, userId]);
 * 
 * 4. Server-side events to emit:
 *    - 'hand-raised': When a user submits a question
 *    - 'hand-acknowledged': When host acknowledges a question
 *    - 'hand-answered': When host marks question as answered
 *    - 'question-updated': When question is edited or deleted
 *    - 'question-upvoted': When question is upvoted
 */

