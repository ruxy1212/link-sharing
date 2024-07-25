import { useContext } from 'react';
import { Context } from '../../pages/_app';
import { useRouter } from 'next/router';
import styles from '../../styles/preview/NavBar.module.css';

interface NavBarProps {
    userName: string;
}

export default function NavBar({ userName }: NavBarProps) {
    const { uid, setOpenCopiedToClipboardMessage } = useContext(Context);
    const router = useRouter();

    const handleBackToEditor = () => {
        router.push('/account');
    }

    const handleShare = () => {
        const url = `${window.location.origin}/${userName}?ID=${uid}`;
        navigator.clipboard.writeText(url);
        setOpenCopiedToClipboardMessage(true);
    }

    return (
        <nav className={styles.nav}>
            <button className={styles.editorButton} onClick={handleBackToEditor}>
                Back to Editor
            </button>
            <button className={styles.shareButton} onClick={handleShare}>
                Share Link
            </button>
        </nav>
    );
}
