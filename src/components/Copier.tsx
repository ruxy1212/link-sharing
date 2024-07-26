'use client'

import { useContext, useEffect, useRef } from 'react'
import { Context } from '@/hooks/context'
import Image from 'next/image'

export default function CopiedToClipboardMessage() {
  const context = useContext(Context)

  if (!context) {
    throw new Error('Popup must be used within a Context.Provider')
  }
  const { openCopiedToClipboardMessage, setOpenCopiedToClipboardMessage } =
    context

  const dialogRef = useRef<HTMLDialogElement | null>(null)

  useEffect(() => {
    if (openCopiedToClipboardMessage) {
      if (dialogRef.current) {
        dialogRef.current.style.display = 'block'
        setTimeout(() => {
          if (!dialogRef.current) return
          dialogRef.current.style.bottom = '40px'
        }, 10)
        setTimeout(() => {
          setOpenCopiedToClipboardMessage(false)
        }, 4000)
      }
    } else {
      if (dialogRef.current) {
        dialogRef.current.style.bottom = ''
        setTimeout(() => {
          if (!dialogRef.current) return
          dialogRef.current.style.display = ''
        }, 2000)
      }
    }
  }, [openCopiedToClipboardMessage, setOpenCopiedToClipboardMessage])

  return (
    <dialog
      className="hidden text-center z-[9999] w-96 max-w-[90%] rounded-xl bg-dl-black-gray shadow-[0px_0px_32px_0px_rgba(0,0,0,0.10)] py-3 px-6 text-dl-white-gray text-base font-sans font-semibold leading-[150%] fixed bottom-[-100px] left-0 right-0 m-auto transition-all"
      ref={dialogRef}
    >
      <Image
        src={'/icons/icon-link.svg'}
        alt="copy"
        width="20"
        height="20"
        className="w-5 h-auto object-contain inline me-3"
      />
      The link has been copied to your clipboard
    </dialog>
  )
}
