import { Dispatch, SetStateAction } from "react";

export type UserProfile = {
  username?: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string; // The question mark means it's optional
  includeEmail?: boolean;
}

export interface Link {
  id: string
  platform: string
  link: string
  order: number
}

export interface LinksState extends Array<Link> {}

export type LinksAction =
  | { type: 'initialize links'; links: Link[] }
  | { type: 'add link'; link: Link }
  | { type: 'remove link'; linkId: string }
  | { type: 'update link'; linkId: string; platform?: string; link?: string }
  | { type: 're-order links'; indices: { removed: Link; index: number } }

export interface AppContextType {
  uid: string
  openCustomPopup: boolean
  setOpenCustomPopup: Dispatch<SetStateAction<boolean>>
  customPopupMessage: string
  setCustomPopupMessage: Dispatch<SetStateAction<string>>
  setUid: Dispatch<SetStateAction<string>>
  usersLinks: LinksState
  dispatch: Dispatch<LinksAction>
  openLoginMessage: boolean
  setOpenLoginMessage: Dispatch<SetStateAction<boolean>>
  openSaveChangesMessage: boolean
  setOpenSaveChangesMessage: Dispatch<SetStateAction<boolean>>
  openCopiedToClipboardMessage: boolean
  setOpenCopiedToClipboardMessage: Dispatch<SetStateAction<boolean>>
}

export interface UserLink {
  id: string
  platform: string
  url: string
}

export interface UserLinks {
  links: UserLink[]
}
