# Snake

Snake clone built with React, Node.js (Express), and Firebase. TypeScript is enabled globally. SCSS is used for styling, Redux for state management, and Docker for local Development.

## Getting started

1. Installs dependencies on frontend and backend (/ui and /api).

   ```sh
   npm run install
   ```

2. Builds the images for the frontend and the backend and creates two containers from them.

   ```sh
   npm run start
   ```

## Environment variables

Specified in /.env.development.

- **SNAKE_PORT**: Port the backend will run on.
- **SNAKE_FIREBASE_PRIVATE_KEY**: Firebase private key.
- **SNAKE_FIREBASE_PROJECT_ID**: Identifer for your Firebase project.
- **SNAKE_FIREBASE_CLIENT_EMAIL**: Firebase email.
- **SNAKE_FIREBASE_DATABASE_URL**: Firebase database URL.
- **REACT_APP_SNAKE_API_URL**: Backend URL.

## Other commands

- Removes images and containers.

  ```sh
  npm run stop
  ```

- Runs **stop** and **start** consecutively.

  ```sh
  npm run restart
  ```
