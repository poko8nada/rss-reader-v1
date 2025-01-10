import type { hatenaItems } from '@/app/api/hatena/route'
import { useEffect, useState } from 'react'

export default function useArticle() {
  const [article, setArticle] = useState<hatenaItems | null>(null)

  useEffect(() => {
    if (article) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [article])

  return { article, setArticle }
}
