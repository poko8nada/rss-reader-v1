import { type items, parse } from '@/lib/parse'
import { NextResponse } from 'next/server'

type zennAndQiitaItems = items & {
  // thumbnail: string | null
  hostname?: string
}

export async function GET() {
  const feed: items[] = await parse([
    'https://zenn.dev/feed',
    'https://qiita.com/popular-items/feed.atom',
  ])
  const formattedFeed: zennAndQiitaItems[] = feed
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map(item => ({
      ...item,
      hostname: '',
    }))

  formattedFeed.map(item => {
    const formattedContent = item.content.replace(/。{1,10}/g, '。\r\n')
    item.content = formattedContent

    const thumbnailMatch = () => {
      if (/zenn/g.test(item.link)) {
        return '/images/zenn-icon.svg'
      }
      if (/qiita/g.test(item.link)) {
        return '/images/qiita-icon.png'
      }
      return '/images/no_img.png'
    }
    item.thumbnail = thumbnailMatch()

    const hostname = new URL(item.link).hostname
    item.hostname = hostname

    item.feedTitle = 'Zenn & Qiita'
  })
  // console.log(formattedFeed)
  return NextResponse.json(formattedFeed)
}

export type { zennAndQiitaItems }
