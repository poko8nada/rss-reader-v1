'use client'
import useArticle from '@/hooks/useArticle'
import useFeed from '@/hooks/useFeed'
import { useState } from 'react'
import HatenaList from '../components/hatenaList'
import Modal from '../components/modal'
import OverlayLoading from '../components/overlayLoading'

import type { hatenaItems } from '@/app/api/hatena/route'

export default function Home() {
  const { feedChunk: hatenaFeed, loading: hatenaLoading } =
    useFeed('/api/hatena')
  const { article, setArticle } = useArticle()

  const [chunk, setChunk] = useState([] as hatenaItems[])
  const [chunkIndex, setChunkIndex] = useState(0)

  const handleNext = (feed: hatenaItems[][]) => {
    if (!feed[chunkIndex + 1]) return
    setChunkIndex(chunkIndex + 1)
    const nextChunk = [chunk, ...feed[chunkIndex + 1]].flat()
    setChunk(nextChunk)
  }

  console.log(chunk)
  return (
    <div className={'max-w-5xl mx-auto w-full'} style={{ minHeight: '96vh' }}>
      {hatenaLoading && <OverlayLoading />}
      {article && <Modal article={article} setArticle={setArticle} />}
      <main className={'grid md:grid-cols-2 grid-flow-row'}>
        {hatenaFeed[0]?.map((item, index) => (
          <HatenaList
            key={`${index}-${item.title}`}
            item={item}
            setArticle={setArticle}
          />
        ))}
        {chunk?.map((item, index) => (
          <HatenaList
            key={`${index}-${item.title}`}
            item={item}
            setArticle={setArticle}
          />
        ))}
        <button
          type='button'
          disabled={!hatenaFeed[chunkIndex + 1]}
          onClick={() => handleNext(hatenaFeed)}
          className={`${!hatenaFeed[chunkIndex + 1] ? 'opacity-50 cursor-not-allowed' : ''} bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-60 mx-auto my-4`}
        >
          {!hatenaFeed[chunkIndex + 1] ? 'No more feed' : 'Next'}
        </button>
      </main>
    </div>
  )
}
