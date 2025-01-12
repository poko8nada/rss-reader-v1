import Image from 'next/image'
export default () => {
  return (
    <header className='mx-auto w-full border-b-2 border-gray-300'>
      <div className='max-w-5xl mx-auto px-5 py-3 flex items-center '>
        <Image
          src='/images/rss.png'
          alt='Vercel Logo'
          width={32}
          height={32}
          priority
        />
        <h1 className='ml-1 text-xl font-bold leading-none text-gray-800'>
          RSSを読んでみよう
        </h1>
      </div>
    </header>
  )
}
