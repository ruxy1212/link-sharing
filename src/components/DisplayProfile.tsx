import { useContext, useMemo, useEffect, useRef } from 'react';
import { Context } from '../../pages/_app';
import NavBar from './NavBar';
import { db, storage } from '../../firebase/Configuration'; 
import { doc } from 'firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import styles from '../../styles/preview/DisplayProfile.module.css';
import linkStyles from '../../styles/account/PhoneLinkBox.module.css';
import useMediaQuery from '../../hooks/useMediaQuery';

interface Link {
    platform: string;
    link: string;
}

interface Profile {
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
}

export default function Preview() {
    const { uid, setOpenCopiedToClipboardMessage } = useContext(Context);
    const mobile = useMediaQuery('(max-width: 600px)');
    const avatarRef = useRef<HTMLImageElement>(null);
    const linksRef = doc(db, `${uid}/userLinks`);
    const profileRef = doc(db, `${uid}/profileDetails`);
    const [allLinks, loadingLinks] = useDocumentData<{ links: Link[] }>(linksRef);
    const [profile, loadingProfile] = useDocumentData<Profile>(profileRef);

    const showLinks = useMemo(() => {
        if (loadingLinks || !allLinks) return null;
        return allLinks.links.map((link, i) => {
            const platformTitle = link.platform.toLowerCase().replace(' ', '').replace('.', '');
            return (
                <a
                    className={[linkStyles.linkBox, linkStyles[platformTitle]].join(' ')}
                    style={{ cursor: 'pointer', height: '56px' }}
                    key={i}
                    href={link.link}
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    <img
                        className={linkStyles.linkIcon}
                        src={`/icons/icon-link-boxes/icon-${platformTitle}-link-box.svg`}
                        alt={`${link.platform} icon`}
                    />
                    {link.platform}
                    <img
                        className={linkStyles.linkArrow}
                        src={platformTitle === 'frontendmentor' ? '/icons/icon-arrow-right-dark.svg' : '/icons/icon-arrow-right.svg'}
                        alt='arrow'
                    />
                </a>
            );
        });
    }, [allLinks, loadingLinks]);

    useEffect(() => {
        const reference = ref(storage, `${uid}/usersAvatar`);
        getDownloadURL(reference)
            .then((url) => {
                if (avatarRef.current) {
                    avatarRef.current.src = url;
                }
            })
            .catch(() => {
                if (avatarRef.current) {
                    avatarRef.current.src = '/images/placeholder-image.png';
                }
            });
    }, [uid]);

    useEffect(() => {
        const body = document.body;
        body.style.backgroundColor = mobile ? 'white' : '';
        return () => {
            body.style.backgroundColor = '';
        };
    }, [mobile]);

    return (
        <main>
            <header className={styles.header}>
                {!loadingProfile && profile && (
                    <NavBar
                        userName={`${profile.firstName} ${profile.lastName}`}
                        uid={uid}
                        setOpenCopiedToClipboardMessage={setOpenCopiedToClipboardMessage}
                    />
                )}
                <section className={styles.profile}>
                    <img
                        className={styles.avatar}
                        ref={avatarRef}
                        alt='profile avatar'
                    />
                    <h1 className={styles.title}>
                        {!loadingProfile && profile && `${profile.firstName} ${profile.lastName}`}
                    </h1>
                    <h2 className={styles.email}>
                        {!loadingProfile && profile && profile.email}
                    </h2>
                    <div className={styles.links}>
                        {showLinks}
                    </div>
                </section>
            </header>
        </main>
    );
}

// If `getStaticProps` is required, you can add its implementation here.
export async function getStaticProps(context: any) {
    // Your implementation here
}
