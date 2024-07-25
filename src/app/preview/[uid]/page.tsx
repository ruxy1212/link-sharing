"use client";

import Image from 'next/image';
import { useState, useMemo, useContext, useEffect, useRef } from 'react';
import { Context } from '@/hooks/context';
import NavBar from "@/layouts/preview";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "@/firebase/Configuration";
import Alert from "@/components/Alert";
import { CircularProgress } from '@mui/material';
import { db, storage } from '@/firebase/Configuration'; 
import { doc, DocumentReference } from 'firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import PhoneLinkBox from '@/components/PhoneLinkBox';
import { useRouter } from 'next/router';

interface Link {
    id: string;
    platform: string;
    link: string;
}

interface Profile {
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
}


const Preview = ({ params }: { params: { uid: string } }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [userId, setUserId] = useState<string | null>(null);
    // const router = useRouter();
    // const { uid } = router.query;
    
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
                console.log(`Setting UID to ${currentUser.uid}`);
                setUid(currentUser.uid);
            } else {
                console.log('No current user');
            }
            if(params.uid === uid) {
              setIsAuth(true);
            }
            else setIsAuth(false);
            setUserId(params.uid);
          });

        return () => {
            console.log('Cleaning up onAuthStateChanged listener');
            unsubscribe();
        };
    }, [setUid, uid, params.uid]);

    const avatarRef = useRef<HTMLImageElement>(null);
    const linksRef = doc(db, `${userId}/userLinks`);
    const profileRef = doc(db, `${userId}/profileDetails`);
    const [allLinks, loadingLinks] = useDocumentData<{ links: Link[] }>(linksRef as DocumentReference<{ links: Link[] }>); 
    const [profile, loadingProfile] = useDocumentData(profileRef);

    useEffect(() => {
      if(userId){
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
        console.log('Setting up onAuthStateChanged listener');
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                console.log(`Setting UID to ${currentUser.uid}`);
                setUid(currentUser.uid);
            } else {
                console.log('No current user');
            }
        });

        return () => {
            console.log('Cleaning up onAuthStateChanged listener');
            unsubscribe();
        };
    }, [setUid]);

    const showLinks = useMemo(() => {
      if (loadingLinks || !allLinks) return null;
      return allLinks.links.map((link, i) => {
          return (
              <a key={i} href={link.link} target='_blank' rel='noopener noreferrer'>
                  <PhoneLinkBox link={link}/>
              </a>
          );
      });
  }, [allLinks, loadingLinks]);

    return (
        <>
            <main className="w-full flex flex-col gap-0 min-h-screen bg-dl-white-gray">
                {userId ? (
                    <>
                        <NavBar isUser={isAuth} />
                        <main className="flex justify-center items-center">
                          <section className="relative -top-36 bg-dl-white shadow-none md:shadow-xl w-full max-w-[349px] rounded-3xl p-0 md:py-12 md:px-14 flex flex-col items-center">
                            <Image
                                className="avatar w-[104px] h-[104px] rounded-full border-[4px] border-dl-purple mb-[25px]"
                                ref={avatarRef}
                                alt='profile avatar'
                                src={""} height={0} width={0}
                            />
                            <h1 className="title text-dl-black-gray font-sans text-2xl font-bold leading-[150%] mb-[8px]">
                                {!loadingProfile && profile && `${profile.firstName} ${profile.lastName}`}
                            </h1>
                            <h2 className="email text-dl-dark-gray font-sans text-base font-normal leading-[150%] mb-[56px]">
                                {!loadingProfile && profile && profile.email}
                            </h2>
                            <div className="links w-[237px] flex flex-col gap-5">
                                {showLinks}
                            </div>
                          </section>
                        </main>
                       
                    </>
                ) : (
                    <div className="w-full h-screen flex justify-center items-center">
                      <span className="h-12">
                        <CircularProgress className="text-dl-light-purple" color="secondary" />
                      </span>
                    </div>
                )}
            </main>
            <Alert />
        </>
    );
}

export default Preview;