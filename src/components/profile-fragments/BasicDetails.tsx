import Input from './ProfileInput';
import { useContext } from 'react';
import { Context } from "@/hooks/context";
import { db } from "@/firebase/Configuration";
import { doc } from 'firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';

export default function BasicDetails() {
  const context = useContext(Context);

  if (!context) {
      throw new Error('PhoneMockup must be used within a Context.Provider');
  }

  const { uid } = context;
  const profileDocRef = doc(db, `${uid}/profileDetails`);
  const [profileDetails, loadingProfile] = useDocumentData(profileDocRef);


    return(
        <fieldset className="rounded-lg p-5 bg-dl-white-gray flex flex-col justify-center gap-3">
            <Input type='text' label="First name*" name='firstName' placeholder='e.g. John' defaultValue={loadingProfile ? '' : profileDetails?.firstName} required/>
            <Input type='text' label="Last name*" name='lastName' placeholder='e.g. Appleseed' defaultValue={loadingProfile ? '' : profileDetails?.lastName} required/>
            <Input type='email' label="Email" name='email' placeholder='e.g. email@example.com' value={loadingProfile ? '' : profileDetails?.email} readOnly />
        </fieldset>
    )
}