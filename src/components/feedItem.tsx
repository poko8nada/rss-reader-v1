'use client'
import type { feedItems } from '@/app/page'
import Image from 'next/image'
import Link from 'next/link'
import type { Dispatch, SetStateAction } from 'react'

export default ({
  item,
  setArticle,
}: {
  item: feedItems
  setArticle: Dispatch<SetStateAction<feedItems | null>>
}) => {
  return (
    <li
      className={`flex px-2 md:px-5 py-4 md:py-6 gap-3 bg-white ${item.isRead ? 'opacity-50' : ''}`}
    >
      <div className={'flex flex-col gap-2 items-center shrink-0'}>
        <Image src={item.thumbnail} width={38} height={38} alt='' />
        {item.bookmark && (
          <img
            className={'aspect-auto'}
            src={item.bookmark}
            width={'42px'}
            alt=''
          />
        )}
      </div>
      <div className={'w-full'}>
        <h3 style={{ fontSize: '.95em' }}>
          <Link
            href={'#'}
            onClick={e => {
              e.preventDefault()
              console.log(item)
              setArticle(item)
              item.isRead = true
            }}
            className={'hover:underline'}
          >
            {item.title}
          </Link>
        </h3>
        <Link
          className={'hover:underline text-blue-800'}
          href={item.link || ''}
          target='_blank'
          onClick={() => {
            item.isRead = true
          }}
        >
          <small className={'relative'}>
            {item.hostname}
            {item.creator ? `@${item.creator}` : ''}
            <Image
              className={'inline absolute top-1/2 -translate-y-1/2'}
              src='/images/arrow_up_right.svg'
              alt=''
              width={14}
              height={14}
            />
          </small>
        </Link>
      </div>
    </li>
  )
}
