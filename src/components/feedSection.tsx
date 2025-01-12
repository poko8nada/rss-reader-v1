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
    // <section className='px-3 mx-5 my-10 h-96 overflow-y-scroll rounded-xl border-2 border-gray-200 shadow-inner'>
    <section className='mx-5 my-10'>
      <header className='max-w-80 w-1/2 pl-3 pt-2  rounded-t-md bg-gray-300'>
        test test
      </header>
      <div className='p-2 bg-gray-300 rounded-lg rounded-tl-none'>
        <ul
          className={
            'p-2 grid md:grid-cols-2 grid-flow-row divide-y-2 md:divide-y-0 overflow-x-hidden overflow-y-scroll shadow-inner rounded-md bg-white'
          }
          style={{ maxHeight: '60vh' }}
        >
          {mapFeed(initialChunk)}
          {mapFeed(chunk)}
          <li className='bg-white md:col-span-2'>
            <FeedBtn
              feedChunk={feedChunk}
              chunkIndex={chunkIndex}
              handleNext={handleNext}
            />
          </li>
        </ul>
      </div>
    </section>
  )
}
