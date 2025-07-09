import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPosts() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)
    return {
      slug,
      ...matterResult.data
    }
  })
}

export function getPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map((fileName) => fileName.replace(/\.md$/, ''))
}

export function getPostData(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  const processedContent = remark().use(html).processSync(content)
  const contentHtml = processedContent.toString()
  return {
    slug,
    contentHtml,
    ...data
  }
}
