import { type items, parse } from '@/lib/parse'
import { NextResponse } from 'next/server'

type hatenaItems = items & {
  thumbnail: string
  bookmark: string
  hostname?: string
}

export async function GET() {
  const feed: items[] = await parse(['https://b.hatena.ne.jp/hotentry.rss'])
  const formattedFeed: hatenaItems[] = feed.map(item => ({
    ...item,
    thumbnail: '',
    bookmark: '',
  }))

  formattedFeed.map(item => {
    const thumbnailMatch = item['content:encoded']?.match(/<img src="(.+?)"/)
    item.thumbnail = thumbnailMatch ? thumbnailMatch[1] : '/images/no_img.png'

    const formattedContent = item.content.replace(/。{1,10}/g, '。\r\n')
    item.content = formattedContent

    const bookmarkMatch = item['content:encoded']?.match(
      /<img src="(https:\/\/b\.hatena\.ne\.jp\/entry\/image\/.+?)"/,
    )
    const bookmark = bookmarkMatch ? bookmarkMatch[1] : ''
    item.bookmark = bookmark

    const hostname = new URL(item.link).hostname
    item.hostname = hostname

    item.feedTitle = 'はてなブックマーク'
  })
  // console.log(formattedFeed)
  return NextResponse.json(formattedFeed)
}

export type { hatenaItems }
