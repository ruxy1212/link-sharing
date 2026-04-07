'use client'

import { useContext, useRef, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Input from './Input'
import { auth } from '@/firebase/Configuration'
import { sendEmailVerification, signInWithEmailAndPassword, sendPasswordResetEmail, User } from 'firebase/auth'
import { useRouter } from '@bprogress/next/app'
import { Context } from '@/hooks/context'
import { FirebaseError } from 'firebase/app'

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
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/invalid-credential':
            setErrorMessage('Email or password is incorrect.')
            break
          case 'auth/user-disabled':
            setErrorMessage('Your account has been disabled by Admin')
            break
          case 'auth/network-request-failed':
            setErrorMessage('There was a connection problem, check your internet.')
            break
          case 'auth/too-many-requests':
            setErrorMessage('Too many login attempts, try again later.')
            break
          default:
            setErrorMessage('Something went wrong, please try again.')
        }
      } else {
        setErrorMessage('Failed to connect, please check your internet.')
      }
      if (errorMessageRef.current) {
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

  const handleForgotPassword = async () => {
    const userEmail = email.current?.state

    if (!userEmail) {
      setErrorMessage('Please enter your email first.')
      errorMessageRef.current!.style.display = 'block'
      return
    }

    try {
      setLoading(true)
      await sendPasswordResetEmail(auth, userEmail)

      setErrorMessage('If an account with this email exists, a password reset link has been sent.')
      errorMessageRef.current!.style.display = 'block'
    } catch (error: unknown) {
      // Firebase-specific errors
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/user-not-found':
            setErrorMessage('No account found with this email.')
            break
          case 'auth/invalid-email':
            setErrorMessage('Invalid email address.')
            break
          default:
            setErrorMessage('Something went wrong, please try again.')
        }
      } else {
        setErrorMessage('Failed to send reset email.')
      }

      errorMessageRef.current!.style.display = 'block'
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
        includeForgotPassword={true}
        handleForgotPassword={handleForgotPassword}
      />
      <div className="flex flex-col gap-1.5">
        <button
          disabled={loading}
          className="flex-shrink-0 rounded-lg h-12 bg-dl-purple text-dl-neutral-white text-base font-sans font-semibold leading-[150%] cursor-pointer hover:bg-dl-mid-purple hover:text-dl-black-gray hover:shadow-[0px_0px_32px_0px_rgba(99,60,255,0.25)] disabled:bg-dl-mid-purple"
        >
          {loading ? (
            <CircularProgress
              className="text-dl-neutral-white"
              color="secondary"
              size={36}
            />
          ) : (
            'Login'
          )}
        </button>
        <p
          className="hidden text-dl-red text-sm md:text-base md:text-center font-sans font-normal leading-[150%]"
          ref={errorMessageRef}
        >
          {errorMessage} {" "}
          {resend && <button onClick={resendEmail} className='underline hover:text-[#333] transition-colors'>Resend</button>}
        </p>
      </div>
    </form>
  )
}
