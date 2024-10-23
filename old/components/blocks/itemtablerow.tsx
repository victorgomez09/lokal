"use client";

import { File } from "@/old/lib/file-utils";

import Link from "next/link";
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem } from "../ui/context-menu";
import { FileIcon, FolderIcon, CircleAlertIcon } from "lucide-react";
import { TableRow, TableCell } from "../ui/table";
import { formatDate } from "@/old/lib/utils";
import { useSearchParams } from "next/navigation";
import path from "path";

export const ItemTableRow = ({
	file,
	onClick = () => null,
	onNavigate = () => null,
}: {
	file: File,
	onClick?: (file: File) => void,
	onNavigate?: (file: File) => void,
}) => {
	const params = useSearchParams();
	const download_path = path.join(params.get('path') ?? '/', file.name);
	const onItemDoubleClick = () => {
	};

	return (
		<ContextMenu>
			<ContextMenuTrigger asChild>
				<TableRow onClick={() => onClick(file)} onDoubleClick={onItemDoubleClick} style={{ height: 49 }}>
					{/* Name */}
					<TableCell>
						<div className="flex items-center gap-2">
							{/* Icon */}
							{file.type == 'dir' ?
								<FolderIcon className="h-4 w-4 text-muted-foreground" />
							: null}

							{file.type == 'file' ?
								<FileIcon className="h-4 w-4 text-muted-foreground" />
							: null}

							{file.type == 'other' ?
								<CircleAlertIcon className="h-4 w-4 text-muted-foreground" />
							: null}

							{/* Name */}
							<Link href="#" onClick={(e) => { e.preventDefault(); onNavigate(file) }} className="font-medium" prefetch={false}>
								{file.name}
							</Link>

							{/* Tags */}
							{/* <Link href="#" className="inline-flex items-center rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
								Photos May
							</Link> */}
						</div>
					</TableCell>

					{/* Type */}
					<TableCell>
						{file.type == 'dir' ?
							"Directory"
						: null}

						{file.type == 'file' ?
							"File"
						: null}

						{file.type == 'other' ?
							"Unknown"
						: null}
					</TableCell>

					{/* Date */}
					<TableCell>
						{formatDate(file.date)}
					</TableCell>

					{/* Size */}
					<TableCell>{file.type == 'dir' ? '-' : file.size}</TableCell>
				</TableRow>
			</ContextMenuTrigger>

			<ContextMenuContent>
				{file.type == 'file' ?
					<ContextMenuItem asChild>
						<a href={`/file/u?path=${download_path}`} target="_blank" className="cursor-pointer">
							Download
						</a>
					</ContextMenuItem>
				: null}

				<ContextMenuItem>Share</ContextMenuItem>
				<ContextMenuItem>Rename</ContextMenuItem>
				<ContextMenuItem>Delete</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	);

};