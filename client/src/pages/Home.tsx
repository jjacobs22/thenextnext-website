import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import PodcastPlayer from "@/components/PodcastPlayer";
import NewsletterPreview from "@/components/NewsletterPreview";
import { useQuery } from "@tanstack/react-query";
import { fetchPodcastEpisodes, fetchNewsletterPosts, type PodcastEpisode, type NewsletterPost } from "@/lib/api";
import { Loader2, AlertCircle } from "lucide-react";

export default function Home() {
  const { data: episodes = [], isLoading: isLoadingEpisodes } = useQuery<PodcastEpisode[]>({
    queryKey: ['/api/podcast-episodes'],
    queryFn: fetchPodcastEpisodes
  });

  const { data: posts = [], isLoading: isLoadingPosts } = useQuery<NewsletterPost[]>({
    queryKey: ['/api/newsletter-posts'],
    queryFn: fetchNewsletterPosts
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="container mx-auto px-4 py-8 flex items-center gap-4">
        <div className="w-12 h-12">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Rays */}
            <line x1="50" y1="5" x2="50" y2="15" className="stroke-yellow-400" strokeWidth="6" strokeLinecap="round" />
            <line x1="85" y1="20" x2="75" y2="30" className="stroke-yellow-400" strokeWidth="6" strokeLinecap="round" />
            <line x1="95" y1="50" x2="85" y2="50" className="stroke-yellow-400" strokeWidth="6" strokeLinecap="round" />
            <line x1="85" y1="80" x2="75" y2="70" className="stroke-yellow-400" strokeWidth="6" strokeLinecap="round" />
            <line x1="15" y1="20" x2="25" y2="30" className="stroke-yellow-400" strokeWidth="6" strokeLinecap="round" />
            <line x1="5" y1="50" x2="15" y2="50" className="stroke-yellow-400" strokeWidth="6" strokeLinecap="round" />
            <line x1="15" y1="80" x2="25" y2="70" className="stroke-yellow-400" strokeWidth="6" strokeLinecap="round" />
            {/* Bulb */}
            <circle cx="50" cy="50" r="25" className="fill-yellow-400" />
            {/* Filament */}
            <path d="M40 50 L50 40 L60 50" className="stroke-white fill-none" strokeWidth="3" strokeLinecap="round" />
            {/* Base */}
            <rect x="45" y="75" width="10" height="15" className="fill-gray-300" />
            <rect x="42" y="72" width="16" height="4" className="fill-gray-300" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold">The Next Next</h1>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">About</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              A podcast and newsletter that chronicle one experienced founder's exploration into how AI is changing how startups get built and funded, as well as how we live and work more generally.
            </p>
          </CardContent>
        </Card>

        <Tabs defaultValue="podcast" className="space-y-4">
          <TabsList>
            <TabsTrigger value="podcast">Podcast</TabsTrigger>
            <TabsTrigger value="newsletter">Newsletter</TabsTrigger>
          </TabsList>

          <TabsContent value="podcast" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Latest Episodes
                  <a 
                    href="https://thenextnext.simplecast.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    Subscribe to Podcast
                  </a>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingEpisodes ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                  </div>
                ) : episodes.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <AlertCircle className="w-12 h-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Episodes coming soon! Stay tuned for our first release.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {episodes.map((episode) => (
                      <PodcastPlayer key={episode.id} episode={episode} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="newsletter" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Latest Posts
                  <a 
                    href="https://thenextnext.substack.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    Subscribe to Newsletter
                  </a>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingPosts ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                  </div>
                ) : posts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <AlertCircle className="w-12 h-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No posts yet. Check back soon for updates!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {posts.map((post) => (
                      <NewsletterPreview key={post.id} post={post} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}