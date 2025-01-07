'use client'
import type { hatenaItems } from '@/app/api/hatena/route'
import { createContext, useEffect, useState } from 'react'
import OverlayLoading from './overlayLoading'

export const feedContext = createContext<hatenaItems[]>([])

export default function FeedProvider({
  children,
}: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [feed, setFeed] = useState<hatenaItems[]>([])

  useEffect(() => {
    const fetchFeed = async () => {
      setLoading(true)
      const response = await fetch('/api/hatena')
      const data = await response.json()
      setFeed(data)
      setLoading(false)
    }
    fetchFeed()
  }, [])

  return (
    <div className={'max-w-5xl mx-auto w-full'}>
      {loading && <OverlayLoading />}
      <feedContext.Provider value={feed}>{children}</feedContext.Provider>
    </div>
  )
}
