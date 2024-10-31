# File_Encryption_App

# File Encryption Tool

This project is a client-side web application for encrypting and decrypting files securely on the user's device. Built with React and TypeScript and styled using Tailwind CSS, the tool performs all encryption and decryption in the browser for maximum data security.

 Features

- AES-GCM encryption with 256-bit keys for strong security
- Password-based key derivation using PBKDF2
- Local file handling; no data is transmitted to a server
- Simple, user-friendly interface with encryption and decryption tabs

 Project Setup

 1. Tools Used

- Frontend: 
  - React (JavaScript Library) - Builds and manages UI components
  - Vite (Build Tool) - For efficient and optimized project setup
  - TypeScript - Provides static typing for more reliable and maintainable code
  - Tailwind CSS - Utility-first CSS framework for consistent styling
  - React Router - Manages in-app navigation between the "Encrypt" and "Decrypt" tabs
  - Lucide React - Icon library for UI elements

- Backend:
  - None - All encryption, decryption, and file handling are done in the browser.

 2. Languages

- TypeScript - Main language for implementing logic, components, and encryption/decryption functions.
- CSS (via Tailwind CSS) - Used to style the application with pre-defined utility classes.

 Setup Instructions

Follow these steps to set up the project on your local machine:

bash
# Create a new directory
mkdir file-encryption-app
cd file-encryption-app

# Initialize a new Vite project with React and TypeScript
npm create vite@latest . -- --template react-ts

# Install dependencies
npm install lucide-react react-router-dom clsx tailwind-merge

# Configure Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Run the development server
npm run dev
