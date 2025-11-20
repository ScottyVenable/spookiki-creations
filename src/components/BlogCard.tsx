import type { BlogPost } from '@/lib/types'
import { Card } from './ui/card'
import { Link } from './Link'

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  const publishDate = post.published_at 
    ? new Date(post.published_at).toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      })
    : ''

  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="group overflow-hidden border-border hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
        {post.cover_image && (
          <div className="aspect-video overflow-hidden bg-muted">
            <img 
              src={post.cover_image} 
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        
        <div className="p-6">
          <div className="text-sm text-muted-foreground mb-2">
            {publishDate}
          </div>
          <h3 className="font-semibold text-xl mb-2 group-hover:text-primary transition-colors" style={{ fontFamily: 'Nunito, sans-serif' }}>
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {post.content.substring(0, 150)}...
          </p>
        </div>
      </Card>
    </Link>
  )
}
