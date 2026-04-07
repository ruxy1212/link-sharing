import { useContext, useState, FormEvent } from 'react'
import { Context } from '@/hooks/context'
import { db } from '@/firebase/Configuration'
import { doc, runTransaction } from 'firebase/firestore'
import UploadImage from './profile-fragments/UploadImage'
import BasicDetails from './profile-fragments/BasicDetails'
import { CircularProgress } from '@mui/material'
import { uploadAvatar } from '@/hooks/avatar-utils'
import { UserProfile } from '@/hooks/types'

interface FormElements extends HTMLFormControlsCollection {
  username: HTMLInputElement
  profileAvatar: HTMLInputElement
  firstName: HTMLInputElement
  lastName: HTMLInputElement
  email: HTMLInputElement
}

interface FormElement extends HTMLFormElement {
  readonly elements: FormElements
}

export default function ProfileDetails({ profileDetails }: { profileDetails: UserProfile }) {
  const context = useContext(Context)

  if (!context) {
    throw new Error('PhoneMockup must be used within a Context.Provider')
  }
//Your changes have been successfully saved!
  const { uid, setOpenSaveChangesMessage, setCustomPopupMessage, setOpenCustomPopup } = context
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (e: FormEvent<FormElement>) => {
    e.preventDefault()
    try {
      setLoading(true)
      const form = e.currentTarget
      const updates: UserProfile = {
        username: form.elements.username.value.toLowerCase().trim(),
        firstName: form.elements.firstName.value,
        lastName: form.elements.lastName.value,
        email: form.elements.email.value,
      }

      const newAvatarFile = form.elements.profileAvatar.files?.[0]
      if (newAvatarFile) {
        const avatarUrl = await uploadAvatar(newAvatarFile, uid);
        updates.avatar = avatarUrl;
      }

      const newUsername = updates.username?.toLowerCase().trim()
      const oldUsername = profileDetails?.username?.toLowerCase().trim()
      const docRef = doc(db, `${uid}/profileDetails`)
      const usernameRef = doc(db, `usernames/${newUsername}`)

      await runTransaction(db, async (transaction) => {
        const usernameDoc = await transaction.get(usernameRef)
        if (usernameDoc.exists()) {
          if (usernameDoc.data().uid !== uid) //throw the error
            throw new Error('USERNAME_TAKEN')
        }

        transaction.set(usernameRef, { uid: uid })
        if (oldUsername && oldUsername !== newUsername) {
          const oldUsernameRef = doc(db, `usernames/${oldUsername}`);
          transaction.delete(oldUsernameRef)
        }
        transaction.update(docRef, updates)
      })
      setOpenSaveChangesMessage(true)
    } catch (error) {
      if (error === 'USERNAME_TAKEN') {
        setCustomPopupMessage('Username is already taken')
      } else if (error instanceof Error) {
        setCustomPopupMessage('Error: '+error.message)
      }
      setOpenCustomPopup(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="w-full bg-dl-white rounded-xl" onSubmit={handleSubmit}>
      <div className="p-6 md:p-10 flex gap-10 flex-col">
        <div className="flex flex-col gap-2 select-none">
          <h1 className="text-dl-black-gray font-instrument text-3xl font-bold leading-[150%]">
            Profile Details
          </h1>
          <p className="text-dl-dark-gray font-instrument text-base font-normal leading-[150%]">
            Add your details to create a personal touch to your profile.
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <UploadImage />
          <BasicDetails />
        </div>
      </div>
      <div
        className="w-full p-4 md:py-6 border-t bg-dl-white border-dl-light-gray md:px-10 flex justify-end items-center bottom-0 rounded-b-xl"
        style={{ zIndex: '9999' }}
      >
        <button
          className="w-[91px] h-[46px] rounded-[8px] bg-dl-purple text-white font-instrument text-base font-semibold leading-[150%] cursor-pointer flex justify-center items-center hover:bg-dl-mid-purple hover:text-dl-black-gray hover:shadow-[0px_0px_32px_0px_rgba(99,60,255,0.25)]"
          type="submit"
        >
          {loading ? (
            <CircularProgress
              className="text-dl-light-purple"
              color="secondary"
              size="33px"
            />
          ) : (
            'Save'
          )}
        </button>
      </div>
    </form>
  )
}
