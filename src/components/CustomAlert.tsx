"use client";

import {useContext, useEffect, useRef} from 'react';
import { Context } from '@/hooks/context';

export default function CustomPopup(){
    const context = useContext(Context);

    if (!context) {
        throw new Error('Popup must be used within a Context.Provider');
    }
    const {openCustomPopup, customPopupMessage, setOpenCustomPopup} = context;

    const dialogRef = useRef<HTMLDialogElement | null>(null);

    useEffect(() => {
        if(openCustomPopup){
          if(dialogRef.current){
            dialogRef.current.style.display = 'block';
            setTimeout(() => {
                if(!dialogRef.current) return;
                dialogRef.current.style.bottom = '40px'
            }, 10)
            setTimeout(() => {
              setOpenCustomPopup(false)
            }, 4000)
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
    }, [openCustomPopup, setOpenCustomPopup]);

    return(       
        <dialog className="hidden text-center z-[9999] w-96 max-w-[90%] rounded-xl bg-dl-black-gray shadow-[0px_0px_32px_0px_rgba(0,0,0,0.10)] py-3 px-6 text-dl-white-gray text-base font-sans font-semibold leading-[150%] fixed bottom-[-100px] left-0 right-0 m-auto transition-all" ref={dialogRef}>
            <svg className="w-5 h-4 inline me-3" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><g data-name="info"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14a1 1 0 0 1-2 0v-5a1 1 0 0 1 2 0zm-1-7a1 1 0 1 1 1-1 1 1 0 0 1-1 1z"></path></g></svg>{customPopupMessage}
        </dialog>
     )
}

