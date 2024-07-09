import { getCurrentSession } from "@/lib/user";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
	const session = await getCurrentSession();
	const { pathname } = request.nextUrl;

	if (session != null) {
		if (pathname == '/login' || pathname == '/register') {
			return NextResponse.redirect(new URL('/', request.url));
		}
	}

	if (session == null) {
		if (pathname != '/login' && pathname != '/register' && pathname != '/logout') {
			return NextResponse.redirect(new URL('/login', request.url));
		}
	}

	return NextResponse.next();
};

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
