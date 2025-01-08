'use client'
import Image from 'next/image'
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

  useEffect(() => {
    if (article) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [article])

  return (
    <div className={'max-w-5xl mx-auto w-full'}>
      {loading && <OverlayLoading />}
      {article && (
        <div
          onClick={e => e.target === e.currentTarget && setArticle(null)}
          onKeyUp={e => e.target === e.currentTarget && setArticle(null)}
          className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'
        >
          <div className='bg-white p-6 rounded-lg shadow-lg max-w-lg w-full'>
            <div className='flex items-center mb-4 gap-5'>
              <div className='flex-shrink-0'>
                <Image
                  className={'aspect-auto m-auto'}
                  src={article.thumbnail || 'https://placehold.jp/150x150.png'}
                  width={40}
                  height={40}
                  alt=''
                />
                {article.bookmark && (
                  <Image
                    className={'aspect-auto mt-1'}
                    src={article.bookmark}
                    width={45}
                    height={12}
                    alt=''
                  />
                )}
              </div>
              <h1 className='text-lg font-bold flex-1'>{article.title}</h1>
            </div>
            <p className='text-sm text-gray-500 mb-10'>{article.date}</p>
            <div className='text-base leading-relaxed mb-10'>
              {article.content.split('\r\n').map(content => (
                <p className='mb-4' key={content.slice(0, 10)}>
                  {content}
                </p>
              ))}
            </div>
            <div className='mt-6 text-right'>
              <a
                href={article.link}
                target='_blank'
                rel='noreferrer'
                className='text-blue-800 hover:underline'
              >
                続きを読む(外部リンク)
              </a>
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
