import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import type { PodcastEpisode } from "@/lib/api";

interface PodcastPlayerProps {
  episode: PodcastEpisode;
}

export default function PodcastPlayer({ episode }: PodcastPlayerProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          <span>{episode.title}</span>
          <span className="text-sm text-muted-foreground flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {format(new Date(episode.publishedAt), 'MMM d, yyyy')}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{episode.description}</p>
        {episode.embedUrl && (
          <div className="aspect-[16/9] w-full">
            <iframe
              src={episode.embedUrl}
              width="100%"
              height="100%"
              frameBorder="no"
              scrolling="no"
              seamless
              title={episode.title}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}