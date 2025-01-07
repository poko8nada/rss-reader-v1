'use client'
import { useContext } from 'react'
import { feedContext } from '../components/feedProvider'
import HatenaList from '../components/hatenaList'
import OverlayLoading from '../components/overlayLoading'

export default function Home() {
  const feed = useContext(feedContext)
  return (
    // {article && (
    //   <div
    //     className={'fixed inset-0 bg-black bg-opacity-50'}
    //     onClick={() => {
    //       setArticle(null)
    //     }}
    //     onKeyUp={e => {
    //       if (e.key === 'Escape' || e.key === 'Enter') {
    //         setArticle(null)
    //       }
    //     }}
    //   >
    //     <div className={'fixed inset-0 flex items-center justify-center'}>
    //       <div className={'bg-white p-10'}>
    //         <h2>{article.title}</h2>
    //         <p>{article.content}</p>
    //         <button
    //           type='button'
    //           onClick={() => {
    //             setArticle(null)
    //           }}
    //         >
    //           close
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // )}
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
