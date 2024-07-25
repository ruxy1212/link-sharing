"use client";

import Image from 'next/image';
import Popup from "@/components/Popup";

const AuthLayout = ({children}:{children: React.ReactNode}) => {
    return(
        <div className="flex min-h-screen justify-center p-8 bg-dl-white md:bg-dl-white-gray">
            <main className="my-8 flex flex-col items-start gap-12 md:gap-10 md:items-center w-full max-w-[476px]">
                <Image src={'/icons/logo-devlinks-large.svg'} 
                  width='0' height='0'
                  alt='devlinks'
                  className="w-[182.5px] h-auto object-contain"
                />
                {children}     
              </main>    
            <Popup />      
        </div>
    )
}

export default (AuthLayout)
