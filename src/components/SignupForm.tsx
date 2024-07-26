'use client'

import { useRef, useState, useContext, FormEvent } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Input from './Input'
import { auth, db } from '@/firebase/Configuration'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { Context } from '@/hooks/context'
import { doc, setDoc } from 'firebase/firestore'

interface SignupContext {
  setOpenLoginMessage: (open: boolean) => void
}

export default function SignupForm() {
  const context = useContext(Context)

  if (!context) {
    throw new Error('Popup must be used within a Context.Provider')
  }

  const { setOpenLoginMessage } = context as SignupContext
  const [loading, setLoading] = useState<boolean>(false)

  const email = useRef<{ state: string }>(null)
  const password = useRef<{ state: string }>(null)
  const confirmPassword = useRef<{ state: string }>(null)
  const notEightCharactersMessage = useRef<HTMLParagraphElement>(null)
  const passwordsDontMatch = useRef<HTMLParagraphElement>(null)
  const emailAlreadyExists = useRef<HTMLParagraphElement>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const userEmail = email.current?.state || ''
    const userPassword = password.current?.state || ''
    const userConfirmPassword = confirmPassword.current?.state || ''

    if (passwordsDontMatch.current)
      passwordsDontMatch.current.style.display = 'none'
    if (notEightCharactersMessage.current)
      notEightCharactersMessage.current.style.color = ''

    if (userPassword !== userConfirmPassword) {
      if (passwordsDontMatch.current)
        passwordsDontMatch.current.style.display = 'block'
      setLoading(false)
      return
    }

    if (userPassword.length < 8) {
      if (notEightCharactersMessage.current)
        notEightCharactersMessage.current.style.color = '#FF3939'
      setLoading(false)
      return
    }

    try {
      await createUserWithEmailAndPassword(auth, userEmail, userPassword)
      console.log(auth.currentUser)
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
        setLoading(false)
        setOpenLoginMessage(true)
      }
    } catch (error) {
      console.error(error)
      if (emailAlreadyExists.current)
        emailAlreadyExists.current.style.display = 'block'
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
      <p
        className="text-dl-dark-gray text-sm font-sans font-normal leading-[150%]"
        ref={notEightCharactersMessage}
      >
        Password must contain at least 8 characters
      </p>
      <p
        className="hidden text-dl-red text-base font-sans font-normal leading-[150%]"
        ref={passwordsDontMatch}
      >
        Passwords do not match
      </p>
      <p
        className="hidden text-dl-red text-base font-sans font-normal leading-[150%]"
        ref={emailAlreadyExists}
      >
        Email already exists
      </p>
      <button
        disabled={loading}
        className="flex-shrink-0 rounded-lg h-12 bg-dl-purple text-dl-white text-base font-sans font-semibold leading-[150%] cursor-pointer hover:bg-dl-mid-purple hover:shadow-[0px_0px_32px_0px_rgba(99,60,255,0.25)] disabled:bg-dl-light-purple"
      >
        {loading ? (
          <CircularProgress
            className="text-dl-light-purple"
            color="secondary"
          />
        ) : (
          'Create new account'
        )}
      </button>
    </form>
  )
}
