"use client";

import {useState, memo} from 'react';
import Image from 'next/image';
import SignupForm from "@/components/SignupForm";
import Popup from "@/components/Popup";
import Link from 'next/link';

const Register = () => {
  
    return(
        <div className="flex min-h-screen justify-center p-8 bg-dl-white md:bg-dl-white-gray">
            <main className="my-8 flex flex-col items-start gap-12 md:gap-10 md:items-center w-full max-w-[476px]">
                <Image src={'/icons/logo-devlinks-large.svg'} 
                  width='0' height='0'
                  alt='devlinks'
                  className="w-[182.5px] h-auto object-contain"
                />
                <section className="bg-dl-white rounded-xl flex flex-col gap-2 p-0 md:p-10 w-full">
                    <h1 className="login_title text-dl-black-gray text-2xl font-sans font-bold leading-[150%] md:text-3xl">
                        Register
                    </h1>
                    <p className="text-dl-dark-gray text-base font-sans font-normal leading-[150%] mb-8">
                        Let’s get you started sharing your links!
                    </p>
                    <SignupForm />
                    <p className="justify-center items-center gap-0 md:gap-1 text-base font-instrument font-normal leading-[150%] text-dl-dark-gray self-center flex flex-col md:flex-row">
                        Already have an account?
                        <Link href="/login" className="text-center text-base font-sans font-normal leading-[150%] bg-transparent text-dl-purple cursor-pointer hover:underline"> 
                            Login
                        </Link>
                    </p>                    
                </section>                 
              </main>    
            <Popup />      
        </div>
    )
}

export default memo(Register)
