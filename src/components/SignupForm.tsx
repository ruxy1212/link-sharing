'use client'

import { useRef, useState, useContext, FormEvent } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Input from './Input'
import { auth, db } from '@/firebase/Configuration'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { Context } from '@/hooks/context'
import { doc, setDoc } from 'firebase/firestore'
import { useRouter } from '@bprogress/next/app'
import { FirebaseError } from 'firebase/app'

interface SignupContext {
  setOpenLoginMessage: (open: boolean) => void
}

export default function SignupForm() {
  const context = useContext(Context)
  const router = useRouter()

  if (!context) {
    throw new Error('Popup must be used within a Context.Provider')
  }

  const { setOpenLoginMessage } = context as SignupContext
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState('')
  const [isNormalError, setIsNormalError] = useState<boolean>(false)

  const email = useRef<{ state: string }>(null)
  const password = useRef<{ state: string }>(null)
  const confirmPassword = useRef<{ state: string }>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setIsNormalError(false)

    const userEmail = email.current?.state || ''
    const userPassword = password.current?.state || ''
    const userConfirmPassword = confirmPassword.current?.state || ''

    if (userPassword.length < 8) {
      setIsNormalError(true)
      setError('Password must contain at least 8 characters')
      setLoading(false)
      return
    }

    if (userPassword !== userConfirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, userEmail, userPassword)
      if (auth.currentUser) {
        const usersLinksDoc = doc(db, `${auth.currentUser.uid}/userLinks`)
        const profileDetailsDoc = doc(
          db,
          `${auth.currentUser.uid}/profileDetails`
        )
        await setDoc(usersLinksDoc, { links: [] })
        await setDoc(profileDetailsDoc, {
          firstName: '',
          lastName: '',
          email: userEmail,
          avatar: '',
        })
        await sendEmailVerification(userCredential.user);
        setLoading(false)
        setOpenLoginMessage(true)
        router.push('/login')
      }
    } catch (error: unknown) {
      console.error(error)
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            setError('This email already exists.')
            break
          case 'auth/invalid-email':
            setError('Invalid email address entered.')
            break
          case 'auth/network-request-failed':
            setError('There was a connection problem, check your internet.')
            break
          case 'auth/too-many-requests':
            setError('Too many login attempts, try again later.')
            break
          case 'auth/weak-password':
            setError('Your password is too weak.')
            break
          default:
            setError('Something went wrong, please try again.')
        }
      } else {
        setError('Failed to connect, please check your internet.')
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
        label="Create password"
        type="password"
        icon="/icons/icon-password.svg"
        error="Please check again"
        placeholder="At least 8 characters"
        ref={password}
      />
      <Input
        label="Confirm password"
        type="password"
        icon="/icons/icon-password.svg"
        error="Please check again"
        placeholder="At least 8 characters"
        ref={confirmPassword}
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
            'Create new account'
          )}
        </button>
        {error && (
          <p
            className={`text-sm md:text-base font-sans font-normal leading-[150%] ${isNormalError ? 'text-dl-dark-gray' : 'text-dl-red'}`}
          >
            {error}
          </p>
        )}
      </div>
    </form>
  )
}
