import React, { useState, useEffect, useRef } from 'react';
import '../../styles/designSystem.css';
import './RaiseHand.css';

interface RaisedHand {
  id: number;
  userId: number;
  username: string;
  avatar?: string;
  question: string;
  timestamp: Date | string;
  answered: boolean;
  upvotes?: number;
}

interface RaiseHandProps {
  roomCode: string;
  userId: number;
  onSubmit: (question: string) => void | Promise<void>;
  raisedHands?: RaisedHand[];
  isHost?: boolean;
  onMarkAnswered?: (questionId: number) => void;
  onDelete?: (questionId: number) => void;
  onEdit?: (questionId: number, newQuestion: string) => void;
}

const RaiseHand: React.FC<RaiseHandProps> = ({
  roomCode,
  userId,
  onSubmit,
  raisedHands = [],
  isHost = false,
  onMarkAnswered,
  onDelete,
  onEdit,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const MAX_LENGTH = 200;

  // Check if user already has a question
  const userQuestion = raisedHands.find((h) => h.userId === userId && !h.answered);
  const hasExistingQuestion = !!userQuestion;

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [question]);

  // Socket.IO event handlers (commented for now)
  useEffect(() => {
    // TODO: Initialize Socket.IO connection
    // import { io } from 'socket.io-client';
    // const socket = io('/');
    // socket.emit('join-room', { roomCode });
    //
    // socket.on('hand-raised', (data) => {
    //   // Handle new raised hand
    //   console.log('New hand raised:', data);
    // });
    //
    // socket.on('hand-acknowledged', (data) => {
    //   // Handle host acknowledging question
    //   if (data.userId === userId) {
    //     // Show notification
    //     console.log('Your question was acknowledged!');
    //   }
    // });
    //
    // socket.on('hand-answered', (data) => {
    //   // Handle question marked as answered
    //   console.log('Question answered:', data);
    // });
    //
    // return () => {
    //   socket.emit('leave-room', { roomCode });
    //   socket.disconnect();
    // };
  }, [roomCode, userId]);

  const handleOpenModal = () => {
    if (hasExistingQuestion) {
      setEditingId(userQuestion.id);
      setEditText(userQuestion.question);
      setIsModalOpen(true);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setQuestion('');
    setError(null);
    setEditingId(null);
    setEditText('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const textToSubmit = editingId ? editText : question;
    
    if (!textToSubmit.trim()) {
      setError('Please enter a question');
      return;
    }

    if (textToSubmit.length > MAX_LENGTH) {
      setError(`Question must be ${MAX_LENGTH} characters or less`);
      return;
    }

    setIsSubmitting(true);

    try {
      if (editingId && onEdit) {
        await onEdit(editingId, textToSubmit);
        // TODO: Socket.IO emit
        // socket.emit('edit-question', { roomCode, questionId: editingId, question: textToSubmit });
      } else {
        await onSubmit(textToSubmit);
        // TODO: Socket.IO emit
        // socket.emit('raise-hand', { roomCode, question: textToSubmit });
      }
      
      handleCloseModal();
    } catch (err: any) {
      setError(err.message || 'Failed to submit question');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!editingId || !onDelete) return;
    
    if (window.confirm('Are you sure you want to delete this question?')) {
      try {
        await onDelete(editingId);
        // TODO: Socket.IO emit
        // socket.emit('delete-question', { roomCode, questionId: editingId });
        handleCloseModal();
      } catch (err: any) {
        setError(err.message || 'Failed to delete question');
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSubmit(e as any);
    }
  };

  const pendingCount = raisedHands.filter((h) => !h.answered).length;

  return (
    <>
      {/* Floating Action Button */}
      <button
        className="raise-hand-fab"
        onClick={handleOpenModal}
        aria-label="Raise your hand to ask a question"
        title="Raise your hand"
      >
        <span className="raise-hand-fab-icon">🙋</span>
        {pendingCount > 0 && (
          <span className="raise-hand-fab-badge" aria-label={`${pendingCount} questions`}>
            {pendingCount > 99 ? '99+' : pendingCount}
          </span>
        )}
      </button>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="raise-hand-modal-overlay" onClick={handleCloseModal}>
          <div
            className="raise-hand-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-labelledby="raise-hand-title"
            aria-modal="true"
          >
            {/* Modal Header */}
            <div className="raise-hand-modal-header">
              <div>
                <h2 id="raise-hand-title" className="raise-hand-modal-title">
                  ✋ Raise Your Hand
                </h2>
                <p className="raise-hand-modal-subtitle">
                  Ask a question to the debaters
                </p>
              </div>
              <button
                className="raise-hand-modal-close"
                onClick={handleCloseModal}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <form onSubmit={handleSubmit} className="raise-hand-modal-form">
              <div className="raise-hand-form-group">
                <textarea
                  ref={textareaRef}
                  className="raise-hand-textarea"
                  placeholder="What's your question?"
                  value={editingId ? editText : question}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length <= MAX_LENGTH) {
                      editingId ? setEditText(value) : setQuestion(value);
                    }
                  }}
                  onKeyDown={handleKeyDown}
                  rows={4}
                  maxLength={MAX_LENGTH}
                  aria-label="Question input"
                  aria-describedby="char-count"
                />
                <div className="raise-hand-char-count" id="char-count">
                  {(editingId ? editText : question).length}/{MAX_LENGTH}
                </div>
              </div>

              {error && (
                <div className="raise-hand-error" role="alert">
                  {error}
                </div>
              )}

              {/* Action Buttons */}
              <div className="raise-hand-modal-actions">
                {editingId && onDelete && (
                  <button
                    type="button"
                    className="raise-hand-button raise-hand-button-danger"
                    onClick={handleDelete}
                    disabled={isSubmitting}
                  >
                    Delete
                  </button>
                )}
                <div className="raise-hand-actions-right">
                  <button
                    type="button"
                    className="raise-hand-button raise-hand-button-cancel"
                    onClick={handleCloseModal}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="raise-hand-button raise-hand-button-submit"
                    disabled={
                      isSubmitting ||
                      !(editingId ? editText.trim() : question.trim())
                    }
                  >
                    {isSubmitting ? (
                      <>
                        <span className="raise-hand-spinner" />
                        Submitting...
                      </>
                    ) : editingId ? (
                      'Update Question'
                    ) : (
                      'Submit Question'
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default RaiseHand;
export type { RaisedHand, RaiseHandProps };

