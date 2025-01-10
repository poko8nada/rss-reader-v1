'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import HatenaList from '../components/hatenaList'
import Modal from '../components/modal'
import OverlayLoading from '../components/overlayLoading'
import type { hatenaItems } from './api/hatena/route'

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [feed, setFeed] = useState<hatenaItems[]>([])
  const [article, setArticle] = useState<hatenaItems | null>(null)

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

  useEffect(() => {
    if (article) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [article])

  return (
    <div className={'max-w-5xl mx-auto w-full'} style={{ minHeight: '96vh' }}>
      {loading && <OverlayLoading />}
      {article && <Modal article={article} setArticle={setArticle} />}
      <main className={'grid md:grid-cols-2 grid-flow-row'}>
        {feed.map((item, index) => (
          <HatenaList
            key={`${index}-${item.title}`}
            item={item}
            setArticle={setArticle}
          />
        ))}
      </main>
    </div>
  )
}
