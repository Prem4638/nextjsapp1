import { getPostSlugs, getPostData } from '../../lib/posts'

export async function getStaticPaths() {
  const paths = getPostSlugs().map(slug => ({ params: { slug } }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const post = getPostData(params.slug)
  return { props: { post } }
}

export default function Post({ post }) {
  return (
    <div style={{ padding: 40, fontFamily: 'sans-serif' }}>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </div>
  )
}
