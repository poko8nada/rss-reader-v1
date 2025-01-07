'use client'
import { useEffect, useState } from 'react'
import HatenaList from '../components/hatenaList'
import OverlayLoading from '../components/overlayLoading'
import type { hatenaItems } from './api/first/route'

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [feed, setFeed] = useState<hatenaItems[]>([])
  const [article, setArticle] = useState<hatenaItems | null>(null)

  useEffect(() => {
    const fetchFeed = async () => {
      setLoading(true)
      const response = await fetch('/api/first')
      const data = await response.json()
      setFeed(data)
      setLoading(false)
    }
    fetchFeed()
  }, [])

  return (
    <div className={'max-w-5xl mx-auto w-full'}>
      {loading && <OverlayLoading />}
      {article && (
        <div
          className={'fixed inset-0 bg-black bg-opacity-50'}
          onClick={() => {
            setArticle(null)
          }}
          onKeyUp={e => {
            if (e.key === 'Escape' || e.key === 'Enter') {
              setArticle(null)
            }
          }}
        >
          <div className={'fixed inset-0 flex items-center justify-center'}>
            <div className={'bg-white p-10'}>
              <h2>{article.title}</h2>
              <p>{article.content}</p>
              <button
                type='button'
                onClick={() => {
                  setArticle(null)
                }}
              >
                close
              </button>
            </div>
          </div>
        </div>
      )}
      <main className={'grid md:grid-cols-2 grid-flow-row'}>
        {feed.map((item, index) => (
          <HatenaList
            key={`${index}-${item.title}`}
            item={item}
            setArticle={setArticle}
          />
        ))}
      </main>
      <footer className='row-start-3 flex gap-6 flex-wrap items-center justify-center'>
        footer
      </footer>
    </div>
  )
}
