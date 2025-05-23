import { useContext, useState, FormEvent } from 'react'
import { Context } from '@/hooks/context'
import { storage, db } from '@/firebase/Configuration'
import { ref, uploadBytes } from 'firebase/storage'
import { doc, setDoc } from 'firebase/firestore'
import UploadImage from './profile-fragments/UploadImage'
import BasicDetails from './profile-fragments/BasicDetails'
import { CircularProgress } from '@mui/material'

interface FormElements extends HTMLFormControlsCollection {
  profileAvatar: HTMLInputElement
  firstName: HTMLInputElement
  lastName: HTMLInputElement
  email: HTMLInputElement
}

interface FormElement extends HTMLFormElement {
  readonly elements: FormElements
}

export default function ProfileDetails() {
  const context = useContext(Context)

  if (!context) {
    throw new Error('PhoneMockup must be used within a Context.Provider')
  }

  const { uid, setOpenSaveChangesMessage } = context
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (e: FormEvent<FormElement>) => {
    e.preventDefault()
    try {
      setLoading(true)
      const form = e.currentTarget

      const newAvatarFile = form.elements.profileAvatar.files?.[0]
      if (newAvatarFile) {
        const avatarRef = ref(storage, `/${uid}/usersAvatar`)
        await uploadBytes(avatarRef, newAvatarFile)
      }

      const newFirstName = form.elements.firstName.value
      const newLastName = form.elements.lastName.value
      const newEmail = form.elements.email.value;

      const docRef = doc(db, `${uid}/profileDetails`)
      await setDoc(docRef, {
        avatar: newAvatarFile ? newAvatarFile.name : '',
        firstName: newFirstName,
        lastName: newLastName,
        email: newEmail,
      })

      setOpenSaveChangesMessage(true)
      setLoading(false)
    } catch (error) {
      console.error(error)
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
