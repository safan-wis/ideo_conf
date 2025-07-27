# WisMeet - Video Conferencing Platform

A professional video conferencing platform built with Next.js, Stream Video SDK, and Clerk Authentication.

## Deployment to Heroku

### Prerequisites

1. A Heroku account
2. Heroku CLI installed
3. Git installed
4. GitHub repository connected to your project

### Environment Variables

Set the following environment variables in your Heroku dashboard:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Stream Video
NEXT_PUBLIC_STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret

# Base URL
NEXT_PUBLIC_BASE_URL=https://wismeet.herokuapp.com
```

### Deployment Steps

1. Login to Heroku Dashboard
2. Create a new app named "wismeet"
3. Go to the "Deploy" tab
4. Choose "GitHub" as deployment method
5. Connect to your GitHub repository
6. Choose the branch to deploy (usually main)
7. Enable automatic deploys (optional)
8. Click "Deploy Branch"

### Manual Deployment

If you prefer using Heroku CLI:

```bash
# Login to Heroku
heroku login

# Add Heroku remote
heroku git:remote -a wismeet

# Push to Heroku
git push heroku main
```

### Post-Deployment

1. Check if the build was successful
2. Verify environment variables are set
3. Test the application at https://wismeet.herokuapp.com

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Tech Stack

- Next.js 14
- Stream Video SDK
- Clerk Authentication
- TailwindCSS
- TypeScript 