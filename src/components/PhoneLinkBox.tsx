import { useContext, useEffect, useRef, FC } from 'react'
import { Context } from '@/hooks/context'
import Image from 'next/image'

interface Link {
  id: string
  platform: string
  link: string
}

interface PhoneLinkBoxProps {
  link: Link
  notForGrabs?: boolean
}

const PhoneLinkBox: FC<PhoneLinkBoxProps> = ({ link, notForGrabs }) => {
  const context = useContext(Context)

  if (!context) {
    throw new Error('PhoneLinkBox must be used within a Context.Provider')
  }

  const linkRef = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLImageElement>(null)
  const platform = link.platform.toLowerCase().replace(' ', '').replace('.', '')
  const platformTitle = link.platform

  useEffect(() => {
    if (arrowRef.current) {
      arrowRef.current.src =
        platformTitle === 'Frontend Mentor'
          ? '/icons/icon-arrow-right-dark.svg'
          : '/icons/icon-arrow-right.svg'
    }
  }, [link, platformTitle])

  return (
    <div
      className={`${notForGrabs ? 'cursor-pointer hover:opacity-80' : 'cursor-grap' } w-full h-[44px] rounded-lg flex  items-center px-4 gap-2 font-sans text-xs font-normal leading-[150%] relative no-underline ${'bg-dl-' + platform} ${platformTitle === 'Frontend Mentor' ? 'text-dl-black-gray border border-dl-dark-gray' : 'text-dl-white border-dl-' + platform}`}
      ref={linkRef}
    >
      <Image
        className="w-4 object-contain"
        height={0}
        width={0}
        src={`/icons/icon-link-boxes/icon-${platform}-link-box.svg`}
        alt={`${platformTitle} icon`}
      />
      {platformTitle}
      <Image
        src={''}
        className="absolute top-0 bottom-0 right-4 m-auto w-4 object-contain"
        ref={arrowRef}
        alt="arrow icon"
        height={0}
        width={0}
      />
    </div>
  )
}

export default PhoneLinkBox
