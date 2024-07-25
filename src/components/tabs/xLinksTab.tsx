import PhoneMockup from '@/components/dashboard/PhoneMockup';
import CustomizeLinks from '@/components/dashboard/CustomizeLinks';
import { useContext, useEffect } from 'react';
import { Context } from "@/hooks/context";
import { doc } from 'firebase/firestore';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { db } from "@/firebase/Configuration"
import { useDocumentData } from 'react-firebase-hooks/firestore';
import LoadingLinksScreen from "@/components/LoadingLinksScreen";
import LoadingPhoneMockup from "@/components/LoadingPhoneMockup";

const LinksTab: React.FC = () => {
    const useMediaQuery = true;
    const context = useContext(Context);

    if (!context) {
        throw new Error('LinksTab must be used within a Context.Provider');
    }

    const { uid, dispatch } = context;
    const linkDocRef = doc(db, `${uid}/userLinks`);
    const [userLinks, loadingUserLinks, error] = useDocumentData(linkDocRef);
    const tablet = true;

    useEffect(() => {
        if (loadingUserLinks || !userLinks) return;
        dispatch({ type: 'initialize links', links: userLinks.links });
    }, [loadingUserLinks, userLinks, dispatch]);

    return (
        <DndProvider backend={HTML5Backend}>
            {loadingUserLinks ? !tablet && <LoadingPhoneMockup /> : !tablet && <PhoneMockup />}
            {loadingUserLinks ? <LoadingLinksScreen /> : <CustomizeLinks />}
        </DndProvider>
    );
};

export default LinksTab;
