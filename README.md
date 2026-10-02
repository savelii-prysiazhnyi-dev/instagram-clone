# Instagram Web Client

A modern, responsive, high-performance web client inspired by Instagram, built with React 19, TypeScript, Vite, and Tailwind CSS v4.

---
<img width="1920" height="959" alt="image" src="https://github.com/user-attachments/assets/f26b9468-61b9-44b9-bc7e-75cc80c5d1e9" />
<img width="1920" height="959" alt="image" src="https://github.com/user-attachments/assets/76766a86-54d6-4797-888a-b5029dbd6c66" />
<img width="1920" height="959" alt="image" src="https://github.com/user-attachments/assets/e2e9206d-a7e5-4696-8590-cbf34b18cf0e" />



## Features

### 1. Modern Responsive Navigation
- **Desktop Sidebar**: Collapsible responsive navigation bar featuring Home, Search, Explore, Notifications, Create Post, Saved, and Profile views.
- **Mobile Top Header & Bottom Navigation**: Native mobile app-style layout with top header and fixed bottom navigation.
- **Theme Support**: Seamless Dark Mode and Light Mode with system preference detection and localStorage persistence.

### 2. Stories System & Fullscreen Viewer
- **Stories Tray**: Horizontal scrollable tray with Instagram gradient rings indicating unseen stories, viewed rings, and quick story upload button.
- **Fullscreen Story Viewer**:
  - Segmented progress bars with 5-second automatic progression.
  - Keyboard navigation (Left, Right, Space to pause/resume, Escape to close).
  - Quick interactive emoji reactions with floating animation bursts.
  - Interactive reply form with instant feedback.
  - Automatic marking of viewed stories.

### 3. Interactive Feed & Media Interactions
- **Post Cards**:
  - Double-tap / double-click to like with animated heart pop.
  - Dynamic like counts with animated toggle.
  - Bookmark & save posts to personal collection.
  - Share post with one-click URL copying.
  - Comments preview and interactive comment submission with instant state updates.
  - Quick emoji reaction drawer.
- **Post Detail Split Modal**: Desktop-optimized split modal displaying high-resolution media on the left alongside the full scrollable comment thread and actions on the right.
- **Create Post Modal**: Multi-step post creation modal with curated preset imagery, custom URL support, caption composer, and location tagging.

### 4. Comprehensive User Profile
- Profile header with verified badge, post count, follower count, and following count.
- Multi-line bio with external clickable links.
- Story Highlights carousel (Travel, Workspace, Design, Cafes).
- Tabbed media grid (Posts, Saved, Tagged) with hover overlays displaying like and comment metrics.
- Edit Profile modal with name, bio, website, and avatar updater.

### 5. Explore Discovery & Global Search
- **Explore Grid**: Mosaic grid with featured media cards, Reels badges, and category filter pills (All, Nature, Architecture, Travel, Photography, Style, Tech).
- **Search Drawer**: Slide-out instant search panel filtering accounts, captions, and locations with live matching.
- **Notifications Panel**: Interactive drawer with unread badges, notifications for likes, comments, and follows, and "Mark all as read" capability.

---

## Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: [TypeScript 6](https://www.typescriptlang.org/)
- **Code Quality**: Prettier & strict TypeScript checks

---

## Getting Started

### Prerequisites
- Node.js (v20+ recommended)
- pnpm or npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd instagram-ui-clone

# Install dependencies
pnpm install
```

### Development

```bash
pnpm run dev
```

### Production Build

```bash
# Type-check and build
pnpm run build

# Preview build
pnpm run preview
```

### Verification & Formatting

```bash
# Check code formatting
pnpm run format:check

# Format files
pnpm run format

# Strict type check
pnpm run lint
```
