import { useContext } from 'react';
import PhoneMockup from '@/components/right/PhoneMockup';
import ProfileDetails from '@/components/right/ProfileDetails';
import LoadingPhoneMockup from '@/components/LoadingPhoneMockup';
import { Context } from "@/hooks/context";
// import { doc } from 'firebase/firestore';
import { doc, FirestoreDataConverter, DocumentData } from 'firebase/firestore';
import { db } from '@/firebase/Configuration';
import { useDocumentData } from 'react-firebase-hooks/firestore';

export interface UserLink {
  id: string;
  platform: string;
  url: string;
}

export interface UserLinks {
  links: UserLink[];
}

export default function ProfileTab() {
   
  const context = useContext(Context);

    if (!context) {
        throw new Error('PhoneLinkBox must be used within a Context.Provider');
    }

    const { uid } = context;
    const tablet = true;

    // const linkDocRef = doc(db, `${uid}/userLinks`);
    const userLinksConverter: FirestoreDataConverter<UserLinks> = {
      fromFirestore(snapshot, options): UserLinks {
        const data = snapshot.data(options)!;
        return { links: data.links };
      },
      toFirestore(modelObject: UserLinks): DocumentData {
        return { links: modelObject.links };
      }
    };
    const linkDocRef = doc(db, `${uid}/userLinks`).withConverter(userLinksConverter);
    const [userLinks, loadingLinks, error] = useDocumentData<UserLinks>(linkDocRef);

    if (error) {
        console.error("Error loading user links:", error);
    }

    return (
        <>
            {loadingLinks ? !tablet && <LoadingPhoneMockup /> : !tablet && <PhoneMockup userLinks={userLinks?.links || []} />}    
            <ProfileDetails />
        </>
    );
}
