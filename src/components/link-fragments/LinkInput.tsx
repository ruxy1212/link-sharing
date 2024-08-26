import {
  useState,
  useRef,
  useEffect,
  useContext,
  ChangeEvent,
  FocusEvent,
  InvalidEvent,
} from 'react'
import { Context } from '@/hooks/context'
import platforms from '@/data'
import Image from 'next/image'

interface LinkInputProps {
  initialState: string
  linkId: string
  platform: string
}

const LinkInput: React.FC<LinkInputProps> = ({
  initialState,
  linkId,
  platform,
}) => {
  const context = useContext(Context)

  if (!context) {
    throw new Error('LinkInput must be used within a Context.Provider')
  }

  const { dispatch } = context
  const [url, setUrl] = useState<string>(initialState)
  const inputRef = useRef<HTMLInputElement>(null)
  const emptyMessageRef = useRef<HTMLParagraphElement>(null)
  const invalidUrlMessageRef = useRef<HTMLParagraphElement>(null)

  const isValidUrl = (url: string, platform: string): boolean => {
    const [, domain, usernameFormat] =
      platforms.find((p) => p[0] === platform) || [];
    if (!domain || !usernameFormat) {
      return false
    }

    try {
      const urlObj = new URL(url)
      console.log('in', urlObj)
      return (
        urlObj.hostname.includes(domain) && urlObj.href.includes(usernameFormat)
      )
    } catch (error) {
      return false
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.setCustomValidity('')
    setUrl(e.target.value)
  }

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const isEmpty = e.target.validity.valueMissing
    const isValidLink = isValidUrl(url, platform)

    if (isEmpty) {
      if (emptyMessageRef.current)
        emptyMessageRef.current.style.display = 'flex'
      if (inputRef.current) {
        inputRef.current.style.border = '1px solid #FF3939'
        inputRef.current.style.color = '#FF3939'
      }
    } else if (!isValidLink) {
      e.target.setCustomValidity(' ')
      if (invalidUrlMessageRef.current)
        invalidUrlMessageRef.current.style.display = 'flex'
      if (inputRef.current) {
        inputRef.current.style.border = '1px solid #FF3939'
        inputRef.current.style.color = '#FF3939'
      }
    }
    dispatch({ type: 'update link', linkId, link: url })
  }

  const handleInvalid = (e: InvalidEvent<HTMLInputElement>) => {
    e.target.setCustomValidity(' ')
    const isEmpty = e.target.validity.valueMissing

    if (isEmpty) {
      if (emptyMessageRef.current)
        emptyMessageRef.current.style.display = 'flex'
      if (inputRef.current) {
        inputRef.current.style.border = '1px solid #FF3939'
        inputRef.current.style.color = '#FF3939'
      }
    }
  }

  useEffect(() => {
    if (emptyMessageRef.current) emptyMessageRef.current.style.display = ''
    if (inputRef.current) {
      inputRef.current.style.border = ''
      inputRef.current.style.color = ''
    }
    if (invalidUrlMessageRef.current)
      invalidUrlMessageRef.current.style.display = ''
  }, [url])

  return (
    <fieldset className="flex flex-col gap-1">
      <label className="text-dl-black-gray font-instrument text-xs font-normal leading-[150%]">
        Link
      </label>
      <div className="relative">
        <Image
          src={'/icons/icon-link.svg'}
          width="0"
          height="0"
          alt=""
          className="icon absolute top-0 bottom-0 my-auto left-4 w-4 object-contain"
        />
        <input
          type="url"
          className="w-full h-12 border border-dl-light-gray rounded-lg px-4 py-3 pl-[44px] text-dl-black-gray font-instrument text-base font-normal leading-[150%] hover:border-dl-purple hover:shadow-[0px_0px_32px_0px_rgba(99,60,255,0.25)] focus:outline-none focus:border-dl-purple focus:shadow-[0px_0px_32px_0px_rgba(99,60,255,0.25)]"
          name={'url'}
          value={url}
          onChange={handleChange}
          onBlur={handleBlur}
          onInvalid={handleInvalid}
          placeholder="e.g. https://www.github.com/johnappleseed"
          pattern="https://.*"
          ref={inputRef}
          required
        />
        <p
          className="h-[40px] hidden justify-center items-center text-dl-red font-instrument text-xs font-normal leading-[150%] absolute right-4 bg-white top-0 bottom-0 my-auto"
          ref={emptyMessageRef}
        >
          Can&apos;t be empty
        </p>
        <p
          className="h-[40px] hidden justify-center items-center text-dl-red font-instrument text-xs font-normal leading-[150%] absolute right-4 bg-white top-0 bottom-0 my-auto"
          ref={invalidUrlMessageRef}
        >
          {`Invalid ${platform} URL`}
        </p>
      </div>
    </fieldset>
  )
}

export default LinkInput
