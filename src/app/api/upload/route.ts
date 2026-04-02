import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/hooks/cloudinary';

export async function POST(req: NextRequest) {
  const { image, userId } = await req.json();

  try {
    const result = await cloudinary.uploader.upload(image, {
      public_id: userId,
      folder: 'usersAvatar',
      overwrite: true,
      invalidate: true,
      resource_type: 'image',
    });

    return NextResponse.json({ success: true, url: result.secure_url });
  } catch (error) {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}