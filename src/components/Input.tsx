'use client'

import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
  ChangeEvent,
  FocusEvent,
  InvalidEvent,
} from 'react'
import {
  EyeOff,
  EyeIcon
} from "lucide-react"
import Image from 'next/image'

interface InputProps {
  label: string
  type: string
  icon: string
  error: string
  placeholder: string
  includeForgotPassword?: boolean
  handleForgotPassword?: () => void
}

interface InputRef {
  state: string
}

const Input = forwardRef<InputRef, InputProps>(
  ({ label, type, icon, error, placeholder, includeForgotPassword = false, handleForgotPassword }, ref) => {
    const [text, setText] = useState('')
    const [inputType, setInputType] = useState(type)
    const errorMessageRef = useRef<HTMLSpanElement>(null)
    const emptyMessageRef = useRef<HTMLSpanElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const labelRef = useRef<HTMLLabelElement>(null)
    const [validationState, setValidationState] = useState<'empty' | 'error' | null>(null)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      e.target.setCustomValidity('')
      setText(e.target.value)
      setValidationState(null) // reset on typing
    }

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
      if (e.target.validity.valueMissing) {
        setValidationState('empty')
      } else if (e.target.validity.typeMismatch) {
        setValidationState('error')
      }
    }

    const handleInvalid = (e: InvalidEvent<HTMLInputElement>) => {
      e.target.setCustomValidity(' ')
      setValidationState(e.target.validity.valueMissing ? 'empty' : 'error')
    }

    useImperativeHandle(ref, () => ({
      get state() {
        return text
      },
    }))

    useEffect(() => {
      if (
        inputRef.current &&
        emptyMessageRef.current &&
        errorMessageRef.current &&
        labelRef.current
      ) {
        inputRef.current.style.border = ''
        inputRef.current.style.boxShadow = ''
        inputRef.current.style.paddingRight = ''
        emptyMessageRef.current.style.display = ''
        errorMessageRef.current.style.display = ''
        labelRef.current.style.color = ''
      }
    }, [text])

    const toggleEye = () => {
      setInputType(inputType === 'password' ? 'text' : 'password')
    }

    return (
      <fieldset className="flex flex-col gap-1 w-full">
        <div className="flex justify-between items-center">
          <label
            className={`text-sm font-instrument font-normal leading-[150%] sm:text-xs ${validationState ? 'text-dl-red' : 'text-dl-black-gray'}`}
            ref={labelRef}
          >
            {label}
          </label>
          {includeForgotPassword && (<button
            onClick={handleForgotPassword}
            className="text-center text-sm font-sans font-normal leading-[150%] bg-transparent text-dl-purple cursor-pointer hover:underline"
          >
            Forgot Password?
          </button>)}
        </div>
        <div className="relative">
          <input
            type={inputType}
            value={text}
            onChange={handleChange}
            onBlur={handleBlur}
            onInvalid={handleInvalid}
            placeholder={placeholder}
            ref={inputRef}            
            className={`w-full h-12 rounded-lg border bg-dl-white text-dl-black-gray px-12 text-base font-instrument font-normal leading-[150%] focus:outline-none
              ${validationState
                ? 'border-dl-red shadow-none pr-[48px] focus:border-dl-red focus:shadow-none'
                : 'border-dl-light-gray focus:border-dl-purple focus:shadow-[0px_0px_32px_0px_rgba(99,60,255,0.25)]'
              }`
            }
            required
          />

          {/* Toggle - only show when password type and no validation error */}
          {type === 'password' && !validationState && (
            <button className="absolute top-0 bottom-0 m-auto right-4 w-4" onClick={toggleEye}>
              {inputType === 'text' ? <EyeOff className="w-4"/> : <EyeIcon className="w-4"/>}
            </button>
          )}

          {/* Error messages */}
          {validationState === 'empty' && (
            <span className="h-[18px] text-dl-red text-right text-sm font-sans font-normal leading-[150%] absolute top-0 bottom-0 m-auto right-4">
              Can&apos;t be empty
            </span>
          )}
          {validationState === 'error' && (
            <span className="h-[18px] text-dl-red text-right text-sm font-sans font-normal leading-[150%] absolute top-0 bottom-0 m-auto right-4">
              {error}
            </span>
          )}
          <Image
            src={icon}
            width="0"
            height="0"
            alt=""
            className="icon absolute top-0 bottom-0 m-auto left-4 w-4 object-contain"
          />
        </div>
      </fieldset>
    )
  }
)

Input.displayName = 'Input'

export default Input
