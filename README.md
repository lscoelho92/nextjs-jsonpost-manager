# Anydesk Posts Manager

## Overview
This project is a simple post management application built with Next.js, TypeScript, Zustand for state management, and Tailwind CSS for styling. It fetches posts from the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/) and allows users to view posts dynamically.

## Features
- Fetch and display posts from JSONPlaceholder.
- State management handled with Zustand.
- Dynamic rendering of posts.
- Basic error handling.
- Responsive design using Tailwind CSS.
- Unit tests using Jest and React Testing Library.

## Main Files & Structure
```
/src
 ├── components
 │   ├── ConfirmModal.tsx      # Confirmation modal component
 │   ├── Header.tsx            # Header component
 │   ├── Loader.tsx            # Loader component
 │   ├── PostCard.tsx          # Individual post display component
 │   ├── PostForm.tsx          # Form for creating and editing posts
 │   ├── PostPageClient.tsx    # Client-side rendering for posts page
 │   ├── PostsList.tsx         # List of posts component
 │
 ├── lib
 │   ├── api.ts                # API handling functions
 │
 ├── store
 │   ├── usePostStore.ts       # Zustand store for post management
 │
 ├── types
 │   ├── post.ts               # TypeScript types for posts
```

## Setup & Installation
```sh
git clone <repository-url>
cd <project-folder>
npm install
npm run dev
```

## Tests
This project uses Jest to test the application.

The coverage of all tests can be checked using the command:
```sh
npm test
```

## Points for Improvement
- **API Integration**: Currently, state management simulates API operations. Ideally, the API should support post creation, editing, and deletion directly, removing the need for Zustand.
- **UI/UX Enhancements**: The project uses default Next.js and Tailwind CSS styles. A dedicated layout and improved design would enhance the user experience.
- **State Management Optimization**: Some components use multiple `useState` hooks, making the code less readable. A better state management library could simplify this.
- **Performance & SEO**: Further optimizations could improve both performance and SEO rankings.
- **Use of Images & Icons**: Currently, minimal effort has been put into the visual aspects. Adding better images and icons would improve the application's appearance.
- **Testing Improvements**: Tests were written quickly, relying on text-based selectors. They should be refined to use more robust selection strategies for better maintainability.
