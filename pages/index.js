import Link from 'next/link'
import { getSortedPosts } from '../lib/posts'

export async function getStaticProps() {
  const posts = getSortedPosts()
  return { props: { posts } }
}

export default function Home({ posts }) {
  return (
    <div style={{ padding: 40, fontFamily: 'sans-serif' }}>
      <h1>📝 NextBlog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
