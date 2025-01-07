import app from "../server";

// Configuration for Vercel serverless functions
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
    // Disable public directory access in Vercel
    useFileSystemPublicRoutes: false,
  },
};

// Export the Express app for Vercel serverless function
export default app;