# Bubbles Backend

This backend serves the [Bubbles chat app](https://github.com/bubbles-chat/bubbles), built using Node.js, TypeScript, Express.js, Socket.IO, MongoDB, Cloudinary, and Firebase Admin SDK.

## Introduction

This custom backend was created to address the limitations in the original [Bubbles chat app](https://github.com/Youssef-S-Negm/Bubbles), enabling features like real-time notifications and removing Firebase's daily download limits for improved functionality and scalability.

## Getting Started

### Required Files
- `serviceAccountKey.json`: Place this file in the root directory for Firebase Admin SDK authentication.

### Required Environment Variables (`.env`)

- `PORT`: Server running port.
- **Firebase Configuration** (found in `serviceAccountKey.json`):
  - `FIREBASE_PROJECT_ID`
  - `FIREBASE_PRIVATE_KEY_ID`
  - `FIREBASE_PRIVATE_KEY`
  - `FIREBASE_CLIENT_EMAIL`
  - `FIREBASE_CLIENT_ID`
  - `FIREBASE_AUTH_PROVIDER_X509_CERT_URL`
  - `FIREBASE_CLIENT_X509_CERT_URL`
- `DB_URL`: Database connection URL for MongoDB.
- `CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name for media storage.
- `CLOUDINARY_API_KEY`: Cloudinary API key.
- `CLOUDINARY_API_SECRET`: Cloudinary API secret.
### Commands
1. Install dependencies

    ```bash
    npm install
    ```

2. Start the development server

    ```bash
    npm run dev
    ```

    or

    ```bash
    nodemon
    ```