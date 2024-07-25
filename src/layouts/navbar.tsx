"use client";

import { useEffect, MouseEvent } from 'react';
// import { Context } from '@/hooks/context';
import { useRouter } from 'next/navigation';
// import { auth } from "@/firebase/Configuration";
// import { signOut } from 'firebase/auth';
import Image from 'next/image';
// import styles from '../../styles/account/NavBar.module.css';

interface NavBarProps {
    currentTab: string;
    setCurrentTab: (tab: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({ currentTab, setCurrentTab }) => {
    // const context = useContext(Context);

    // if (!context) {
    //     throw new Error('NavBar must be used within a Context.Provider');
    // }
    // const { setUid } = context;
    
    const router = useRouter();
    const mobile = true;

    const handleLink = (e: MouseEvent<HTMLButtonElement>) => {
      const currentLink = e.currentTarget.dataset.link || '';
        setCurrentTab(currentLink);
    }

    // const handleGoBackToLogin = async () => {
    //     await signOut(auth);
    //     setUid('');
    //     router.push('/login');
    // }

    const handlePreviewLink = () => {
        router.push('/preview');
    }

    return (
      <header className="w-full p-0 sm:p-4 md:px-6 md:py-4 lg:py-6">
        <nav className="w-full bg-dl-white rounded-xl flex justify-between items-center gap-6 p-4">
            <Image src={'/icons/logo-devlinks-large.svg'} 
              width='0' height='0'
              alt='devlinks'
              className="w-[182.5px] h-auto object-contain hidden md:inline"
            />
            <Image src={'/icons/logo-devlinks-small.svg'} 
              width='32' height='0'
              alt='devlinks'
              className="w-[32px] h-auto object-contain inline md:hidden"
            />
            <ul className="links flex">
                <li><button className={`px-6 md:px-7 py-3 whitespace-nowrap rounded-lg flex items-center text-dl-dark-gray font-sans text-base font-semibold leading-[150%] cursor-pointer justify-center gap-2 ${currentTab=='links'?'text-dl-purple bg-dl-light-purple':'text-dl-dark-gray'} hover:text-dl-purple`} onClick={handleLink} data-link="links">
                  <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><path fill="currentColor" d="M11.154 14.65a.936.936 0 0 1 0 1.329l-.464.464a4.689 4.689 0 1 1-6.631-6.631l1.884-1.884a4.687 4.687 0 0 1 6.432-.194.941.941 0 0 1-1.25 1.407 2.813 2.813 0 0 0-3.857.114l-1.883 1.882a2.813 2.813 0 1 0 3.978 3.978l.464-.464a.936.936 0 0 1 1.327 0ZM16.94 3.558a4.695 4.695 0 0 0-6.63 0l-.465.464a.94.94 0 1 0 1.328 1.328l.464-.464a2.813 2.813 0 0 1 3.978 3.978l-1.883 1.885a2.813 2.813 0 0 1-3.858.111.942.942 0 0 0-1.25 1.407 4.688 4.688 0 0 0 6.43-.19l1.884-1.884a4.695 4.695 0 0 0 .002-6.633v-.002Z"/></svg>
                  <span className="hidden md:inline">Links</span>
                </button></li>
                <li><button className={`px-6 md:px-7 py-3 whitespace-nowrap rounded-lg flex items-center text-dl-dark-gray font-sans text-base font-semibold leading-[150%] cursor-pointer justify-center gap-2 ${currentTab=='profile'?'text-dl-purple bg-dl-light-purple':'text-dl-dark-gray'} hover:text-dl-purple`} onClick={handleLink} data-link="profile">
                  <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><path fill="currentColor" d="M10.5 1.563A8.437 8.437 0 1 0 18.938 10 8.447 8.447 0 0 0 10.5 1.562ZM6.716 15.357a4.688 4.688 0 0 1 7.568 0 6.54 6.54 0 0 1-7.568 0Zm1.596-5.982a2.188 2.188 0 1 1 4.376 0 2.188 2.188 0 0 1-4.376 0Zm7.344 4.683a6.523 6.523 0 0 0-2.265-1.83 4.062 4.062 0 1 0-5.782 0 6.522 6.522 0 0 0-2.265 1.83 6.562 6.562 0 1 1 10.304 0h.008Z"/></svg>
                  <span className="hidden md:inline">Profile Details</span>
                </button></li>
            </ul>
            <button className="px-4 md:px-7 py-3 rounded-lg bg-transparent border border-dl-purple cursor-pointer text-dl-purple font-sans text-base font-semibold leading-[150%] flex justify-center items-center hover:bg-dl-light-purple" onClick={handlePreviewLink}>
                <Image src={'/icons/icon-preview-header.svg'} alt="preview" width='0' height='0' className="w-[20px] object-contain inline md:hidden" />
                <span className="hidden md:inline">Preview</span>
            </button>
        </nav>
      </header>
    );
}

export default NavBar;
