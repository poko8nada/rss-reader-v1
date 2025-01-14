import { type items, parse } from '@/lib/parse'
import { NextResponse } from 'next/server'

type hatenaItems = items & {
  thumbnail: string
  bookmark: string
  hostname?: string
}

export async function GET() {
  const feed: items[] = await parse([
    'https://azukiazusa.dev/rss.xml',
    'https://www.publickey1.jp/atom.xml',
    'https://b.hatena.ne.jp/hotentry/it.rss',
    'https://dev.classmethod.jp/feed/',
  ])
  const formattedFeed: hatenaItems[] = feed
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map(item => ({
      ...item,
      thumbnail: '',
      bookmark: '',
    }))

  formattedFeed.map(item => {
    const thumbnailMatch = () => {
      if (/classmethod/g.test(item.link)) {
        return '/images/devio.jpeg'
      }
      if (/azukiazusa/g.test(item.link)) {
        return '/images/azukiazusa.png'
      }
      if (item['content:encoded']?.match(/<img src="(.+?)"/)) {
        return (
          item['content:encoded']?.match(/<img src="(.+?)"/)?.[1] ||
          '/images/no_img.png'
        )
      }
      return '/images/no_img.png'
    }
    item.thumbnail = thumbnailMatch()

    const formattedContent = item.content.replace(/。{1,10}/g, '。\r\n')
    item.content = formattedContent

    const bookmarkMatch = item['content:encoded']?.match(
      /<img src="(https:\/\/b\.hatena\.ne\.jp\/entry\/image\/.+?)"/,
    )
    const bookmark = bookmarkMatch ? bookmarkMatch[1] : ''
    item.bookmark = bookmark

    const hostname = new URL(item.link).hostname
    item.hostname = hostname

    item.feedTitle = 'tech'
  })
  // console.log(formattedFeed)
  return NextResponse.json(formattedFeed)
}

export type { hatenaItems }
