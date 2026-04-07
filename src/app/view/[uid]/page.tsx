"use server"

import { Metadata } from 'next'; //ResolvingMetadata
import Preview from './Preview';
import { fetchProfile, fetchUid } from '@/hooks/fetch-profile';

type Props = {
  params: { uid: string };
};

export async function generateMetadata(
  { params }: Props,
  // parent: ResolvingMetadata
): Promise<Metadata> {
  const { uid } = params;

  const profile = await fetchProfile(uid);

  if (!profile) {
    return {
      title: 'User Not Found',
      description: 'No user found for this ID.',
    };
  }

  const fullName = `${profile.firstName} ${profile.lastName}`;
  const appUrl = process.env.NEXT_APP_URL || 'http://localhost:3000';

  // const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${fullName} | DevLinks`,
    description: `Check out ${fullName}'s public profile on DevLinks.`,
    openGraph: {
      title: `${fullName} | DevLinks`,
      description: `Check out ${fullName}'s public profile on DevLinks.`,
      images: [
        {
          url: `${appUrl}/api/og/${uid}`,
          width: 1200,
          height: 630,
          alt: `${fullName}'s OG Image`,
        },
        // ...previousImages,
      ],
    },
  };
}

export default async function Page({ params }: Props) {
  const actualUid = await fetchUid(params.uid)
  return <Preview param={actualUid ?? params.uid} />;
}