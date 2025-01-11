import type { feedItems } from '@/app/page'
import { useEffect, useState } from 'react'

export default function useArticle() {
  const [article, setArticle] = useState<feedItems | null>(null)

  useEffect(() => {
    if (article) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [article])

  return { article, setArticle }
}
