import {useContext} from 'react';
import {Context} from '../pages/_app';
import {auth} from '../firebase/Configuration';
import { onAuthStateChanged } from "firebase/auth";
import DisplayProfile from '../components/preview/DisplayProfile.js';
import CopiedToClipboardMessage from '../components/preview/CopiedToClipboardMessage';

export default function Preview() {
    const {uid, setUid} = useContext(Context);

    onAuthStateChanged(auth, (currentUser) => {          
        if(currentUser)
            setUid(currentUser.uid);
    })

    return(
        <>
            {uid ? <DisplayProfile/> : <></>}
            <CopiedToClipboardMessage/>
        </>
    );
}


import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function Preview() {
  const router = useRouter();
  const { id } = router.query;
  const [userPhoto, setUserPhoto] = useState(null);
  const [userName, setUserName] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state for user authentication

  useEffect(() => {
    const fetchUserData = async () => {
      // Fetch user photo from Firebase Storage
      const storage = getStorage();
      const photoRef = ref(storage, `users/${id}/photo.jpg`);
      try {
        const photoUrl = await getDownloadURL(photoRef);

      } catch (error) {
        console.error(error);
      }

      // Fetch user name from Firestore
      const firestore = getFirestore();
      const userDocRef = doc(firestore, 'users', id);
      try {
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setUserName(userData.name);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        if (id) {
          fetchUserData();
        }
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe(); // Cleanup function to unsubscribe from the auth state listener
  }, [id]);

  if (!isLoggedIn) {
    return <div>Please log in to view this page.</div>;
  }

  if (!userPhoto || !userName) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img src={userPhoto} alt="User Photo" />
      <div>{userName}</div>
    </div>
  );
}