'use client'

import { useState, memo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

const Index = () => {
  redirect('/login');
  // return (
  //   <>
  //     <main className="min-h-screen w-full flex justify-center items-center bg-dl-white">
  //       <Link
  //         href="/login"
  //         className="flex-shrink-0 rounded-[8px] py-3 px-7 bg-dl-purple text-dl-white text-base font-sans font-semibold leading-[150%] cursor-pointer hover:bg-dl-mid-purple hover:shadow-[0px_0px_32px_0px_rgba(99,60,255,0.25)]"
  //       >
  //         Login
  //       </Link>
  //     </main>
  //   </>
  // )
}

export default Index
