import type { Express } from "express";
import { createServer, type Server } from "http";
import { XMLParser } from "fast-xml-parser";

const SIMPLECAST_RSS_URL = "https://feeds.simplecast.com/deBaQ8G0";
const SUBSTACK_RSS_URL = "https://thenextnext.substack.com/feed";

export function registerRoutes(app: Express): Server {
  const httpServer = createServer(app);
  const parser = new XMLParser();

  // CORS handling for the API routes
  app.use('/api', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN || '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

  // Health check endpoint for monitoring
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", environment: process.env.NODE_ENV });
  });

  app.get("/api/podcast-episodes", async (_req, res) => {
    try {
      console.log("[API] Fetching podcast episodes from", SIMPLECAST_RSS_URL);
      const response = await fetch(SIMPLECAST_RSS_URL);

      if (!response.ok) {
        console.error(`[API] Failed to fetch podcast feed: ${response.status} ${response.statusText}`);
        return res.status(response.status).json({ 
          error: "Failed to fetch podcast feed",
          status: response.status 
        });
      }

      const xml = await response.text();
      const data = parser.parse(xml);

      const episodes = data.rss?.channel?.item?.map((item: any) => ({
        id: item.guid,
        title: item.title,
        description: item.description,
        publishedAt: item.pubDate,
        embedUrl: item.enclosure?.url?.replace('/audio/', '/embed/'),
      })) || [];

      console.log(`[API] Successfully fetched ${episodes.length} podcast episodes`);
      res.json(episodes.slice(0, 10));
    } catch (error) {
      console.error('[API] Error fetching podcast episodes:', error);
      res.status(500).json({ 
        error: "Failed to fetch podcast episodes",
        details: error instanceof Error ? error.message : String(error)
      });
    }
  });

  app.get("/api/newsletter-posts", async (_req, res) => {
    try {
      console.log("[API] Fetching newsletter posts from", SUBSTACK_RSS_URL);
      const response = await fetch(SUBSTACK_RSS_URL);

      if (!response.ok) {
        console.error(`[API] Failed to fetch newsletter feed: ${response.status} ${response.statusText}`);
        return res.status(response.status).json({ 
          error: "Failed to fetch newsletter feed",
          status: response.status 
        });
      }

      const xml = await response.text();
      const data = parser.parse(xml);

      const posts = data.rss?.channel?.item?.map((item: any) => ({
        id: item.guid,
        title: item.title,
        excerpt: item.description?.slice(0, 200) + "...",
        publishedAt: item.pubDate,
        url: item.link,
      })) || [];

      console.log(`[API] Successfully fetched ${posts.length} newsletter posts`);
      res.json(posts.slice(0, 10));
    } catch (error) {
      console.error('[API] Error fetching newsletter posts:', error);
      res.status(500).json({ 
        error: "Failed to fetch newsletter posts",
        details: error instanceof Error ? error.message : String(error)
      });
    }
  });

  return httpServer;
}