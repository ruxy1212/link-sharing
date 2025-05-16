"use server"

import { Metadata, ResolvingMetadata } from 'next';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/Configuration';
import Preview from './Preview';

type Props = {
  params: { uid: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { uid } = params;

  const profileSnap = await getDoc(doc(db, `${uid}/profileDetails`));

  if (!profileSnap.exists()) {
    return {
      title: 'User Not Found',
      description: 'No user found for this ID.',
    };
  }

  const profile = profileSnap.data();
  const fullName = `${profile.firstName} ${profile.lastName}`;
  const appUrl = process.env.NEXT_APP_URL || 'http://localhost:3000';

  const previousImages = (await parent).openGraph?.images || [];

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
        ...previousImages,
      ],
    },
  };
}

export default async function Page({ params }: Props) {
  return <Preview params={params} />;
}