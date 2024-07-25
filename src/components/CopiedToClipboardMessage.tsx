import { useContext, useEffect, useRef } from 'react';
import { Context } from '../../pages/_app';
import styles from '../../styles/preview/CopiedToClipboardMessage.module.css';

export default function CopiedToClipboardMessage() {
    const { openCopiedToClipboardMessage, setOpenCopiedToClipboardMessage } = useContext(Context);
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (openCopiedToClipboardMessage) {
            if (dialogRef.current) {
                dialogRef.current.style.display = 'flex';
                dialogRef.current.style.bottom = '56px';
                
                const hideTimer = setTimeout(() => {
                    setOpenCopiedToClipboardMessage(false);
                }, 4000);
                
                return () => clearTimeout(hideTimer);
            }
        } else {
            if (dialogRef.current) {
                dialogRef.current.style.bottom = '';
                const hideTimer = setTimeout(() => {
                    dialogRef.current.style.display = '';
                }, 200); // Match this with the transition duration in CSS
                
                return () => clearTimeout(hideTimer);
            }
        }
    }, [openCopiedToClipboardMessage, setOpenCopiedToClipboardMessage]);

    return (
        <dialog className={styles.container} ref={dialogRef}>
            <img src='/icons/icon-link.svg' className={styles.linkIcon} alt='Link icon'/>
            The link has been copied to your clipboard
        </dialog>
    );
}
