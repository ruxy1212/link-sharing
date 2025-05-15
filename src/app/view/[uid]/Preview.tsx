'use client';

import Image from 'next/image';
import { useState, useMemo, useContext, useEffect, useRef } from 'react';
import { Context } from '@/hooks/context';
import NavBar from '@/layouts/preview';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase/Configuration';
import Alert from '@/components/Alert';
import { CircularProgress } from '@mui/material';
import { db, storage } from '@/firebase/Configuration';
import { doc, DocumentReference } from 'firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import PhoneLinkBox from '@/components/PhoneLinkBox';
import { useRouter } from 'next/navigation';

interface Link {
  id: string;
  platform: string;
  link: string;
}

const Preview = ({ params }: { params: { uid: string } }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
  const router = useRouter();

  const context = useContext(Context);

  if (!context) {
    throw new Error('Preview must be used within a Context.Provider');
  }

  if (!params.uid) {
    throw new Error('Preview must be used with a uid');
  }

  const { uid, setUid } = context;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && currentUser.uid === uid) {
        setUid(currentUser.uid);
      }
      if (params.uid === uid) {
        setIsAuth(true);
      } else setIsAuth(false);
      setUserId(params.uid);
    });

    return () => {
      unsubscribe();
    };
  }, [setUid, uid, params.uid]);

  const avatarRef = useRef<HTMLImageElement>(null);
  const linksRef = doc(db, `${userId}/userLinks`);
  const profileRef = doc(db, `${userId}/profileDetails`);
  const [allLinks, loadingLinks] = useDocumentData<{ links: Link[] }>(
    linksRef as DocumentReference<{ links: Link[] }>
  );
  const [profile, loadingProfile] = useDocumentData(profileRef);

  useEffect(() => {
    if (userId) {
      const reference = ref(storage, `${userId}/usersAvatar`);
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
    }
  }, [userId]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUid(currentUser.uid);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [setUid]);

  const showLinks = useMemo(() => {
    if (loadingLinks || !allLinks) return null;
    return allLinks.links.map((link, i) => {
      return (
        <a
          key={i}
          href={link.link}
          target="_blank"
          className="cursor-pointer"
          rel="noopener noreferrer"
        >
          <PhoneLinkBox link={link} notForGrabs={true} />
        </a>
      );
    });
  }, [allLinks, loadingLinks]);

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    try {
      await auth.signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out', error);
    }
  };

  return (
    <>
      <main className="w-full flex flex-col gap-0 min-h-screen bg-dl-white-gray">
        {userId ? (
          <>
            <NavBar isUser={isAuth} />
            <main className="flex justify-center items-center">
              <section className="relative top-7 sm:-top-24 lg:-top-36 bg-dl-white shadow-none md:shadow-xl w-full max-w-[349px] rounded-3xl p-0 sm:pt-6 pb-12 md:py-12 md:px-14 flex flex-col items-center">
                <span className={`h-12 ${isLoaded ? 'hidden' : ''}`}>
                  <CircularProgress
                    className="text-dl-light-purple"
                    color="secondary"
                  />
                </span>
                <Image
                  className={`avatar w-[104px] h-[104px] rounded-full border-[4px] border-dl-purple mb-[25px] ${
                    isLoaded ? '' : 'hidden'
                  }`}
                  ref={avatarRef}
                  alt="profile avatar"
                  src={''}
                  height={0}
                  width={0}
                  onLoad={() => setIsLoaded(true)}
                  onError={() => setIsLoaded(false)}
                />
                <h1 className="title text-dl-black-gray font-sans text-2xl font-bold leading-[150%] mb-[8px]">
                  {!loadingProfile &&
                    profile &&
                    `${profile.firstName} ${profile.lastName}`}
                </h1>
                <a
                  href={'mailto:' + profile?.email}
                  className="font-normal hover:font-bold mb-[56px]"
                >
                  <h2 className="email text-dl-dark-gray font-sans text-base leading-[150%]">
                    {!loadingProfile && profile && profile.email}
                  </h2>
                </a>
                <div className="links w-[237px] flex flex-col gap-5">
                  {showLinks}
                </div>
                {isAuth && (
                  <button
                    className="flex-shrink-0 mt-14 rounded-lg w-32 py-3 px-7 bg-dl-purple text-dl-white text-base font-sans font-semibold leading-[150%] cursor-pointer hover:bg-dl-mid-purple hover:shadow-[0px_0px_32px_0px_rgba(99,60,255,0.25)] disabled:bg-dl-light-purple"
                    onClick={handleSignOut}
                  >
                    {isLoggingOut ? (
                      <span className="flex items-center justify-center gap-2">
                        Logout
                        <span className="h-4">
                          <CircularProgress
                            className="text-dl-light-purple"
                            color="secondary"
                            size="16px"
                          />
                        </span>
                      </span>
                    ) : (
                      'Logout'
                    )}
                  </button>
                )}
              </section>
            </main>
          </>
        ) : (
          <div className="w-full h-screen flex justify-center items-center">
            <span className="h-12">
              <CircularProgress
                className="text-dl-light-purple"
                color="secondary"
              />
            </span>
          </div>
        )}
      </main>
      <Alert />
    </>
  );
};

export default Preview;