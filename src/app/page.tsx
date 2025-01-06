import parse from '@/lib/parse'
import Image from 'next/image'

export default async function Home() {
  const feed = await parse()
  console.log(feed)
  return (
    <div className={'max-w-5xl mx-auto w-full'}>
      <main className={'grid lg:grid-flow-col md:grid-cols-2 grid-flow-row'}>
        <article className={'flex p-2 gap-2 mb-3'}>
          <div className={''}>
            <Image
              src='https://placehold.jp/150x150.png'
              width={150}
              height={150}
              alt=''
            />
          </div>
          <div className={'w-full'}>
            <h1>title</h1>
            <p>description</p>
          </div>
        </article>
        <article className={'flex p-2 gap-2 mb-3'}>
          <div className={''}>
            <Image
              src='https://placehold.jp/150x150.png'
              width={150}
              height={150}
              alt=''
            />
          </div>
          <div className={'w-full'}>
            <h1>title</h1>
            <p>description</p>
          </div>
        </article>
        <article className={'flex p-2 gap-2 mb-3'}>
          <div className={''}>
            <Image
              src='https://placehold.jp/150x150.png'
              width={150}
              height={150}
              alt=''
            />
          </div>
          <div className={'w-full'}>
            <h1>title</h1>
            <p>description</p>
          </div>
        </article>
      </main>
      <footer className='row-start-3 flex gap-6 flex-wrap items-center justify-center'>
        footer
      </footer>
    </div>
  )
}
