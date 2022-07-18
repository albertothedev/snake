# Snake

Snake clone built with React, Node.js (Express), and Firebase. TypeScript is enabled globally. SCSS is used for styling and Redux for state management.

## Getting started

1. Install root dependencies:

   ```sh
   npm i
   ```

2. Install dependencies on the frontend and the backend:

   ```sh
   npm run install
   ```

3. Start the development server on the frontend and the backend:

   ```sh
   npm run dev
   ```

## Environment variables

### Frontend

- **REACT_APP_SNAKE_API_URL**: Backend URL.

### Backend

- **SNAKE_PORT**: Port the backend will run on.
- **SNAKE_FIREBASE_PRIVATE_KEY**: Firebase private key.
- **SNAKE_FIREBASE_PROJECT_ID**: Identifier for your Firebase project.
- **SNAKE_FIREBASE_CLIENT_EMAIL**: Firebase email.
- **SNAKE_FIREBASE_DATABASE_URL**: Firebase database URL.

## Other commands

- Install dependencies on the frontend:

  ```sh
  npm run install:ui
  ```

- Install dependencies on the backend:

  ```sh
  npm run install:api
  ```

- Start the frontend development server:

  ```sh
  npm run dev:ui
  ```

- Start the backend development server:

  ```sh
  npm run dev:api
  ```
