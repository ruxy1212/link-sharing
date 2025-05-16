'use client'

import { useContext, useRef, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Input from './Input'
import { auth } from '@/firebase/Configuration'
import { sendEmailVerification, signInWithEmailAndPassword, User } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { Context } from '@/hooks/context'

interface SignupContext {
  setOpenLoginMessage: (open: boolean) => void
}

export default function LoginForm() {
  const context = useContext(Context)

  if (!context) {
    throw new Error('Popup must be used within a Context.Provider')
  }

  const { setOpenLoginMessage } = context as SignupContext
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const email = useRef<{ state: string }>(null) //useRef<HTMLInputElement>(null);
  const password = useRef<{ state: string }>(null) //useRef<HTMLInputElement>(null);
  const [unverifiedUser, setUnverifiedUser] = useState<User | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [resend, setResend] = useState<boolean>(false);

  const errorMessageRef = useRef<HTMLParagraphElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setResend(false);
    if (errorMessageRef.current) {
      errorMessageRef.current.style.display = ''
    }

    try {
      const userEmail = email.current?.state
      const userPassword = password.current?.state
      if (userEmail && userPassword) {
        const userCredential = await signInWithEmailAndPassword(auth, userEmail, userPassword)
        const user = userCredential.user;
        if (!user.emailVerified) {
          setUnverifiedUser(user)
          if (errorMessageRef.current) {
            setErrorMessage('Please verify your email before logging in.');
            errorMessageRef.current.style.display = 'block'
            setResend(true);
          }
          setLoading(false);
          return;
        }
        setOpenLoginMessage(true)
        setLoading(false)
        router.push('/dashboard')
      }
    } catch (error) {
      if (errorMessageRef.current) {
        setErrorMessage('Email or password is incorrect.')
        errorMessageRef.current.style.display = 'block'
      }
      setLoading(false)
    }
  }

  const resendEmail = async () => {
    if (!unverifiedUser) return
    try {
      setResend(false)
      setLoading(true)
      await sendEmailVerification(unverifiedUser)
      setErrorMessage('Verification email sent. Please check your inbox.')
      if (errorMessageRef.current) {
        errorMessageRef.current.style.display = 'block'
      }
    } catch (err) {
      setErrorMessage('Failed to send verification email. Try again later.')
    }
    setLoading(false)
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
        {errorMessage} {" "}
        {resend && <button onClick={resendEmail} className='underline hover:text-[#333] transition-colors'>Resend</button>}
      </p>
    </form>
  )
}
