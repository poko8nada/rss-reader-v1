import type { hatenaItems } from '@/app/api/hatena/route'
import { useEffect, useState } from 'react'

export default function useFeed(url: string) {
  const [loading, setLoading] = useState(true)
  const [feedChunk, setFeedChunk] = useState<hatenaItems[][]>([])

  useEffect(() => {
    const fetchFeed = async () => {
      setLoading(true)
      const response = await fetch(url)
      const data = await response.json()

      // feedを10個ずつに分割する 参考URL https://qiita.com/STSHISHO/items/e50b239927605114742d
      // [[1,2,3,4,5,6,7,8,9,10], [11,12,13,14,15,16,17,18,19,20], ...]
      const feedChunk = await data.flatMap(
        (_: Array<hatenaItems>, index: number) =>
          index % 10 ? [] : [data.slice(index, index + 10)],
      )

      setFeedChunk(feedChunk)
      setLoading(false)
    }
    fetchFeed()
  }, [url])

  return { feedChunk, loading }
}
