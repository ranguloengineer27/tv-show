# TV Shows Explorer

A modern, responsive web application for browsing and managing TV shows, built with Next.js 16, React 19, and TypeScript.

## Features

- 🔍 **Search TV Shows**: Search for TV shows using the TVMaze API
- ⭐ **Favorites Management**: Save and manage your favorite shows with persistent storage
- 🎨 **Dark Mode**: Toggle between light and dark themes
- 📱 **Responsive Design**: Optimized for all screen sizes
- ⚡ **Performance Optimized**: Client-side caching, skeleton loading states, and optimized images
- ♿ **Accessible**: Built with accessibility best practices
- 🧪 **Well Tested**: Comprehensive test coverage with Jest and React Testing Library

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query)
- **Theme Management**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Testing**: [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/react)

## Getting Started

### Prerequisites

- Node.js 20 or higher
- pnpm 10.20.0 or higher

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tv-shows
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint
- `pnpm test` - Run tests
- `pnpm test:watch` - Run tests in watch mode

## Project Structure

```
tv-shows/
├── app/                      # Next.js App Router pages
│   ├── favorites/           # Favorites page
│   ├── show/[id]/          # Show details page
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── api/                     # API services and types
│   ├── services/           # API service functions
│   └── types/              # TypeScript type definitions
├── ui/                      # UI components and hooks
│   ├── components/         # React components
│   │   ├── baseComponents/ # Reusable base components
│   │   ├── Favorites/      # Favorites-related components
│   │   ├── Header/         # Header component
│   │   ├── ShowCard/       # Show card component
│   │   ├── ShowDetails/    # Show details components
│   │   └── ShowsContainer/ # Shows container components
│   └── hooks/              # Custom React hooks
├── lib/                     # Utility functions and constants
├── tests/                   # Test files
└── public/                  # Static assets
```

## Key Features

### Search and Browse
- Search for TV shows by name
- Browse all available shows with pagination
- View detailed information about each show

### Favorites System
- Add/remove shows from favorites
- Persistent storage using Zustand with localStorage
- Dedicated favorites page

### Theme Support
- Light and dark mode
- Persistent theme preference
- Smooth theme transitions

### Performance
- Client-side caching with TanStack Query
- Server-side caching with Next.js revalidation
- Skeleton loading states
- Optimized images with placeholders

### Accessibility
- Semantic HTML
- ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly

## API

This application uses the [TVMaze API](https://www.tvmaze.com/api) to fetch TV show data.

## Testing

Run the test suite:
```bash
pnpm test
```

Run tests in watch mode:
```bash
pnpm test:watch
```

## License

This project is private and not licensed for public use.
