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
  setOpenCustomPopup: React.Dispatch<React.SetStateAction<boolean>>
  customPopupMessage: string
  setCustomPopupMessage: React.Dispatch<React.SetStateAction<string>>
  setUid: React.Dispatch<React.SetStateAction<string>>
  usersLinks: LinksState
  dispatch: React.Dispatch<LinksAction>
  openLoginMessage: boolean
  setOpenLoginMessage: React.Dispatch<React.SetStateAction<boolean>>
  openSaveChangesMessage: boolean
  setOpenSaveChangesMessage: React.Dispatch<React.SetStateAction<boolean>>
  openCopiedToClipboardMessage: boolean
  setOpenCopiedToClipboardMessage: React.Dispatch<React.SetStateAction<boolean>>
}

export interface UserLink {
  id: string
  platform: string
  url: string
}

export interface UserLinks {
  links: UserLink[]
}
