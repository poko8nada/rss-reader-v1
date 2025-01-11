import type { hatenaItems } from '@/app/api/hatena/route'
import Image from 'next/image'
import Link from 'next/link'
import type { Dispatch, SetStateAction } from 'react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export default ({
  article,
  setArticle,
}: Readonly<{
  article: hatenaItems
  setArticle: Dispatch<SetStateAction<hatenaItems | null>>
}>) => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!article) return
    setTimeout(() => {
      setIsOpen(true)
    }, 100)
  }, [article])

  useEffect(() => {
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        setArticle(null)
      }
    })
  }, [setArticle])

  const elem = (
    <div
      className={
        'transition-all duration-300 ease-in-out mx-auto fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'
      }
      onClick={e => e.target === e.currentTarget && setArticle(null)}
      onKeyUp={e => e.target === e.currentTarget && setArticle(null)}
    >
      <dialog
        className={`${isOpen ? 'opacity-100' : 'opacity-0 translate-x-10'} transition-all ease-out duration-300 fixed flex items-center justify-center max-w-2xl rounded-lg shadow-lg`}
        style={{ width: '94vw' }}
      >
        <div className='bg-white p-6 rounded-lg shadow-lg w-full'>
          <div className='flex items-center mb-4 gap-2 sm:gap-4'>
            <div className='flex-shrink-0 h-14 flex flex-col items-center justify-center'>
              <Image
                className={'aspect-auto m-auto block'}
                src={article.thumbnail || '/images/no_img.png'}
                width={36}
                height={36}
                alt=''
              />
              {article.bookmark && (
                <img
                  className={'aspect-auto mt-1 block'}
                  src={article.bookmark}
                  width={'50px'}
                  alt=''
                />
              )}
            </div>
            <h1
              className='text-lg font-bold flex-1 sm:whitespace-normal whitespace-nowrap overflow-hidden'
              style={{ textOverflow: 'ellipsis' }}
            >
              {article.title}
            </h1>
          </div>
          <p className='text-sm text-gray-500 mb-10'>{article.date}</p>
          <div className='text-base leading-relaxed mb-10'>
            {article.content.split('\r\n').map(content => (
              <p className='mb-2 sm:mb-4' key={content.slice(0, 10)}>
                {content}
              </p>
            ))}
          </div>
          <div className='mt-6 text-right'>
            <Link
              href={article.link}
              target='_blank'
              rel='noreferrer'
              className='text-blue-800 hover:underline'
            >
              続きを読む(外部リンク)
              <Image
                className={'inline'}
                src='/images/arrow_up_right.svg'
                alt=''
                width={20}
                height={20}
              />
            </Link>
          </div>
        </div>
      </dialog>
    </div>
  )
  return createPortal(elem, document.body)
}
