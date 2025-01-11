'use client'
import type { hatenaItems } from '@/app/api/hatena/route'
import useArticle from '@/hooks/useArticle'
import useFeed from '@/hooks/useFeed'
import FeedSection from '../components/feedSection'
import Modal from '../components/modal'
import OverlayLoading from '../components/overlayLoading'

export type feedItems = hatenaItems & {}

export default function Home() {
  const { feedChunk: hatenaFeed, loading: hatenaLoading } =
    useFeed('/api/hatena')

  const { article, setArticle } = useArticle()

  return (
    <div className={'max-w-5xl mx-auto w-full'} style={{ minHeight: '96vh' }}>
      {hatenaLoading && <OverlayLoading />}
      {article && <Modal article={article} setArticle={setArticle} />}
      <main>
        <FeedSection
          initialChunk={hatenaFeed[0]}
          feedChunk={hatenaFeed}
          setArticle={setArticle}
        />
      </main>
    </div>
  )
}
