'use client'
import { useContext } from 'react'
import { feedContext } from '../components/feedProvider'
import HatenaList from '../components/hatenaList'
import OverlayLoading from '../components/overlayLoading'

export default function Home() {
  const feed = useContext(feedContext)
  return (
    <div>
      <main className={'grid md:grid-cols-2 grid-flow-row'}>
        {feed
          .filter((item, index) => index < 10)
          .map(item => (
            <HatenaList key={item.id} item={item} />
          ))}
      </main>
      <footer className='row-start-3 flex gap-6 flex-wrap items-center justify-center'>
        footer
      </footer>
    </div>
  )
}
