"use client";

import { useContext, useEffect } from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import PhoneMockup from '@/components/dashboard/PhoneMockup';
import LoadingPhoneMockup from "@/components/LoadingPhoneMockup";
import { Context } from "@/hooks/context";
import { doc } from 'firebase/firestore';
import { db } from "@/firebase/Configuration"
import { useDocumentData } from 'react-firebase-hooks/firestore';
import ProfileDetails from '../right/ProfileDetails';
import LoadingLinksScreen from '../LoadingLinksScreen';
import CustomizeLinks from '../dashboard/CustomizeLinks';

export default function TabsContainer({currentTab}: {currentTab: string}) {
  const context = useContext(Context);

  if (!context) {
      throw new Error('LinksTab must be used within a Context.Provider');
  }

  const { uid, dispatch } = context;

  const linkDocRef = doc(db, `${uid}/userLinks`);
    const [userLinks, loadingUserLinks, error] = useDocumentData(linkDocRef);

    if (error) {
      console.error("Error loading user links:", error);
    }

    useEffect(() => {
      if (loadingUserLinks || !userLinks) return;
      dispatch({ type: 'initialize links', links: userLinks.links });
  }, [loadingUserLinks, userLinks, dispatch]);


  return (
    <div className="px-4 py-4 md:px-6 md:pb-6 md:pt-0 grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="hidden lg:block lg:col-span-5 top-28 sticky self-start">
        <DndProvider backend={HTML5Backend}>
          {loadingUserLinks ? <LoadingPhoneMockup /> : <PhoneMockup />}
        </DndProvider>
      </div>
      <div className="lg:col-span-7">
        {currentTab === 'links' ? (
            loadingUserLinks ? <LoadingLinksScreen /> : <CustomizeLinks /> ) :
          <ProfileDetails />
        }
      </div>
    </div>
  );
}
