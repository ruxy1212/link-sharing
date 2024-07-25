import { useMemo, useContext, useRef, useEffect } from 'react';
import { Context } from "@/hooks/context";
import { storage, db } from "@/firebase/Configuration";
import { ref, getDownloadURL } from 'firebase/storage';
import { doc } from 'firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import PhoneLinkBox from './PhoneLinkBox';
// import styles from '../../../styles/account/profile-tab/PhoneMockup.module.css';

interface PhoneMockupProps {
    userLinks: { platform: string }[];
}

const PhoneMockup: React.FC<PhoneMockupProps> = ({ userLinks }) => {
  const context = useContext(Context);

    if (!context) {
        throw new Error('PhoneMockup must be used within a Context.Provider');
    }

    const { uid } = context;
    const profileDocRef = doc(db, `${uid}/profileDetails`);
    const [profileDetails, loadingProfile] = useDocumentData(profileDocRef);
    const avatarRef = useRef<HTMLImageElement>(null);

    const showLinks = useMemo(() => {
        return userLinks.map((link, i) => {
            return <PhoneLinkBox platform={link.platform} key={i} />;
        });
    }, [userLinks]);

    useEffect(() => {
        if (loadingProfile) return;

        const reference = ref(storage, `/${uid}/usersAvatar`);
        getDownloadURL(reference)
            .then((url) => {
                if (avatarRef.current) {
                    avatarRef.current.src = url;
                }
            })
            .catch(() => {
                console.log('no avatar available');
            });
    }, [profileDetails, loadingProfile]);

    return (
        <div className="lg:col-span-5 w-full p-6 bg-dl-white rounded-xl flex justify-center items-center">
            <div className="relative">
                <img
                    src={'/images/illustration-phone-mockup.svg'}
                    className="w-[307px] object-contain"
                    alt="Phone Mockup"
                />
                {loadingProfile ? null : (
                    <img
                        className="border-[4px] border-[#633CFF] w-[96px] h-[96px] rounded-full absolute left-0 right-0 mx-auto top-[63.5px]"
                        ref={avatarRef}
                        style={profileDetails?.avatar ? {} : { visibility: 'hidden' }}
                        alt="User Avatar"
                    />
                )}
                {loadingProfile ? null : profileDetails?.firstName && (
                    <h1 className="text-[#333] font-[var(--font)] text-[1.125rem] font-semibold leading-[150%] w-[80%] text-center bg-white absolute left-0 right-0 mx-auto top-[176px]">
                        {profileDetails.firstName}&nbsp;{profileDetails.lastName}
                    </h1>
                )}
                {loadingProfile ? null : profileDetails?.email && (
                    <h2 className="text-[#737373] font-[var(--font)] text-[0.875rem] font-normal leading-[150%] w-[80%] text-center bg-white absolute left-0 right-0 mx-auto top-[206px]">{profileDetails.email}</h2>
                )}
                <div className="bg-white w-[237px] h-[300px] flex flex-col gap-[20px] absolute bottom-[57px] left-0 right-0 mx-auto">
                    {showLinks}
                </div>
            </div>
        </div>
    );
};

export default PhoneMockup;
