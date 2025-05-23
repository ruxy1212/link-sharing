"use client";

import { Context } from "@/hooks/context";
import GuestLayout from "@/layouts/guest-layout";
import { CircularProgress } from "@mui/material";
import dynamic from "next/dynamic";
import Link from 'next/link'
import { useContext, useEffect, useState } from "react";
import { auth } from '@/firebase/Configuration';
import { ThemeSwitch } from "@/components/theme-switch";

const LogoScene = dynamic(() => import("@/components/logo-scene"), {
  ssr: false,
});

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  const context = useContext(Context);
  const { uid } = context || {};

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out', error);
    }
  };

  return (
    <GuestLayout variant="forHome">
      <div className="flex flex-col items-center min-h-screen justify-center">
        <main className="h-[100vh] w-full flex justify-center items-center relative">
          <header className="absolute top-6 text-center">
            <svg width="552" className="h-12 -translate-x-7" height="120" viewBox="0 0 552 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M185.9916 96.45V84.585L187.0305 84.795C186.3378 88.645 184.2603 91.725 180.7974 94.035C177.4038 96.345 173.3178 97.5 168.5391 97.5C163.6914 97.5 159.4668 96.3801 155.8656 94.14C152.3334 91.83 149.598 88.61 147.6588 84.48C145.7196 80.35 144.75 75.4851 144.75 69.885C144.75 64.215 145.7541 59.28 147.7626 55.08C149.7711 50.88 152.5758 47.625 156.177 45.315C159.8478 43.005 164.1069 41.85 168.9546 41.85C174.0105 41.85 178.0965 43.0401 181.2129 45.42C184.3986 47.7999 186.2685 51.0549 186.8226 55.185L185.6799 55.29V20.85H201.2625V96.45H185.9916ZM173.5257 84.9C177.1962 84.9 180.174 83.6049 182.4594 81.015C184.7449 78.3549 185.8878 74.575 185.8878 69.675C185.8878 64.775 184.7103 61.03 182.3556 58.44C180.0702 55.7799 176.0577 54.45 170.3178 54.45C164.7165 54.45 161.7387 55.7799 159.3839 58.44C157.0985 61.1001 156.9558 64.8801 156.9558 69.78C156.9558 74.68 158.0985 78.4599 160.3839 81.12C162.7387 83.7801 165.7782 84.9 173.5257 84.9Z" fill="rgb(var(--dl-black-gray))"/>
              <path d="M238.653 97.5C232.7661 97.5 227.6412 96.345 223.2783 94.035C218.9153 91.6551 215.5215 88.365 213.0978 84.165C210.7435 79.965 209.5655 75.135 209.5655 69.675C209.5655 64.1451 210.7435 59.3151 213.0978 55.185C215.5215 50.985 218.8806 47.73 223.1745 45.42C227.4684 43.0401 232.4547 41.85 238.1334 41.85C243.6048 41.85 248.3487 42.97 252.3654 45.21C256.3819 47.4501 259.4988 50.565 261.716 54.555C263.9332 58.545 265.0392 63.2349 265.0392 68.625C265.0392 69.745 265.0045 70.795 264.9354 71.775C264.8663 72.6849 264.7623 73.56 264.6236 74.4H218.7075V64.005H252.0537L249.3528 65.895C249.3528 61.555 248.3141 58.37 246.2364 56.34C244.2281 54.24 241.4577 53.19 237.9258 53.19C233.8398 53.19 230.6538 54.59 228.3684 57.39C226.1529 60.19 225.0441 64.39 225.0441 69.99C225.0441 75.45 226.1529 79.51 228.3684 82.17C230.6538 84.83 234.0476 86.16 238.5489 86.16C241.0422 86.16 243.189 85.74 244.9899 84.9C246.7905 84.06 248.1408 82.695 249.0409 80.805H263.6886C261.9573 85.9851 258.9795 90.08 254.7555 93.09C250.5996 96.03 245.2323 97.5 238.653 97.5Z" fill="rgb(var(--dl-black-gray))"/>
              <path d="M286.2906 96.45L265.41 42.9H282.1353L298.4448 92.88H289.7187L305.925 42.9H322.233L301.353 96.45H286.2906Z" fill="rgb(var(--dl-black-gray))"/>
              <path d="M328.257 96.45V20.85H343.839V96.45H328.257Z" fill="rgb(var(--dl-black-gray))"/>
              <path d="M356.256 96.45V42.9H371.838V96.45H356.256ZM355.737 35.76V18.75H372.357V35.76H355.737Z" fill="rgb(var(--dl-black-gray))"/>
              <path d="M384.255 96.45V42.9H399.525V55.5H399.837V96.45H384.255ZM421.134 96.45V63.27C421.134 60.33 420.372 58.125 418.848 56.655C417.393 55.185 415.248 54.45 412.407 54.45C409.983 54.45 407.802 55.01 405.864 56.13C404.003 57.25 402.504 58.79 401.397 60.75C400.356 62.71 399.837 65.02 399.837 67.68L398.487 54.765C400.218 50.845 402.747 47.73 406.071 45.42C409.464 43.04 413.619 41.85 418.536 41.85C424.425 41.85 428.925 43.53 432.042 46.89C435.159 50.18 436.716 54.625 436.716 60.225V96.45H421.134Z" fill="rgb(var(--dl-black-gray))"/>
              <path d="M448.575 96.45V20.85H464.157V96.45H448.575ZM482.544 96.45L460.521 68.625L482.025 42.9H499.995L474.753 71.04L475.479 66.105L501.036 96.45H482.544Z" fill="rgb(var(--dl-black-gray))"/>
              <path d="M526.479 97.5C518.724 97.5 512.559 95.925 508.99 92.775C503.418 89.625 500.925 85.2849 500.508 79.755H514.431C514.776 82.1349 515.952 83.955 517.962 85.215C520.038 86.4051 522.879 87 526.479 87C529.734 87 532.089 86.5449 533.544 85.635C535.068 84.6549 535.83 83.2899 535.83 81.54C535.83 80.21 535.38 79.195 534.48 78.495C533.649 77.7249 532.089 77.0949 529.806 76.605L521.286 74.82C514.983 73.49 510.345 71.4951 507.366 68.835C504.387 66.105 502.899 62.6049 502.899 58.335C502.899 53.155 504.873 49.13 508.821 46.26C512.769 43.32 518.274 41.85 525.339 41.85C532.332 41.85 537.906 43.2849 542.064 46.155C546.219 48.9549 548.502 52.875 548.919 57.915H534.999C534.723 56.0949 533.751 54.7299 532.089 53.82C530.427 52.8399 528.072 52.35 525.027 52.35C522.255 52.35 520.179 52.77 518.793 53.61C517.476 54.38 516.819 55.5 516.819 56.97C516.819 57.87 517.374 58.995 518.481 60.015C519.588 60.7151 521.424 61.3449 523.986 61.905L533.544 63.9C538.878 65.0199 542.895 67.1199 545.595 70.2C548.364 73.2099 549.75 76.7799 549.75 80.91C549.75 86.16 547.707 90.255 543.621 93.195C539.604 96.0651 533.892 97.5 526.479 97.5Z" fill="rgb(var(--dl-black-gray))"/>
            </svg>
          </header>
          <span className={`h-12 absolute ${isLoading?'':'hidden'}`}>
            <CircularProgress
              className="text-dl-light-purple"
              color="secondary"
            />
          </span>
          <LogoScene onLoaded={() => setIsLoading(false)} />
          <div className="flex justify-center w-full absolute bottom-16 z-10 gap-2">
            <div className={`flex gap-2 ${uid?'flex-row':'flex-row-reverse'}`}>
              <ThemeSwitch />
              <Link href={uid ? "/dashboard" : "/login"} className="w-40 h-12 bg-dl-purple text-dl-white text-base font-sans font-semibold cursor-pointer select-none hover:bg-dl-mid-purple hover:text-dl-black-gray active:translate-y-2 active:[box-shadow:0_0px_0_0_#beadff,0_0px_0_0_#1b70f841] active:border-b-[0px] transition-all duration-150 [box-shadow:0_5px_0_0_#beadff,0_7px_0_0_#efebff41] rounded-full border-[1px] border-dl-purple group">
                <span className="flex flex-col justify-center items-center h-full text-white group-hover:text-dl-black-gray font-bold text-lg ">{uid ? 'Dashboard' : 'Log In'}</span>
              </Link>
            </div>
            {uid && (
              <button
                onClick={handleSignOut}
                className="w-12 h-12 bg-dl-purple text-dl-white font-sans font-semibold cursor-pointer select-none hover:bg-dl-mid-purple hover:text-dl-black-gray active:translate-y-2 active:[box-shadow:0_0px_0_0_#beadff,0_0px_0_0_#1b70f841] active:border-b-[0px] transition-all duration-150 [box-shadow:0_5px_0_0_#beadff,0_7px_0_0_#efebff41] rounded-full border-[1px] border-dl-purple flex justify-center items-center"
                aria-label="Log Out"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-dl-red hover:text-dl-black-gray"
                >
                  <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
                  <line x1="12" y1="2" x2="12" y2="12" />
                </svg>
              </button>
            )}
          </div>
        </main>
      </div>
    </GuestLayout>
  )
}
