import { getCurrentSession } from "@/lib/user";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
	const session = await getCurrentSession();

	if (session != null) {
		if (request.nextUrl.pathname == '/login' || request.nextUrl.pathname == '/register') {
			return NextResponse.redirect(new URL('/', request.url));
		}
	}

	if (session == null) {
		if (request.nextUrl.pathname != '/login' && request.nextUrl.pathname != '/register') {
			return NextResponse.redirect(new URL('/login', request.url));
		}
	}

	return NextResponse.next();
};

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
