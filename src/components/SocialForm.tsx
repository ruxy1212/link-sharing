import { useRouter } from 'next/navigation'
import { auth } from '@/firebase/Configuration'
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { useContext, useState } from 'react';
import { Context } from '@/hooks/context'
import CustomPopup from './CustomAlert';

export default function SocialForm(){
  const context = useContext(Context)
  const router = useRouter()

  if (!context) {
    throw new Error('Popup must be used within a Context.Provider')
  }

  const { setOpenLoginMessage } = context;
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  if (!context) {
    throw new Error('DevLinks must be used within a Context.Provider')
  }
  const { setCustomPopupMessage, setOpenCustomPopup } = context;

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    setError('');
    setLoading(true);
    try {
      let authProvider;
      if (provider === 'google') {
        authProvider = new GoogleAuthProvider();
      } else {
        authProvider = new GithubAuthProvider();
      }

      if(provider === 'github'){
        setCustomPopupMessage('Github provider is currently unavailable')
        setOpenCustomPopup(true)
        setLoading(false)
        return;
      }

      const result = await signInWithPopup(auth, authProvider);
      if(result){
        setOpenLoginMessage(true);
        router.push('/dashboard');
      }
      setLoading(false)
    } catch (error: unknown) {
      setError(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login failed`);
      console.error(`${provider} login error:`, error);
      setLoading(false)
    }
  };

  return (
    <div className="flex flex-col">
      <div className="relative w-full">
        <div className="w-2/3 h-px bg-dl-light-gray mx-auto" />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-4 bg-dl-white font-semibold text-dl-light-gray text-xs">OR</span>
      </div>
      <div className="h-16 mt-5">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <button
              onClick={() => handleSocialLogin('google')}
              disabled={loading}
              className="w-full inline-flex items-center justify-center py-2 px-4 border border-dl-light-gray rounded-md shadow-sm bg-dl-white text-sm font-medium text-dl-dark-gray hover:bg-dl-purple hover:border-2 hover:text-dl-neutral-white transition-all disabled:bg-dl-purple disabled:border disabled:text-dl-neutral-white disabled:cursor-not-allowed disabled:opacity-60"
            >
                <svg className="w-4 h-4 me-1" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 12C6 15.3137 8.68629 18 12 18C14.6124 18 16.8349 16.3304 17.6586 14H12V10H21.8047V14H21.8C20.8734 18.5645 16.8379 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C15.445 2 18.4831 3.742 20.2815 6.39318L17.0039 8.68815C15.9296 7.06812 14.0895 6 12 6C8.68629 6 6 8.68629 6 12Z" fill="currentColor"></path>
                </svg>
              Google
            </button>
          </div>
          <div>
            <button
              onClick={() => handleSocialLogin('github')}
              disabled={loading}
              className="w-full inline-flex items-center justify-center py-2 px-4 border border-dl-light-gray rounded-md shadow-sm bg-dl-white text-sm font-medium text-dl-dark-gray hover:bg-dl-purple hover:border-2 hover:text-dl-neutral-white transition-all disabled:bg-dl-purple disabled:border disabled:text-dl-neutral-white disabled:cursor-not-allowed disabled:opacity-60"
            >
                <svg className="w-4 h-4 me-1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"></path>
                </svg>
              GitHub
            </button>
          </div>
        </div>
        {error && (
          <p className="text-red-500 text-xs px-4 py-1.5 relative text-center" role="alert">{error}</p>
        )}
      </div>
      <CustomPopup />
    </div>
  )
}