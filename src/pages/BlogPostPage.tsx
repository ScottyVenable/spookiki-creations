import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Link } from '@/components/Link'
import { useRepositoryData } from '@/hooks/useRepositoryData'
import type { BlogPost } from '@/lib/types'
import { ArrowLeft, Calendar } from '@phosphor-icons/react'

const BASE_PATH = '/spookiki-creations'

export default function BlogPostPage() {
  const [blogPosts] = useRepositoryData<BlogPost>('/spookiki-creations/data/blog-posts.json', 'blog_posts')

  const pathname = window.location.pathname.replace(BASE_PATH, '')
  const slug = pathname.split('/blog/')[1]
  const post = (blogPosts || []).find(p => p.slug === slug)

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <Link href="/blog">
          <Button>Back to Blog</Button>
        </Link>
      </div>
    )
  }

  const publishDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : ''

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link href="/blog">
          <Button variant="ghost" className="gap-2 mb-8">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Button>
        </Link>

        {post.cover_image && (
          <div className="aspect-video rounded-2xl overflow-hidden mb-8">
            <img
              src={post.cover_image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3 mb-6">
          {post.tags.map(tag => (
            <Badge key={tag} variant="secondary">
              {tag.replace(/_/g, ' ')}
            </Badge>
          ))}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            {publishDate}
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight" style={{ fontFamily: 'Nunito, sans-serif' }}>
          {post.title}
        </h1>

        <div className="prose prose-lg max-w-none">
          <div className="whitespace-pre-wrap text-foreground leading-relaxed">
            {post.content}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <Link href="/blog">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              More from the Journal
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
