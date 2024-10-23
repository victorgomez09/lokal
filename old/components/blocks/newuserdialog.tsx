"use client";

import React, { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogFooter,
	DialogClose,
	DialogTitle,
	DialogTrigger,
} from "@/old/components/ui/dialog"

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/old/components/ui/select"

import { Button } from "@/old/components/ui/button";
import { Input } from "@/old/components/ui/input";
import { Copy } from "lucide-react";
import { Label } from "@/old/components/ui/label";
import { DirInput } from "../ui/dirinput";

export const NewUserDialog = (props: any) => {
	const [link, setLink] = useState<null | string>(null);

	const setClipboardContents = (event: any) => {
		event.preventDefault();
		navigator.clipboard.writeText(window.location.origin + '/register?invite=' + link);
	};

	const onLinkSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.nativeEvent.target as any);
		fetch('/api/createinvite', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				rootDir: formData.get('rootDir')?.toString() ?? '',
				role: formData.get('role')?.toString() ?? '',
			}),
		})
		.then(async (response) => {
			const body = await response.json();
			if (body.id != null) {
				setLink(body.id);
			}
		});
	};

	return (
		<Dialog>
			<DialogTrigger asChild>{props.children}</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Invite new user</DialogTitle>
				</DialogHeader>

				{link == null ?
					<form className="flex flex-col gap-2" onSubmit={onLinkSubmit}>
						<div>
							<Label>
								Root directory
							</Label>

							<DirInput />
						</div>

						<div>
							<Label>
								Role
							</Label>

							<Select defaultValue="U" name="role">
								<SelectTrigger defaultValue="U">
									<SelectValue />
								</SelectTrigger>

								<SelectContent>
									<SelectItem value="U">User</SelectItem>
									<SelectItem value="A">Admin</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div>
							<Button type="submit" className="w-full">
								Create invite link
							</Button>
						</div>
					</form>
				: null}

				{link != null ?
					<div className="flex items-center space-x-2">
						<div className="grid flex-1 gap-2">
							<Label htmlFor="link" className="sr-only">
								Link
							</Label>

							<Input
								id="link"
								value={window.location.origin + '/register?invite=' + link}
								readOnly
							/>
						</div>

						<Button type="submit" size="sm" className="px-3" onClick={setClipboardContents}>
							<span className="sr-only">Copy</span>
							<Copy className="h-4 w-4" />
						</Button>
					</div>
				: null}

				<DialogFooter className="sm:justify-start">
					<DialogClose asChild>
						<Button type="button" variant="secondary">
							Close
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
