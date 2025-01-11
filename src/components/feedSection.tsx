import type { feedItems } from '@/app/page'
import type { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'
import FeedBtn from './feedBtn'
import HatenaList from './hatenaList'

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
      <HatenaList
        key={`${index}-${item.title}`}
        item={item}
        setArticle={setArticle}
      />
    ))
  }
  return (
    <section>
      <ul className={'grid md:grid-cols-2 grid-flow-row'}>
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
