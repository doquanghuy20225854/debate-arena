# Component Template Guide - Clubhouse Design System

## Quick Start

Để tạo component mới theo design system Clubhouse, sử dụng template này:

### 1. Tạo Component File

Tạo file `YourComponent.jsx` trong thư mục phù hợp (thường là `src/pages/` hoặc `src/components/`):

```jsx
import React, { useState, useEffect } from 'react';
import '../../styles/designSystem.css';
import './YourComponent.css';

const YourComponent = ({ title, onAction }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch data hoặc side effects
  }, []);

  return (
    <div className="your-component-container">
      <div className="ds-container">
        <h1 className="ds-heading-1">{title}</h1>
        {/* Your component content */}
      </div>
    </div>
  );
};

export default YourComponent;
```

### 2. Tạo CSS File

Tạo file `YourComponent.css` trong cùng thư mục:

```css
.your-component-container {
  min-height: 100vh;
  background: var(--color-background);
  padding: var(--spacing-2xl) var(--spacing-md);
}

.your-component-card {
  background: #ffffff;
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-soft);
  padding: var(--spacing-lg);
  transition: all var(--transition-fast);
}

.your-component-card:hover {
  transform: scale(1.02);
  box-shadow: var(--shadow-medium);
}
```

### 3. Sử dụng Design System Classes

#### Typography
- `.ds-heading-1` - Heading lớn (32px)
- `.ds-heading-2` - Heading vừa (24px)
- `.ds-heading-3` - Heading nhỏ (20px)
- `.ds-body-text` - Body text (16px)
- `.ds-muted-text` - Muted text (14px)

#### Buttons
- `.ds-button.ds-button-primary` - Primary button (gradient purple)
- `.ds-button.ds-button-secondary` - Secondary button (teal)
- `.ds-button.ds-button-outline` - Outline button

#### Layout
- `.ds-container` - Container với max-width và padding
- `.ds-grid.ds-grid-1` - 1 column grid
- `.ds-grid.ds-grid-2` - 2 columns grid
- `.ds-grid.ds-grid-3` - 3 columns grid

#### Cards
- `.ds-card` - Base card với shadow và hover effects

### 4. Design Tokens (CSS Variables)

Sử dụng CSS variables để dễ customize:

```css
.your-custom-style {
  background: var(--color-background);
  color: var(--color-text-heading);
  border-radius: var(--radius-card);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-soft);
  transition: all var(--transition-normal);
}
```

### 5. Responsive Design

Grid tự động responsive:
- Mobile (< 768px): 1 column
- Tablet (768px - 1024px): 2 columns
- Desktop (> 1024px): 3 columns

Custom responsive:

```css
@media (max-width: 768px) {
  .your-component {
    padding: var(--spacing-md);
  }
}
```

### 6. Accessibility

#### Required Practices:

1. **Semantic HTML**
```jsx
<main role="main">
  <section aria-labelledby="section-title">
    <h2 id="section-title">Title</h2>
  </section>
</main>
```

2. **ARIA Labels**
```jsx
<button aria-label="Close dialog" onClick={handleClose}>
  ×
</button>
```

3. **Keyboard Navigation**
```jsx
<div
  role="button"
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
  onClick={handleClick}
>
  Clickable element
</div>
```

4. **Focus States**
- Sử dụng `.ds-focus-visible` class
- Hoặc tự định nghĩa với `:focus-visible`

### 7. Loading States

```jsx
{isLoading ? (
  <div className="ds-card" style={{ textAlign: 'center' }}>
    <div className="ds-spinner" />
    <p>Loading...</p>
  </div>
) : (
  <div>Content</div>
)}
```

### 8. Error Handling

```jsx
{error ? (
  <div className="ds-card">
    <p style={{ color: '#ef4444' }}>Error: {error}</p>
  </div>
) : (
  <div>Content</div>
)}
```

## Full Example

Xem file `src/components/templates/ComponentTemplate.jsx` để có ví dụ đầy đủ với:
- State management
- Event handlers
- Loading states
- Error handling
- Accessibility
- Responsive design

## Design System Reference

Xem `src/styles/designSystem.css` để xem tất cả design tokens và utility classes.

Xem `src/utils/designSystem.md` để xem documentation đầy đủ về design system.

## Checklist khi tạo Component mới

- [ ] Import designSystem.css
- [ ] Sử dụng semantic HTML
- [ ] Thêm ARIA labels cho interactive elements
- [ ] Implement keyboard navigation
- [ ] Add focus-visible states
- [ ] Responsive design (mobile-first)
- [ ] Loading states
- [ ] Error handling
- [ ] Smooth transitions và animations
- [ ] Comments cho các phần quan trọng
- [ ] Mock data nếu cần
- [ ] PropTypes hoặc JSDoc types (optional)

