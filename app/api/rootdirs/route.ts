import { NextResponse } from "next/server"
import { getFilesInDirectory } from "@/lib/file-utils";
import { getCurrentSession } from "@/lib/user";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
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

	const root_dir: string = '/data/';

	const response = getFilesInDirectory(root_dir).filter((file) => file.type === 'dir');

	return NextResponse.json(response);
};
