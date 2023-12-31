import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
	async function middleware(req) {
		const pathname = req.nextUrl.pathname;

		// Manage route protection
		const isAuth = await getToken({ req });
		const isAuthPage = pathname.startsWith('/signin') || pathname.startsWith('/signup');

		const sensitiveRoutes = ['/'];
		const isAccessingSensitiveRoute = sensitiveRoutes.some((route) => pathname.startsWith(route));

		if (isAuthPage) {
			if (isAuth) {
				return NextResponse.redirect(new URL('/', req.url));
			}

			return NextResponse.next();
		}

		if (!isAuth && isAccessingSensitiveRoute) {
			return NextResponse.redirect(new URL('/signin', req.url));
		}
	},
	{
		callbacks: {
			async authorized() {
				return true;
			},
		},
	}
);

export const config = {
	matcher: ['/((?!signin|api|signup).*)'],
};
