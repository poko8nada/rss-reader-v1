import type { hatenaItems } from '@/app/api/hatena/route'
import Image from 'next/image'
import Link from 'next/link'

export default ({
  item,
}: {
  item: hatenaItems
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
          <Image
            className={'aspect-auto'}
            src={item.bookmark}
            width={50}
            height={15}
            alt=''
          />
        )}
      </div>
      <div className={'w-full'}>
        <h2>
          <Link href={'#'} className={'hover:underline'}>
            {item.title}
          </Link>
        </h2>
        <Link
          className={'hover:underline text-blue-800'}
          href={item.hostLink || ''}
          target='_blank'
        >
          <small className={'leading-none'}>{item.hostname}</small>
        </Link>
      </div>
    </div>
  )
}
