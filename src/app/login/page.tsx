'use client'

import { memo } from 'react'
import Image from 'next/image'
import LoginForm from '@/components/LoginForm'
import Link from 'next/link'
import Popup2 from '@/components/Popup2'

const Login = () => {
  return (
    <div className="flex min-h-screen justify-center p-8 bg-dl-white md:bg-dl-white-gray">
      <main className="my-8 flex flex-col items-start gap-12 md:gap-10 md:items-center w-full max-w-[476px]">
        <Link href="/">
          <Image
            src={'/icons/logo-devlinks-large.svg'}
            width="0"
            height="0"
            alt="devlinks"
            className="w-[182.5px] h-auto object-contain"
          />
        </Link>
        <section className="bg-dl-white rounded-xl flex flex-col gap-2 p-0 md:p-10 w-full">
          <h1 className="text-dl-black-gray text-2xl font-sans font-bold leading-[150%] md:text-3xl">
            Login
          </h1>
          <p className="text-dl-dark-gray text-base font-sans font-normal leading-[150%] mb-8">
            Add your details below to get back into the app
          </p>
          <LoginForm />
          <p className="text-center text-base font-instrument font-normal leading-[150%] text-dl-dark-gray self-center">
            Don&apos;t have an account? &nbsp;
            <Link
              href="/register"
              className="text-center text-base font-sans font-normal leading-[150%] bg-transparent text-dl-purple cursor-pointer hover:underline"
            >
              Create account
            </Link>
          </p>
        </section>
      </main>
      <Popup2 />
    </div>
  )
}

export default memo(Login)
