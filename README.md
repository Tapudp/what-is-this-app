# Next.js LLaVA Video Analysis App

This application integrates with the LLaVA video model to provide real-time analysis of live video streams. Users can record a video, submit it for analysis, and receive product descriptions from the LLaVA model.

## Table of Contents

- [Folder Structure](#folder-structure)
- [Setup Guide](#setup-guide)
  - [Environment Variables](#environment-variables)
  - [Install Dependencies](#install-dependencies)
  - [Run the Application](#run-the-application)

## Folder Structure

- **api**: Contains API route controllers.
- **components**: React components used in the frontend.
- **constants**: Store constants used throughout the application.
- **containers**: Page-level components or container components.
- **controllers**: API route controllers for server-side logic.
- **services**: Modules with business logic and API service code.
- **utils**: Utility and middleware modules.

## Setup Guide

### Environment Variables

Create a `.env.local` file in the root directory and add the following environment variables:

```env
# Replace the placeholder with your actual LLaVA model ID
REPLICATE_API_TOKEN=replicate_api_token
LLAVA_MODEL_ID=your_llava_model_id
```

## Install Dependencies

```
npm install
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

- Open the application in your browser.
- Record a video using the camera component.
- Click the "Capture and Send" button to submit the recorded video for analysis.
- View the product descriptions provided by the LLaVA model.
- Feel free to explore and customize the components, services, and controllers based on your requirements.
