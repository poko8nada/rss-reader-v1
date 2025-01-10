'use client'
import type { hatenaItems } from '@/app/api/hatena/route'
import Image from 'next/image'
import Link from 'next/link'
import type { Dispatch, SetStateAction } from 'react'

export default ({
  item,
  setArticle,
}: {
  item: hatenaItems
  setArticle: Dispatch<SetStateAction<hatenaItems | null>>
}) => {
  return (
    <div className={'flex px-7 py-3 gap-4 mb-10'}>
      <div className={'flex flex-col gap-2 items-center'}>
        <Image
          src={item.thumbnail || 'https://placehold.jp/150x150.png'}
          width={50}
          height={50}
          alt=''
        />
        {item.bookmark && (
          <img
            className={'aspect-auto'}
            src={item.bookmark}
            width={'50px'}
            alt=''
          />
        )}
      </div>
      <div className={'w-full'}>
        <h2>
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
    </div>
  )
}
