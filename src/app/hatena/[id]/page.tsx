'use client'
import { feedContext } from '@/components/feedProvider'
import Image from 'next/image'
import { useContext } from 'react'
import * as React from 'react'

export default ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = React.use(params)
  const feed = useContext(feedContext)

  const item = feed.find(item => item.id === id)
  console.log(item)
  const formattedDate = new Date(item?.date || '').toLocaleString()

  return (
    <div className='p-6 border border-gray-300 rounded-lg bg-gray-50'>
      <div className='flex gap-2 mb-4 min-h-20'>
        <div className='flex flex-col items-center w-12'>
          <Image
            src={item?.thumbnail || 'https://placehold.jp/150x150.png'}
            width={50}
            height={50}
            alt=''
          />
          {item?.bookmark && (
            <Image
              className={'aspect-auto'}
              src={item?.bookmark}
              width={50}
              height={15}
              alt=''
            />
          )}
        </div>
        <h1 className='text-xl font-bold flex-1'>{item?.title}</h1>
      </div>
      <p className='text-sm text-gray-500 mb-6'>{formattedDate}</p>
      <div className='text-base leading-relaxed'>
        <p>{item?.content}</p>
      </div>
      <div className='mt-6 text-right'>
        <a
          href={item?.link}
          target='_blank'
          rel='noreferrer'
          className='text-blue-800 hover:underline'
        >
          続きを読む(外部リンク)
        </a>
      </div>
    </div>
  )
}
