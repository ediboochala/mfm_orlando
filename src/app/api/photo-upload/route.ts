import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import { NextResponse } from 'next/server'

// Issues short-lived client tokens so the gallery "Share your photos" form can
// upload straight from the browser to Vercel Blob (store: mfm-photo-submissions).
// Only images, only under photo-submissions/, max 15 MB each.
const MAX_BYTES = 15 * 1024 * 1024

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody

  try {
    const json = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!pathname.startsWith('photo-submissions/')) {
          throw new Error('Invalid upload path')
        }
        return {
          allowedContentTypes: ['image/*'],
          maximumSizeInBytes: MAX_BYTES,
          addRandomSuffix: true,
          validUntil: Date.now() + 10 * 60 * 1000,
        }
      },
    })
    return NextResponse.json(json)
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 })
  }
}
