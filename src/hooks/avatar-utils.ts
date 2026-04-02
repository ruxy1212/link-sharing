export const getAvatarUrl = async (userId: string): Promise<string> => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const fallback = '/images/placeholder-image.png';
  const url = `https://res.cloudinary.com/${cloudName}/image/upload/f_auto/usersAvatar/${userId}`;

  try {
    const probe = await fetch(url, { method: 'HEAD' });
    return probe.ok ? url : fallback;
  } catch {
    return fallback;
  }
};

export const uploadAvatar = async (file: File, uid: string): Promise<string> => {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onloadend = async () => {
      try {
        const base64 = reader.result as string;

        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64, userId: uid }),
        });

        if (!res.ok) throw new Error('Upload failed');
        
        const { url } = await res.json();
        resolve(url); // resolve with the URL instead of void
      } catch (err) {
        reject(err);
      }
    };

    reader.onerror = () => reject(new Error('File read failed'));
    reader.readAsDataURL(file);
  });
};