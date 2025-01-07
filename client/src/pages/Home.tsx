import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import PodcastPlayer from "@/components/PodcastPlayer";
import NewsletterPreview from "@/components/NewsletterPreview";
import { useQuery } from "@tanstack/react-query";
import { fetchPodcastEpisodes, fetchNewsletterPosts, type PodcastEpisode, type NewsletterPost } from "@/lib/api";
import { Loader2 } from "lucide-react";

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
          <svg viewBox="0 0 100 100" className="w-full h-full text-primary">
            <circle cx="50" cy="50" r="40" className="fill-current" />
            <path d="M40 50 L60 50 M50 40 L50 60" className="stroke-white stroke-2" />
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
              A show and newsletter that chronicles one experienced founder's exploration into how AI is changing how startups get built and funded, as well as how we live and work more generally.
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