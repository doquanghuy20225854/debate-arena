
# Design System Documentation - Clubhouse Inspired

## Overview
This design system provides a consistent, accessible, and beautiful design language for Debate Arena components.

## Color Palette

### Primary Colors
- **Primary Start**: `#9333ea` (Purple-600)
- **Primary End**: `#a855f7` (Purple-500)
- **Gradient**: Linear gradient from start to end (135deg)

### Secondary Colors
- **Teal**: `#14b8a6` (Teal-500)

### Neutral Colors
- **Background**: `#fafaf9` (Warm Gray)
- **Text Heading**: `#1f2937` (Gray-800)
- **Text Body**: `#4b5563` (Gray-600)
- **Text Muted**: `#9ca3af` (Gray-400)

## Typography

### Font Family
- Primary: `Inter` (sans-serif)
- Fallback: System fonts (-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto')

### Font Sizes
- **Heading 1**: 32px (2rem) - Desktop, 28px - Mobile
- **Heading 2**: 24px (1.5rem) - Desktop, 20px - Mobile
- **Heading 3**: 20px (1.25rem)
- **Body**: 16px (1rem)
- **Muted**: 14px (0.875rem)

### Font Weights
- **Heading**: 700 (Bold)
- **Subheading**: 600 (Semi-bold)
- **Body**: 400 (Regular)

## Spacing

Scale: 4px base unit
- **XS**: 4px
- **SM**: 8px
- **MD**: 16px
- **LG**: 24px
- **XL**: 32px
- **2XL**: 48px

## Border Radius

- **Cards**: 16px
- **Buttons**: 9999px (pill shape)
- **Inputs**: 12px

## Shadows

- **Soft**: `0 2px 15px rgba(0, 0, 0, 0.07)` - Default cards
- **Medium**: `0 4px 20px rgba(0, 0, 0, 0.1)` - Hover states
- **Large**: `0 10px 40px rgba(0, 0, 0, 0.15)` - Modals/Overlays

## Transitions

- **Fast**: 0.2s ease - Hover effects
- **Normal**: 0.3s ease - Standard transitions
- **Slow**: 0.5s ease - Complex animations

## Breakpoints

- **Mobile**: < 480px
- **Tablet**: 481px - 768px
- **Desktop**: 769px - 1024px
- **Large Desktop**: > 1024px

## Component Guidelines

### Buttons
- Use gradient for primary actions
- Pill shape (border-radius: 9999px)
- Minimum touch target: 44x44px
- Include focus-visible states
- Disabled state: 60% opacity

### Cards
- White background (#ffffff)
- Border radius: 16px
- Soft shadow by default
- Medium shadow on hover
- Scale transform on hover (1.02)

### Inputs
- Border: 2px solid #e5e7eb
- Border radius: 12px
- Focus: Purple ring (3px, 10% opacity)
- Minimum height: 44px

### Grid Layouts
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns (when applicable)

## Accessibility

### Required Practices
1. Semantic HTML elements
2. ARIA labels for interactive elements
3. Keyboard navigation support
4. Focus-visible states
5. Screen reader support (sr-only class)

### Color Contrast
- Text on white: Minimum 4.5:1 ratio
- Interactive elements: Minimum 3:1 ratio

## Animation Guidelines

### Hover Effects
```css
transform: scale(1.02);
transition: transform 0.2s ease;
```

### Focus States
```css
outline: 2px solid var(--color-primary-start);
outline-offset: 2px;
```

### Loading States
- Use spinner for async operations
- Pulse animation for skeleton loaders

## Code Structure Template

```jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../../styles/designSystem.css';
import './ComponentName.css';

const ComponentName = ({ prop1, prop2 }) => {
  // State management
  const [state, setState] = useState(null);
  
  // Effects
  useEffect(() => {
    // Side effects
  }, []);
  
  // Event handlers
  const handleAction = () => {
    // Handler logic
  };
  
  return (
    <div className="component-container">
      {/* Component JSX */}
    </div>
  );
};

ComponentName.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number,
};

export default ComponentName;
```

## Usage Examples

### Using Design System Classes
```jsx
<div className="ds-card">
  <h1 className="ds-heading-1">Title</h1>
  <p className="ds-body-text">Body text</p>
  <button className="ds-button ds-button-primary">
    Primary Action
  </button>
</div>
```

### Responsive Grid
```jsx
<div className="ds-grid ds-grid-3">
  {/* Grid items */}
</div>
```

### Custom Styling with CSS Variables
```css
.custom-component {
  background: var(--color-background);
  border-radius: var(--radius-card);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-soft);
}
```

