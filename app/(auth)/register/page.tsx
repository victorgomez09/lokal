import { registerAction } from "@/lib/actions"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Register() {
	return (
		<div className="w-full h-full flex items-center justify-center">
			<Card className="mx-auto max-w-sm">
				<CardHeader>
					<CardTitle className="text-xl">Sign Up</CardTitle>
					<CardDescription>
						Welcome! Begin by filling in your details below
					</CardDescription>
				</CardHeader>

				<CardContent>
					<form action={registerAction}>
						<div className="grid gap-4">
							<div className="grid grid-cols-2 gap-4">
								<div className="grid gap-2">
									<Label htmlFor="first-name">First name</Label>
									<Input name="first-name" placeholder="Max" required />
								</div>

								<div className="grid gap-2">
									<Label htmlFor="last-name">Last name</Label>
									<Input name="last-name" placeholder="Robinson" required />
								</div>
							</div>

							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									name="email"
									type="email"
									placeholder="m@example.com"
									required
								/>
							</div>

							<div className="grid gap-2">
								<Label htmlFor="password">Password</Label>
								<Input name="password" type="password" />
							</div>

							<Button type="submit" className="w-full">
								Create an account
							</Button>
						</div>
					</form>

					<div className="mt-4 text-center text-sm">
						Already have an account?{" "}
						<Link href="/login" className="underline">
							Sign in
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
