import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '@/firebase/Configuration';
import { jsx, jsxs } from 'react/jsx-runtime';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const firstName = searchParams.get('firstName') || 'Devlinks';
  const lastName = searchParams.get('lastName') || 'User';
  const userId = searchParams.get('userId') || '';
  const fullName = `${firstName} ${lastName}`;

  let avatarUrl = '/images/placeholder-image.png';

  try {
    const avatarRef = ref(storage, `${userId}/usersAvatar`);
    avatarUrl = await getDownloadURL(avatarRef);
  } catch (err) {
    console.warn('Using fallback avatar due to error:', err);
  }

  const logoUrl = `${process.env.NEXT_APP_URL || 'http://localhost:3000'}/devlinks.png`;

  return new ImageResponse(
    jsxs('div', {
      style: {
        width: '1200px',
        height: '630px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f7f7f7',
        fontFamily: 'sans-serif',
      },
      children: [
        jsxs('div', {
          style: {
            width: '1000px',
            height: '400px',
            backgroundColor: '#ffffff',
            display: 'flex',
            flexDirection: 'row',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          },
          children: [
            // Left column: Avatar
            jsx('div', {
              style: {
                width: '40%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f0f0f0',
              },
              children: jsx('img', {
                src: avatarUrl,
                alt: 'User Avatar',
                style: {
                  width: '220px',
                  height: '220px',
                  borderRadius: '50%',
                  border: '2px solid #633bff',
                  objectFit: 'cover',
                },
              }),
            }),

            // Right column: Name and Logo
            jsxs('div', {
              style: {
                width: '60%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                color: '#633bff',
                textAlign: 'center',
              },
              children: [
                jsx('h1', {
                  style: {
                    fontSize: '48px',
                    marginBottom: '10px',
                  },
                  children: fullName,
                }),
                jsx('h4', {
                  style: {
                    fontSize: '28px',
                    marginBottom: '30px',
                  },
                  children: fullName,
                }),
                jsx('img', {
                  src: logoUrl,
                  alt: 'Logo',
                  style: {
                    width: '100px',
                    height: '100px',
                  },
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    {
      width: 1200,
      height: 630,
    }
  );
}
