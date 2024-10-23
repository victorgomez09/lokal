"use client";

import pathFs from 'path';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/old/components/ui/table"
import { ItemTableRow } from "@/old/components/blocks/itemtablerow"
import { useEffect, useState } from "react";
import { File } from "@/old/lib/file-utils";
import Link from "next/link";
import { FolderUp } from "lucide-react";
import { useRouter } from 'next/navigation';

export const FileView = () => {
	const [files, setFiles] = useState<File[]>([]);
	const [path, setPath] = useState('/');
	const [parent, setParent] = useState<string | null>(null);
	const router = useRouter();

	const fetchData = (path: string) => {
		fetch('/api/files', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				path: path,
			}),
		})
			.then(async (response) => {
				const body = await response.json();

				setParent(body.parent);
				setFiles(body.files.map((file: File) => {
					return {
						...file,
						date: new Date(file.date),
					};
				}));
			});
	}

	useEffect(() => {
		const handlePopState = (event: PopStateEvent) => {
			if (parent != null) {
				goParent(null);
			}
		};

		window.addEventListener('popstate', handlePopState);

		// Cleanup the event listener on component unmount
		return () => {
			window.removeEventListener('popstate', handlePopState);
		};
	}, [router, parent]);

	useEffect(() => {
		const eventListener = () => {
			fetchData(path);
		};

		if (path != '/') {
			router.push('/files?path=' + path, {
				scroll: false
			});
		}

		window.addEventListener('FILE_COMPLETE', eventListener);
		return () => window.removeEventListener('FILE_COMPLETE', eventListener);
	}, [path]);

	useEffect(() => {
		fetchData(path);

		localStorage.setItem('currentFilePath', path);
	}, [path]);

	const onItemClick = (item: File) => {
		if (item.type == 'dir') {
			setPath(pathFs.join(path, item.name))
		}
	}

	const goParent = (event: any) => {
		event?.preventDefault();
		setPath(parent ?? '/');
	}

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Name</TableHead>
					<TableHead>Type</TableHead>
					<TableHead>Date</TableHead>
					<TableHead>Size</TableHead>
				</TableRow>
			</TableHeader>

			<TableBody>
				{parent != null ?
					<TableRow>
						<TableCell style={{ height: 49 }}>
							<div className="flex items-center gap-2">
								<FolderUp className="h-4 w-4 text-muted-foreground" />

								<Link href="#" onClick={goParent} className="font-medium">
									..
								</Link>
							</div>
						</TableCell>
						<TableCell></TableCell>
						<TableCell></TableCell>
						<TableCell></TableCell>
					</TableRow>
					: null}

				{[...files]
					.sort((file) => file.type == 'dir' ? -1 : 1)
					.map((file, index) => {
						return <ItemTableRow
							file={file}
							key={index}
							onNavigate={onItemClick}
						/>
					})}
			</TableBody>
		</Table>
	);
}