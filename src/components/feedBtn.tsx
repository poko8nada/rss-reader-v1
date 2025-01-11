import type { feedItems } from '@/app/page'

export default ({
  feedChunk,
  chunkIndex,
  handleNext,
}: {
  feedChunk: feedItems[][]
  chunkIndex: number
  handleNext: (feed: feedItems[][]) => void
}) => {
  return (
    <div className='flex justify-center m-9'>
      <button
        type='button'
        disabled={!feedChunk[chunkIndex + 1]}
        onClick={() => handleNext(feedChunk)}
        className={`${!feedChunk[chunkIndex + 1] ? 'opacity-50 cursor-not-allowed' : ''} bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-60`}
      >
        {!feedChunk[chunkIndex + 1] ? 'No more feed' : 'Next'}
      </button>
    </div>
  )
}
