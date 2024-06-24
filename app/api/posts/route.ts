import prisma from '@/lib/prisma';
import { NextResponse } from "next/server"

export async function GET(request: Request) {
	const posts = await prisma.post.findMany();
	return NextResponse.json(posts);
}

export async function POST(request: Request) {
	const formData = await request.formData();
	const post = await prisma.post.create({
		data: {
			title: formData.get('title') as string,
			content: formData.get('content') as string,
		},
	});

	return NextResponse.json(post);
}
