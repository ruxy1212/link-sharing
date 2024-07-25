"use client";

import { useState, useContext, useEffect } from 'react';
import { Context } from '@/hooks/context';
import NavBar from "@/layouts/navbar";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "@/firebase/Configuration";
import Alert from "@/components/Alert";
import { CircularProgress } from '@mui/material';
import TabsContainer from '@/components/tabs/TabsContainer';

const Dashboard: React.FC = () => {
    const context = useContext(Context);

    if (!context) {
        throw new Error('Account must be used within a Context.Provider');
    }

    const { uid, setUid } = context;
    const [currentTab, setCurrentTab] = useState<string>('links');

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

    useEffect(() => {
        console.log(`Current tab is now ${currentTab}`);
    }, [currentTab]);

    return (
        <>
            <main className="w-full flex flex-col gap-0 min-h-screen bg-dl-white-gray">
                {uid ? (
                    <>
                        <NavBar currentTab={currentTab} setCurrentTab={setCurrentTab} />
                        <TabsContainer currentTab={currentTab} />
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

export default Dashboard;
// {currentTab === 'links' ? <LinksTab /> : <ProfileTab />}


// "use client";

// import { useState, useContext, useEffect } from 'react';
// import { Context } from '@/hooks/context';
// import NavBar from "@/layouts/navbar";
// import LinksTab from "@/components/tabs/LinksTab";
// import ProfileTab from "@/components/tabs/ProfileTab";
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from "@/firebase/Configuration";
// import Alert from "@/components/Alert";

// const Dashboard: React.FC = () => {
//     const context = useContext(Context);

//     if (!context) {
//         throw new Error('Account must be used within a Context.Provider');
//     }

//     const { uid, setUid } = context;
//     const [currentTab, setCurrentTab] = useState<string>('links');

//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//             if (currentUser) {
//                 setUid(currentUser.uid);
//             }
//         });

//         return () => unsubscribe();
//     }, [setUid]);

//     return (
//         <>
//             <main className="w-full flex flex-col gap-0">
//                 {uid && 
//                   <>
//                     <NavBar currentTab={currentTab} setCurrentTab={setCurrentTab} />
//                     {currentTab === 'links' ? <LinksTab /> : <ProfileTab />}
//                   </>
//                 }
//                 {/* {currentTab === 'links' ? 
//                     uid && <LinksTab /> : 
//                     uid && <ProfileTab />} */}
//             </main>
//             <Alert />
//         </>
//     );
// }

// export default Dashboard;
