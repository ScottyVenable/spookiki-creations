import { useState } from 'react'
import { BlogCard } from '@/components/BlogCard'
import { Badge } from '@/components/ui/badge'
import { useRepositoryData } from '@/hooks/useRepositoryData'
import type { BlogPost } from '@/lib/types'

export default function BlogIndexPage() {
  const [blogPosts] = useRepositoryData<BlogPost>('/spookiki-creations/data/blog-posts.json', 'blog_posts')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const posts = (blogPosts || []).filter(p => p.status === 'published')
  const allTags = Array.from(new Set(posts.flatMap(p => p.tags)))

  const filteredPosts = selectedTag
    ? posts.filter(p => p.tags.includes(selectedTag))
    : posts

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
            The Spookiki Journal
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Behind-the-scenes peeks, process notes, and the stories behind each handmade creation
          </p>
        </div>

        {allTags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <Badge
              variant={selectedTag === null ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setSelectedTag(null)}
            >
              All Posts
            </Badge>
            {allTags.map(tag => (
              <Badge
                key={tag}
                variant={selectedTag === tag ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setSelectedTag(tag)}
              >
                {tag.replace(/_/g, ' ')}
              </Badge>
            ))}
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No posts found with this tag.</p>
          </div>
        )}
      </div>
    </div>
  )
}
