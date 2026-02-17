import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    const isPublicPath =
        path === '/login' ||
        path === '/signup' ||
        path === '/verifyemail'

    const token = request.cookies.get('token')?.value || ''

    // If user is logged in and tries to access public pages
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/home', request.url))
    }

    // If user is NOT logged in and tries to access protected pages
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // Otherwise allow the request
    return NextResponse.next()
}

export const config = {
    matcher: [
        '/',
        '/login',
        '/signup',
        '/profile',
        '/verifyemail',
        '/home'
    ]
}
