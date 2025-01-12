import Parser from 'rss-parser'

type items = {
  title: string
  content: string
  link: string
  pubDate?: string
  date: string
  thumbnail: string
  enclosure?: string
  'content:encoded'?: string
  creator?: string
  author?: string
  heroImage?: string
}
async function parse(urlList: string[]): Promise<items[]> {
  const parser = new Parser({
    customFields: {
      item: [
        'thumbnail',
        'content:encoded',
        'date',
        'creator',
        'author',
        'heroImage',
      ],
    },
  })

  const allFeed = await Promise.all(
    urlList.map(async url => {
      const feed = await parser.parseURL(url)
      return feed.items.map(item => {
        console.log(item)
        return {
          title:
            (item.title && item.title.length > 100
              ? `${item.title.slice(0, 100)}...`
              : item.title) || '',
          content: item.content || '',
          link: item.link || '',
          date: new Date(item.date || item.pubDate).toLocaleString() || '',
          thumbnail: '',
          heroImage: item.enclosure ? item.enclosure.url : '',
          'content:encoded': item['content:encoded'] || '',
          creator: item.creator || item.author || '',
        }
      })
    }),
  )

  return allFeed.flat()
}

export { parse, type items }
