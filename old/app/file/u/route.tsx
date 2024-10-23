import { NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/old/lib/actions";
import path from "path";
import fs from "fs";

const UPLOAD_DIR = path.resolve(process.env.ROOT_PATH ?? "", "data");

export async function GET(request: NextRequest) {
	const user = await getCurrentUser();

	if (request.nextUrl.searchParams.get('path') == null || user == null) {
		return NextResponse.json(null);
	}

	const filename = request.nextUrl.searchParams.get('path') ?? '';
	const nameSplit = filename.split('/');
	const attachmentName = nameSplit[nameSplit.length - 1];
	const filePath = path.join(UPLOAD_DIR, user.rootDir, filename);
	const body = fs.readFileSync(filePath);

	return new Response(body, {
		headers: {
			"content-disposition": `attachment; filename="${attachmentName}"`,
		},
	});
}
