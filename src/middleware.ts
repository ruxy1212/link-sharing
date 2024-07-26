import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()
  if (url.pathname.startsWith('/preview/')) {
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/preview/:path*'],
}
