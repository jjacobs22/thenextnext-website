import { XMLParser } from 'fast-xml-parser';

export interface PodcastEpisode {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  embedUrl: string;
}

export interface NewsletterPost {
  id: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  url: string;
}

export async function fetchPodcastEpisodes(): Promise<PodcastEpisode[]> {
  const response = await fetch('/api/podcast-episodes');
  if (!response.ok) {
    throw new Error('Failed to fetch podcast episodes');
  }
  return response.json();
}

export async function fetchNewsletterPosts(): Promise<NewsletterPost[]> {
  const response = await fetch('/api/newsletter-posts');
  if (!response.ok) {
    throw new Error('Failed to fetch newsletter posts');
  }
  return response.json();
}