import { type items, parse } from '@/lib/parse'
import { NextResponse } from 'next/server'

type hatenaItems = items & {
  thumbnail: string | null
  bookmark: string | null
  hostname?: string
}

export async function GET() {
  const feed: items[] = await parse(['https://b.hatena.ne.jp/hotentry.rss'])
  const hatenaFeed: hatenaItems[] = feed.map(item => ({
    ...item,
    thumbnail: null,
    bookmark: null,
  }))

  hatenaFeed.map(item => {
    const thumbnailMatch = item['content:encoded']?.match(/<img src="(.+?)"/)
    item.thumbnail = thumbnailMatch ? thumbnailMatch[1] : '/images/no_img.png'

    const formattedContent = item.content.replace(/。{1,10}/g, '。\r\n')
    item.content = formattedContent

    const bookmarkMatch = item['content:encoded']?.match(
      /<img src="(https:\/\/b\.hatena\.ne\.jp\/entry\/image\/.+?)"/,
    )
    const bookmark = bookmarkMatch ? bookmarkMatch[1] : null
    item.bookmark = bookmark

    const hostname = new URL(item.link).hostname
    item.hostname = hostname
  })
  // console.log(hatenaFeed)
  return NextResponse.json(hatenaFeed)
}

export type { hatenaItems }
