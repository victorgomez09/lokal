import { getCurrentUser } from "@/lib/actions";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

const UPLOAD_DIR = path.resolve(process.env.ROOT_PATH ?? "", "data");

export const POST = async (request: NextRequest) => {
	const formData = await request.formData();
	const body = Object.fromEntries(formData);
	const file = (body.file as Blob) || null;
	const user = await getCurrentUser();
	const target = path.join(UPLOAD_DIR, user.rootDir);

	if (file) {
		const buffer = Buffer.from(await file.arrayBuffer());
		if (!fs.existsSync(target)) {
			fs.mkdirSync(target);
		}

		fs.writeFileSync(
			path.resolve(target, (body.file as File).name),
			buffer
		);
	} else {
		return NextResponse.json({
			success: false,
		});
	}

	return NextResponse.json({
		success: true,
		name: (body.file as File).name,
	});
};