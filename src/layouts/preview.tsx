import { useContext } from 'react'
import { Context } from '@/hooks/context'
import { useRouter } from '@bprogress/next/app'
import CopiedToClipboardMessage from '@/components/Copier'
import Link from 'next/link'
import { ArrowBigLeft, Copy, Share, Share2 } from 'lucide-react'

export default function NavBar({ isUser, link, name, platform }: { isUser: boolean, link: string; name: string; platform: string; }) {
  const context = useContext(Context)

  if (!context) {
    throw new Error('PhoneMockup must be used within a Context.Provider')
  }

  const { setOpenCopiedToClipboardMessage } = context
  const router = useRouter()

  const handleBackToEditor = () => {
    router.push('/dashboard')
  }

  const handleShare = async () => {
    const url = `${window.location.origin}/view/${link}`
    if (navigator.share && isUser) {
      try {
        await navigator.share({
          title: `${name} on Devlinks`,
          text: `Checkout my links for ${platform}`,
          url: url,
        });
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          navigator.clipboard.writeText(url)
          setOpenCopiedToClipboardMessage(true)
        }
      }
    } else {
      navigator.clipboard.writeText(url)
      setOpenCopiedToClipboardMessage(true)
    }
  };

  return (
    <header className="w-full p-0 sm:p-4 md:px-6 md:py-4 lg:py-6 h-auto sm:h-[250px] lg:h-[346px] rounded-b-3xl bg-dl-white sm:bg-dl-purple">
      <nav className="w-full bg-dl-white rounded-xl flex flex-row-reverse justify-between items-center gap-6 p-4">
        <button
          className="flex-shrink-0 rounded-lg px-4 py-2.5 md:px-6 md:py-3 bg-dl-purple text-dl-neutral-white text-base font-sans font-semibold leading-[150%] cursor-pointer hover:bg-dl-mid-purple hover:text-dl-black-gray dark:hover:text-dl-white hover:shadow-[0px_0px_32px_0px_rgba(99,60,255,0.25)] disabled:bg-dl-light-purple"
          onClick={handleShare}
        >
          {isUser? (
            <span className="flex gap-1 items-center">Share <Share2 size={18} /></span>
          ) : (
            <span className="flex gap-1 items-center">Copy <Copy size={18} /></span>
          )}
        </button>
        {isUser ? (
          <button
            className="px-4 py-2.5 md:px-6 md:py-3 rounded-lg bg-transparent border border-dl-purple cursor-pointer text-dl-purple font-sans text-base font-semibold leading-[150%] flex justify-center items-center hover:bg-dl-light-purple"
            onClick={handleBackToEditor}
          >
            <span className="flex gap-1 items-center"><ArrowBigLeft size={20} /> Back</span>
          </button>
        ):(
          <Link
            href="/"
            className="px-4 py-2.5 md:px-6 md:py-3 rounded-lg bg-transparent border border-dl-purple cursor-pointer text-dl-purple font-sans text-base font-semibold leading-[150%] flex justify-center items-center hover:bg-dl-light-purple"
          >
            Create Yours
          </Link>
        )}
      </nav>
      <CopiedToClipboardMessage />
    </header>
  )
}
