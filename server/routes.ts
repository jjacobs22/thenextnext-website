import type { Express } from "express";
import { createServer, type Server } from "http";
import { XMLParser } from "fast-xml-parser";

// We'll update this URL once we get the feed ID
const SIMPLECAST_RSS_URL = "https://feeds.simplecast.com/your-feed-id";
const SUBSTACK_RSS_URL = "https://thenextnext.substack.com/feed";

export function registerRoutes(app: Express): Server {
  const httpServer = createServer(app);
  const parser = new XMLParser();

  app.get("/api/podcast-episodes", async (_req, res) => {
    try {
      const response = await fetch(SIMPLECAST_RSS_URL);
      const xml = await response.text();
      const data = parser.parse(xml);

      const episodes = data.rss?.channel?.item?.map((item: any) => ({
        id: item.guid,
        title: item.title,
        description: item.description,
        publishedAt: item.pubDate,
        embedUrl: item.enclosure?.url?.replace('/audio/', '/embed/'),
      })) || [];

      res.json(episodes.slice(0, 10));
    } catch (error) {
      console.error('Error fetching podcast episodes:', error);
      res.status(500).json({ error: "Failed to fetch podcast episodes" });
    }
  });

  app.get("/api/newsletter-posts", async (_req, res) => {
    try {
      const response = await fetch(SUBSTACK_RSS_URL);
      const xml = await response.text();
      const data = parser.parse(xml);

      const posts = data.rss?.channel?.item?.map((item: any) => ({
        id: item.guid,
        title: item.title,
        excerpt: item.description?.slice(0, 200) + "...",
        publishedAt: item.pubDate,
        url: item.link,
      })) || [];

      res.json(posts.slice(0, 10));
    } catch (error) {
      console.error('Error fetching newsletter posts:', error);
      res.status(500).json({ error: "Failed to fetch newsletter posts" });
    }
  });

  return httpServer;
}