import { useContext, useMemo, useEffect, useRef } from 'react';
import { Context } from "@/hooks/context";
import { db, storage } from '@/firebase/Configuration'; 
import { doc } from 'firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { getDownloadURL, ref } from 'firebase/storage';

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
            <header className="header w-full h-[357px] pt-[24px] rounded-b-[32px] bg-[#633CFF] sm:pt-[16px] sm:bg-white">
                {!loadingProfile && profile && (
                    <NavBar
                        userName={`${profile.firstName} ${profile.lastName}`}
                        uid={uid}
                        setOpenCopiedToClipboardMessage={setOpenCopiedToClipboardMessage}
                    />
                )}
                <section className="profile absolute top-[208px] left-0 right-0 m-auto bg-white shadow-[0px_0px_32px_0px_rgba(0,0,0,0.10)] w-[349px] min-h-[569px] rounded-[24px] pt-[48px] pb-0 flex flex-col items-center sm:p-0 sm:rounded-none sm:w-full sm:inset-initial sm:top-[138px] sm:left-0 sm:right-0 sm:shadow-none">
                    <img
                        className="avatar w-[104px] h-[104px] rounded-full border-[4px] border-[#633CFF] mb-[25px]"
                        ref={avatarRef}
                        alt='profile avatar'
                    />
                    <h1 className="title text-[#333] font-sans text-2xl font-bold leading-[150%] mb-[8px]">
                        {!loadingProfile && profile && `${profile.firstName} ${profile.lastName}`}
                    </h1>
                    <h2 className="email text-[#737373] font-sans text-base font-normal leading-[150%] mb-[56px]">
                        {!loadingProfile && profile && profile.email}
                    </h2>
                    <div className="links w-[237px] flex flex-col gap-[20px]">
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
