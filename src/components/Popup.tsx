"use client";

import { useContext, useEffect, useRef } from 'react';
import { Context } from "@/hooks/context";
import { useRouter } from 'next/navigation';

export default function Popup() {
    const context = useContext(Context);
    const router = useRouter();

    if (!context) {
        throw new Error('Popup must be used within a Context.Provider');
    }

    const { openLoginMessage, setOpenLoginMessage } = context;

    const dialogRef = useRef<HTMLDialogElement | null>(null);

    useEffect(() => {
        if (openLoginMessage) {
            if (dialogRef.current) {
                dialogRef.current.style.display = 'block';
                setTimeout(() => {
                    if (dialogRef.current) {
                        dialogRef.current.style.bottom = '60px';
                    }
                }, 10);
                router.push('/login');
                setTimeout(() => {
                    setOpenLoginMessage(false);
                }, 3000);
            }
        } else {
            if (dialogRef.current) {
                dialogRef.current.style.top = '';
                setTimeout(() => {
                    if (dialogRef.current) {
                        dialogRef.current.style.display = '';
                    }
                }, 200);
            }
        }
    }, [openLoginMessage, setOpenLoginMessage, router]);

    return (
        <dialog className="hidden text-center w-52 rounded-xl bg-dl-black-gray shadow-[0px_0px_32px_0px_rgba(0,0,0,0.10)] py-3 px-6 text-dl-white-gray text-base font-sans font-semibold leading-[150%] fixed bottom-[-60px] left-0 right-0 m-auto transition-all" ref={dialogRef}>
            Please log in!
        </dialog>
    );
}
