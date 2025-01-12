import type { feedItems } from '@/app/page'
import type { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'
import FeedBtn from './feedBtn'
import FeedItem from './feedItem'

export default ({
  initialChunk,
  feedChunk,
  setArticle,
}: Readonly<{
  initialChunk: feedItems[]
  feedChunk: feedItems[][]
  setArticle: Dispatch<SetStateAction<feedItems | null>>
}>) => {
  const [chunk, setChunk] = useState([] as feedItems[])
  const [chunkIndex, setChunkIndex] = useState(0)

  const handleNext = (feed: feedItems[][]) => {
    if (!feed[chunkIndex + 1]) return
    setChunkIndex(chunkIndex + 1)
    const nextChunk = [chunk, ...feed[chunkIndex + 1]].flat()
    setChunk(nextChunk)
  }
  const mapFeed = (feed: feedItems[]) => {
    if (!feed) return
    return feed.map((item, index) => (
      <FeedItem
        key={`${index}-${item.title}`}
        item={item}
        setArticle={setArticle}
      />
    ))
  }
  return (
    <section className='px-3 mx-5 my-10 h-96 overflow-y-scroll rounded-xl border-2 border-gray-200 shadow-inner'>
      <ul
        className={'grid md:grid-cols-2 grid-flow-row divide-y-2 md:divide-y-0'}
      >
        {mapFeed(initialChunk)}
        {mapFeed(chunk)}
      </ul>
      <FeedBtn
        feedChunk={feedChunk}
        chunkIndex={chunkIndex}
        handleNext={handleNext}
      />
    </section>
  )
}
