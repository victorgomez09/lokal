"use client";

import { useState } from "react";

export default function Login() {
	const [error, setError] = useState<string | null>(null);
	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.target as any);
		await authenticateAction(formData).catch((error: Error) => {
			setError(error.message);
		});
	};

	return (
		<div className="min-w-full min-h-full flex items-center justify-center py-6 overflow-auto">
			<Card className="w-full max-w-sm">
				<CardHeader>
					<CardTitle className="text-2xl">Login</CardTitle>
					<CardDescription>Enter your email below to login to your account.</CardDescription>
				</CardHeader>

				<form onSubmit={onSubmit}>
					<CardContent className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input name="email" type="email" placeholder="m@example.com" required />
						</div>

						<div className="grid gap-2">
							<Label htmlFor="password">Password</Label>
							<Input name="password" type="password" required />
						</div>
					</CardContent>

					<CardFooter className="flex-col">
						<Button className="w-full">Sign in</Button>
					</CardFooter>
				</form>
			</Card>

			{error ?
				<div className="text-red-500 font-medium mt-2">
					{error}
				</div>
			: null}
		</div>
	);
}
