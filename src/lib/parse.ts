import Parser from 'rss-parser'

type items = {
  title: string
  content: string
  link: string
  pubDate?: string | null
  date: string
  thumbnail: string | null
  enclosure?: string | null
  'content:encoded'?: string
}
async function parse(urlList: string[]): Promise<items[]> {
  const parser = new Parser({
    customFields: {
      item: ['thumbnail', 'content:encoded', 'date'],
    },
  })

  const allFeed = await Promise.all(
    urlList.map(async url => {
      const feed = await parser.parseURL(url)
      return feed.items.map(item => ({
        title: item.title || '',
        content: item.content || '',
        link: item.link || '',
        date: item.date || item.pubDate || '',
        thumbnail: item.enclosure ? item.enclosure.url : null,
        'content:encoded': item['content:encoded'] || '',
      }))
    }),
  )

  return allFeed.flat()
}

export { parse, type items }
