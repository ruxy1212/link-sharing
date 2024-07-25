import { useContext } from 'react';
import { Context } from '@/hooks/context';
import { useRouter } from 'next/navigation';
import { db } from "@/firebase/Configuration";
import { doc } from 'firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';

export default function NavBar() {
  const context = useContext(Context);

  if (!context) {
      throw new Error('PhoneMockup must be used within a Context.Provider');
  }

  const { uid, setOpenCopiedToClipboardMessage } = context;
    const router = useRouter();

    const handleBackToEditor = () => {
        router.push('/dashboard');
    }

    const handleShare = () => {
        const url = `${window.location.origin}/${uid}`;
        navigator.clipboard.writeText(url);
        setOpenCopiedToClipboardMessage(true);
    }

    return (
      <header className="w-full p-0 sm:p-4 md:px-6 md:py-4 lg:py-6 h-96 rounded-b-8 bg-dl-purple md:bg-dl-white">
        <nav className="w-full bg-dl-white rounded-xl flex justify-between items-center gap-6 p-4">
            <button className="py-3 px-7 rounded-lg border border-[#633CFF] bg-white text-[#633CFF] font-sans text-base font-semibold leading-[150%] cursor-pointer hover:bg-[#633CFF] hover:text-white" onClick={handleBackToEditor}>
                Back to Editor
            </button>
            <button className="py-3 px-7 rounded-[8px] text-white bg-[#633CFF] font-sans text-base font-semibold leading-[150%] cursor-pointer hover:text-[#633CFF] hover:bg-white hover:border hover:border-[#633CFF]" onClick={handleShare}>
                Share Link
            </button>
        </nav>
      </header>
    );
}
