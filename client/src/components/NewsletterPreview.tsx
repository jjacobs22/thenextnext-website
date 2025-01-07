import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import type { NewsletterPost } from "@/lib/api";

interface NewsletterPreviewProps {
  post: NewsletterPost;
}

export default function NewsletterPreview({ post }: NewsletterPreviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          <span>{post.title}</span>
          <span className="text-sm text-muted-foreground flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {format(new Date(post.publishedAt), 'MMM d, yyyy')}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{post.excerpt}</p>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => window.open(post.url, '_blank', 'noopener,noreferrer')}
          className="flex items-center gap-2"
        >
          Read More <ArrowRight className="w-4 h-4" />
        </Button>
      </CardContent>
    </Card>
  );
}