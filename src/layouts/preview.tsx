import { useContext } from 'react'
import { Context } from '@/hooks/context'
import { useRouter } from 'next/navigation'
import CopiedToClipboardMessage from '@/components/Copier'
import Link from 'next/link'

export default function NavBar({ isUser }: { isUser: boolean }) {
  const context = useContext(Context)

  if (!context) {
    throw new Error('PhoneMockup must be used within a Context.Provider')
  }

  const { uid, setOpenCopiedToClipboardMessage } = context
  const router = useRouter()

  const handleBackToEditor = () => {
    router.push('/dashboard')
  }

  const handleShare = () => {
    const url = `${window.location.origin}/view/${uid}`
    navigator.clipboard.writeText(url)
    setOpenCopiedToClipboardMessage(true)
  }

  return (
    <header className="w-full p-0 sm:p-4 md:px-6 md:py-4 lg:py-6 h-auto sm:h-[250px] lg:h-[346px] rounded-b-3xl bg-dl-white sm:bg-dl-purple">
      <nav className="w-full bg-dl-white rounded-xl flex flex-row-reverse justify-between items-center gap-6 p-4">
        <button
          className="flex-shrink-0 rounded-lg py-3 px-7 bg-dl-purple text-dl-neutral-white text-base font-sans font-semibold leading-[150%] cursor-pointer hover:bg-dl-mid-purple hover:text-dl-black-gray dark:hover:text-dl-white hover:shadow-[0px_0px_32px_0px_rgba(99,60,255,0.25)] disabled:bg-dl-light-purple"
          onClick={handleShare}
        >
          {isUser?'Share Link':'Copy Card Link'}
        </button>
        {isUser ? (
          <button
            className="px-4 md:px-7 py-3 rounded-lg bg-transparent border border-dl-purple cursor-pointer text-dl-purple font-sans text-base font-semibold leading-[150%] flex justify-center items-center hover:bg-dl-light-purple"
            onClick={handleBackToEditor}
          >
            Back to Editor
          </button>
        ):(
          <Link
            href="/"
            className="px-4 md:px-7 py-3 rounded-lg bg-transparent border border-dl-purple cursor-pointer text-dl-purple font-sans text-base font-semibold leading-[150%] flex justify-center items-center hover:bg-dl-light-purple"
          >
            Create Account
          </Link>
        )}
      </nav>
      <CopiedToClipboardMessage />
    </header>
  )
}
