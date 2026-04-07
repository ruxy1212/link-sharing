import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase/Configuration'

export const fetchProfile = async(param: string) => {
  try {
    const usernameSnap = await getDoc(doc(db, `usernames/${param.toLowerCase().trim()}`))
    if (usernameSnap.exists()) {
      const uid = usernameSnap.data().uid
      const profileSnap = await getDoc(doc(db, `${uid}/profileDetails`))
      return profileSnap.exists() ? profileSnap.data() : null
    } else {
      const profileSnap = await getDoc(doc(db, `${param}/profileDetails`))
      return profileSnap.exists() ? profileSnap.data() : null
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Fetch profile error: ", error.message)
    }
    return null
  }
}

export const fetchUid = async(username: string) => {
  try {
    const usernameSnap = await getDoc(doc(db, `usernames/${username.toLowerCase().trim()}`))
    if (usernameSnap.exists()) {
      const uid = usernameSnap.data().uid
      return uid ? uid : null
    } else return null
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Fetch profile error: ", error.message)
    }
    return null
  }
}