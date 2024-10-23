import { NextResponse } from "next/server"
import { getCurrentSession } from "@/old/lib/user";
import prisma from "@/old/lib/prisma";

export async function POST(request: Request) {
	const session = await getCurrentSession();
	const user = await prisma.user.findUnique({
		where: {
			id: (session?.user as any).id ?? '',
		},
		select: {
			role: true,
		}
	});

	if (user == null || user.role != 'O') {
		return NextResponse.json(null);
	}

	const formData = await request.json();
	const inviteLink = await prisma.inviteLink.create({
		data: formData,
	});

	return NextResponse.json(inviteLink);
};
