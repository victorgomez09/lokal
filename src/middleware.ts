import { NextRequest, NextResponse } from "next/server";
import { getServerAuthSession } from "./server/auth";

const unprotectedRoutes = [
	'/login',
	'/register',
	'/setup'
];

export async function middleware(request: NextRequest) {
	const session = await getServerAuthSession();
	const { pathname } = request.nextUrl;

	if (session != null) {
		if (unprotectedRoutes.indexOf(pathname) > -1) {
			return NextResponse.redirect(new URL('/', request.url));
		}
	}

	if (session == null) {
		console.log("middleware")
		console.log("if", (unprotectedRoutes.indexOf(pathname) == -1))
		if (unprotectedRoutes.indexOf(pathname) == -1) {
			return NextResponse.redirect(new URL('/login', request.url));
		}
	}

	return NextResponse.next();
};

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
