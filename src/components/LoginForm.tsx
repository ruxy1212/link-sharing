'use client'

import { useRef, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Input from './Input'
import { auth } from '@/firebase/Configuration'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const email = useRef<{ state: string }>(null) //useRef<HTMLInputElement>(null);
  const password = useRef<{ state: string }>(null) //useRef<HTMLInputElement>(null);

  const errorMessageRef = useRef<HTMLParagraphElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    if (errorMessageRef.current) {
      errorMessageRef.current.style.display = ''
    }

    try {
      const userEmail = email.current?.state
      const userPassword = password.current?.state
      if (userEmail && userPassword) {
        await signInWithEmailAndPassword(auth, userEmail, userPassword)
        setLoading(false)
        router.push('/dashboard')
      }
    } catch (error) {
      if (errorMessageRef.current) {
        errorMessageRef.current.style.display = 'block'
      }
      setLoading(false)
    }
  }

  return (
    <form className="flex flex-col gap-6 mb-6" onSubmit={handleSubmit}>
      <Input
        label="Email address"
        type="email"
        icon="/icons/icon-email.svg"
        error="Not valid email"
        placeholder="e.g. alex@email.com"
        ref={email}
      />
      <Input
        label="Password"
        type="password"
        icon="/icons/icon-password.svg"
        error="Please check again"
        placeholder="Enter your password"
        ref={password}
      />
      <button className="flex-shrink-0 rounded-[8px] h-[46px] bg-dl-purple text-dl-white text-base font-sans font-semibold leading-[150%] cursor-pointer hover:bg-dl-mid-purple hover:shadow-[0px_0px_32px_0px_rgba(99,60,255,0.25)]">
        {loading ? (
          <CircularProgress
            className="text-dl-light-purple"
            color="secondary"
          />
        ) : (
          'Login'
        )}
      </button>
      <p
        className="hidden text-dl-red text-base md:text-center font-sans font-normal leading-[150%]"
        ref={errorMessageRef}
      >
        Email or password is incorrect
      </p>
    </form>
  )
}
