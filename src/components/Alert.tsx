"use client";

import {useContext, useEffect, useRef} from 'react';
import { Context } from '@/hooks/context';
import Image from 'next/image';

export default function Alert(){
    const context = useContext(Context);

    if (!context) {
        throw new Error('Popup must be used within a Context.Provider');
    }
    const {openSaveChangesMessage, setOpenSaveChangesMessage} = context;

    const dialogRef = useRef<HTMLDialogElement | null>(null);

    useEffect(() => {
        if(openSaveChangesMessage){
          if(dialogRef.current){
            dialogRef.current.style.display = 'block';
            setTimeout(() => {
                if(!dialogRef.current) return;
                dialogRef.current.style.bottom = '40px'
            }, 10)
            setTimeout(() => {
                setOpenSaveChangesMessage(false)
            }, 94000)
          }
        }
        else{
          if(dialogRef.current){
            dialogRef.current.style.bottom = '';
            setTimeout(() => {
                if(!dialogRef.current) return;
                dialogRef.current.style.display = '';
            }, 2000)
          }
        }
    }, [openSaveChangesMessage, setOpenSaveChangesMessage]);

    return(       
        <dialog className="hidden text-center z-[9999] w-80 max-w-[90%] rounded-xl bg-dl-black-gray shadow-[0px_0px_32px_0px_rgba(0,0,0,0.10)] py-3 px-6 text-[#FAFAFA] text-[1rem] font-sans font-semibold leading-[150%] fixed bottom-[-100px] left-0 right-0 m-auto transition-all" ref={dialogRef}>
            <Image src={'/icons/icon-changes-saved.svg'} alt="save" width="20" height="20" className="w-5 h-auto object-contain inline me-3" />Your changes have been successfully saved!
        </dialog>
     )
}