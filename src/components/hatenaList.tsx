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
    <li className={'flex px-2 py-6 gap-3'}>
      <div className={'flex flex-col gap-2 items-center'}>
        <Image
          src={item.thumbnail || 'https://placehold.jp/150x150.png'}
          width={38}
          height={38}
          alt=''
        />
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
        <h2 style={{ fontSize: '.95em' }}>
          <Link
            href={'#'}
            onClick={e => {
              e.preventDefault()
              console.log(item)
              setArticle(item)
            }}
            className={'hover:underline'}
          >
            {item.title}
          </Link>
        </h2>
        <Link
          className={'hover:underline text-blue-800'}
          href={item.link || ''}
          target='_blank'
        >
          <small className={'leading-none'}>
            {item.hostname}{' '}
            <Image
              className={'inline'}
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
