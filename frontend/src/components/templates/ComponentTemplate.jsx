import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types'; // Uncomment if prop-types is installed: npm install prop-types
import '../../styles/designSystem.css';
import './ComponentTemplate.css';

/**
 * ComponentTemplate - Template component following Clubhouse design system
 * 
 * This is a template/reference component showing best practices for:
 * - Design system usage
 * - State management
 * - Responsive design
 * - Accessibility
 * - Loading states
 * - Error handling
 */

const ComponentTemplate = ({
  title = 'Component Title',
  subtitle = 'Component subtitle or description',
  onAction,
  isLoading = false,
}) => {
  // State management
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [error, setError] = useState(null);

  // Mock data
  const mockData = [
    { id: 1, title: 'Item 1', description: 'Description 1' },
    { id: 2, title: 'Item 2', description: 'Description 2' },
    { id: 3, title: 'Item 3', description: 'Description 3' },
  ];

  // Effects
  useEffect(() => {
    // Simulate data fetching
    const fetchData = async () => {
      try {
        // TODO: Replace with actual API call
        await new Promise((resolve) => setTimeout(resolve, 500));
        setData(mockData);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  // Event handlers
  const handleItemClick = (item) => {
    setSelectedItem(item);
    if (onAction) {
      onAction(item);
    }
  };

  const handleKeyDown = (event, item) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleItemClick(item);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="component-template-container">
        <div className="ds-card" style={{ textAlign: 'center', padding: '48px' }}>
          <div className="ds-spinner" style={{ margin: '0 auto 16px' }} />
          <p className="ds-body-text">Loading...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="component-template-container">
        <div className="ds-card" style={{ textAlign: 'center', padding: '48px' }}>
          <p className="ds-body-text" style={{ color: '#ef4444' }}>
            Error: {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="component-template-container">
      <div className="ds-container">
        {/* Header Section */}
        <header className="component-template-header">
          <h1 className="ds-heading-1">{title}</h1>
          {subtitle && <p className="ds-body-text">{subtitle}</p>}
        </header>

        {/* Main Content */}
        <main className="component-template-main">
          {/* Grid Layout */}
          <div className="ds-grid ds-grid-3">
            {data.map((item) => (
              <div
                key={item.id}
                className="component-template-card"
                role="button"
                tabIndex={0}
                aria-label={`Select ${item.title}`}
                onClick={() => handleItemClick(item)}
                onKeyDown={(e) => handleKeyDown(e, item)}
              >
                <div className="component-template-card-content">
                  <h3 className="ds-heading-3">{item.title}</h3>
                  <p className="ds-muted-text">{item.description}</p>
                </div>
                
                {selectedItem?.id === item.id && (
                  <div className="component-template-card-badge" aria-label="Selected">
                    ✓
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>

        {/* Actions Section */}
        <footer className="component-template-footer">
          <button
            className="ds-button ds-button-primary"
            onClick={() => handleItemClick(selectedItem)}
            disabled={!selectedItem}
            aria-label="Confirm selection"
          >
            Confirm
          </button>
          
          <button
            className="ds-button ds-button-outline"
            onClick={() => setSelectedItem(null)}
            aria-label="Clear selection"
          >
            Clear
          </button>
        </footer>
      </div>
    </div>
  );
};

// PropTypes validation (requires: npm install prop-types)
// ComponentTemplate.propTypes = {
//   title: PropTypes.string,
//   subtitle: PropTypes.string,
//   onAction: PropTypes.func,
//   isLoading: PropTypes.bool,
// };

// TypeScript alternative (if using TypeScript):
// interface ComponentTemplateProps {
//   title?: string;
//   subtitle?: string;
//   onAction?: (item: any) => void;
//   isLoading?: boolean;
// }

export default ComponentTemplate;

