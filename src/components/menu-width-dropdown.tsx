import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { EyeIcon, Menu } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react'
import { auth } from '@/firebase/Configuration';
import { useRouter } from '@bprogress/next/app'

interface DropdownProps {
  uid: string
  setOpenCustomPopup: Dispatch<SetStateAction<boolean>>
  setCustomPopupMessage: Dispatch<SetStateAction<string>>
  setUid: Dispatch<SetStateAction<string>>
}

export default function MenuWithDropdown({ uid, setUid, setCustomPopupMessage, setOpenCustomPopup }: DropdownProps) {
  const router = useRouter()

  const handlePreviewLink = () => {
    router.push('/view/'+uid)
  }

  const handleSignOut = async () => {
    if(uid){
      try {
        await auth.signOut();
        setCustomPopupMessage('Logged out successfully')
        setOpenCustomPopup(true)
        setUid('')
      } catch (error) {
        console.error('Error signing out', error);
      }
    } else router.push('/login')
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        className="text-dl-purple w-9 h-9 bg-dl-neutral-white font-sans font-semibold cursor-pointer select-none hover:bg-dl-mid-purple hover:text-dl-light-purple-neutral active:translate-y-2 active:[box-shadow:0_0px_0_0_#beadff,0_0px_0_0_#1b70f841] active:border-b-[0px] transition-all duration-150 [box-shadow:0_3px_0_0_#beadff,0_5px_0_0_#efebff41] rounded-full border-[1px] border-dl-purple flex justify-center items-center md:w-11 md:h-11"
        aria-label="Log Out"
      >
        <Menu />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="bg-dl-light-gray p-2 md:py-4 lg:py-6 shadow-xl rounded-xl border border-dl-dark-gray w-48"
          sideOffset={5}
          align='end'
        >
          <DropdownMenu.Item
            className="w-full px-4 py-2.5 mb-1.5 md:mb-3 rounded-[8px] bg-dl-purple text-white font-instrument text-sm md:text-base font-semibold leading-[150%] cursor-pointer flex items-center gap-2 hover:bg-dl-mid-purple hover:text-dl-neutral-white hover:shadow-[0px_0px_32px_0px_rgba(99,60,255,0.25)]"
            onSelect={handlePreviewLink}
          >
            <EyeIcon size="20" />
            <span>Preview</span>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="w-full px-4 py-2.5 rounded-[8px] bg-dl-red text-white font-instrument text-sm md:text-base font-semibold leading-[150%] cursor-pointer flex items-center gap-2 hover:bg-dl-mid-purple hover:text-dl-neutral-white hover:shadow-[0px_0px_32px_0px_rgba(99,60,255,0.25)]"
            onSelect={handleSignOut}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
              <path d="M9 12h12l-3 -3"></path>
              <path d="M18 15l3 -3"></path>
            </svg>
            <span>Logout</span>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}