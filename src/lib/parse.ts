import Parser from 'rss-parser'


const rssFeed = [
  'https://qiita.com/tags/next.js/feed',
  'https://qiita.com/tags/react/feed',
  'https://zenn.dev/feed',
]

type items = {
  title: string
  content: string
  link: string
  pubDate: string
  enclosure: string | null
}

export default async () => {
  const parser = new Parser()

  const allFeed = await Promise.all(rssFeed.map(async (url) => {
    const feed = await parser.parseURL(url)
    return feed.items as unknown as items[]
  }))

  return allFeed.flat().sort((a, b) => {
    return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  })

}
