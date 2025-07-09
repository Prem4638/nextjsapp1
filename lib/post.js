import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDir = path.join(process.cwd(), 'posts')

export function getPostSlugs() {
  return fs.readdirSync(postsDir).map(file => file.replace(/\.md$/, ''))
}

export function getSortedPosts() {
  const slugs = getPostSlugs()
  return slugs.map(slug => {
    const fullPath = path.join(postsDir, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)
    return { slug, ...matterResult.data }
  })
}

export function getPostData(slug) {
  const fullPath = path.join(postsDir, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  const contentHtml = remark().use(html).processSync(content).toString()
  return { slug, contentHtml, ...data }
}
