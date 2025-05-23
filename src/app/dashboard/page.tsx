'use client'

import { useState, useContext, useEffect } from 'react'
import { Context } from '@/hooks/context'
import NavBar from '@/layouts/navbar'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase/Configuration'
import Alert from '@/components/Alert'
import { CircularProgress } from '@mui/material'
import TabsContainer from '@/components/TabsContainer'
import { useRouter } from 'next/navigation'

const Dashboard: React.FC = () => {
  const context = useContext(Context)
  const router = useRouter()

  if (!context) {
    throw new Error('Account must be used within a Context.Provider')
  }

  const { uid, setUid } = context
  const [currentTab, setCurrentTab] = useState<string>('links')

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && currentUser.emailVerified === true) {
        setUid(currentUser.uid)
      } else {
        setUid('')
        router.push('/login')
      }
    })

    return () => {
      unsubscribe()
    }
  }, [setUid, router])

  useEffect(() => {
  }, [currentTab])

  return (
    <>
      <main className="w-full flex flex-col gap-0 min-h-screen bg-dl-white-gray">
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-0">
          {uid ? (
            <>
              <NavBar currentTab={currentTab} uid={uid} setCurrentTab={setCurrentTab} />
              <TabsContainer currentTab={currentTab} />
            </>
          ) : (
            <div className="w-full h-screen flex justify-center items-center">
              <span className="h-12">
                <CircularProgress
                  className="text-dl-light-purple"
                  color="secondary"
                />
              </span>
            </div>
          )}
        </div>
      </main>
      <Alert />
    </>
  )
}

export default Dashboard
