'use client'

import { useContext, useEffect } from 'react'
import PhoneMockup from '@/components/link-fragments/PhoneMockup'
import LoadingPhone from '@/components/LoadingPhone'
import { Context } from '@/hooks/context'
import { doc } from 'firebase/firestore'
import { db } from '@/firebase/Configuration'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import ProfileTab from './ProfileTab'
import LoadingLink from './LoadingLink'
import LinksTab from './LinksTab'
import CustomAlert from './CustomAlert'
import { UserProfile } from '@/hooks/types'
import Alert from './Alert'

export default function TabsContainer({ currentTab }: { currentTab: string }) {
  const context = useContext(Context)

  if (!context) {
    throw new Error('LinksTab must be used within a Context.Provider')
  }

  const { uid, dispatch } = context

  const linkDocRef = doc(db, `${uid}/userLinks`)
  const profileDocRef = doc(db, `${uid}/profileDetails`)
  const [profileDetails, loadingProfile] = useDocumentData(profileDocRef)
  const [userLinks, loadingUserLinks, error] = useDocumentData(linkDocRef)

  if (error) {
    console.error('Error loading user links:', error)
  }

  useEffect(() => {
    if (loadingUserLinks || !userLinks) return
    dispatch({ type: 'initialize links', links: userLinks.links })
  }, [loadingUserLinks, userLinks, dispatch])

  return (
    <div className="px-4 py-4 md:px-6 md:pb-6 md:pt-0 grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="hidden lg:block lg:col-span-5 top-6 sticky self-start">
        {loadingUserLinks || loadingProfile ? <LoadingPhone /> : <PhoneMockup />}
      </div>
      <div className="lg:col-span-7">
        {currentTab === 'links' ? (
          loadingUserLinks ? (
            <LoadingLink />
          ) : (
            <LinksTab />
          )
        ) : (
          <ProfileTab profileDetails={profileDetails as UserProfile} />
        )}
      </div>
      <CustomAlert />
      <Alert />
    </div>
  )
}
