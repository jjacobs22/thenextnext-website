import app from "../server";

<<<<<<< HEAD
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
=======
export default app;
>>>>>>> dfd0f02ffb258fa2f0653e6f6bd3ea69defc06ae
