import Link from "next/link";
import { Input } from "@/components/ui/input"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { getCurrentUser, getServerName, logoutAction } from "@/lib/actions";

export const Header = async () => {
	const server_name = await getServerName();
	const current_user = await getCurrentUser();

	return (
		<header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
			<Sheet>
				<SheetTrigger asChild>
					<Button variant="outline" size="icon" className="shrink-0 md:hidden">
						<MenuIcon className="h-5 w-5" />
						<span className="sr-only">Toggle navigation menu</span>
					</Button>
				</SheetTrigger>

				<SheetContent side="left" className="flex flex-col">
					<nav className="grid gap-2 text-lg font-medium">
						<Link href="#" className="flex items-center gap-2 text-lg font-semibold" prefetch={false}>
							<Package2Icon className="h-6 w-6" />
							<span className="sr-only">{server_name}</span>
						</Link>

						<Link
							href="#"
							className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-primary hover:text-foreground hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50"
							prefetch={false}
						>
							<HomeIcon className="h-5 w-5" />
							Dashboard
						</Link>

						<Link
							href="#"
							className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-primary hover:text-foreground hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50"
							prefetch={false}
						>
							<FileIcon className="h-5 w-5" />
							Files
						</Link>

						<Link
							href="#"
							className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-primary hover:text-foreground hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50"
							prefetch={false}
						>
							<UsersIcon className="h-5 w-5" />
							Shared with me
						</Link>

						<Link
							href="#"
							className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-primary hover:text-foreground hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50"
							prefetch={false}
						>
							<PinIcon className="h-5 w-5" />
							Pins
						</Link>

						<Separator className="my-2" />

						<div className="mx-[-0.65rem] px-3 text-lg font-medium text-muted-foreground">Tags</div>

						<Link
							href="#"
							className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
							prefetch={false}
						>
							<TagIcon className="h-5 w-5" />
							Photos May
						</Link>
						<Link
							href="#"
							className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
							prefetch={false}
						>
							<TagIcon className="h-5 w-5" />
							Important work
						</Link>
					</nav>
				</SheetContent>
			</Sheet>

			<div className="w-full flex-1">
				<form>
					<div className="relative">
						<SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							type="search"
							placeholder="Search files..."
							className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
						/>
					</div>
				</form>
			</div>

			<div className="ml-auto flex items-center gap-2">
				<Button variant="secondary" size="icon" className="rounded-full">
					<BellIcon className="h-5 w-5" />
					<span className="sr-only">Toggle notifications</span>
				</Button>

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="secondary" size="icon" className="rounded-full">
							<CircleUserIcon className="h-5 w-5" />
							<span className="sr-only">Toggle user menu</span>
						</Button>
					</DropdownMenuTrigger>

					<DropdownMenuContent align="end">
						<DropdownMenuLabel>{current_user.name}</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<Link href="/settings">
								Settings
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>Support</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							Logout
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	);
}

function BellIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
			<path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
		</svg>
	)
}

function CircleUserIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<circle cx="12" cy="12" r="10" />
			<circle cx="12" cy="10" r="3" />
			<path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
		</svg>
	)
}

function MenuIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<line x1="4" x2="20" y1="12" y2="12" />
			<line x1="4" x2="20" y1="6" y2="6" />
			<line x1="4" x2="20" y1="18" y2="18" />
		</svg>
	)
}

function MoveHorizontalIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<polyline points="18 8 22 12 18 16" />
			<polyline points="6 8 2 12 6 16" />
			<line x1="2" x2="22" y1="12" y2="12" />
		</svg>
	)
}

function SearchIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<circle cx="11" cy="11" r="8" />
			<path d="m21 21-4.3-4.3" />
		</svg>
	)
}

function FileIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
			<path d="M14 2v4a2 2 0 0 0 2 2h4" />
		</svg>
	)
}


function FolderIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
		</svg>
	)
}


function HomeIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
			<polyline points="9 22 9 12 15 12 15 22" />
		</svg>
	)
}


function Package2Icon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
			<path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
			<path d="M12 3v6" />
		</svg>
	)
}


function PinIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<line x1="12" x2="12" y1="17" y2="22" />
			<path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z" />
		</svg>
	)
}

function TagIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
			<circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
		</svg>
	)
}

function UsersIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
			<circle cx="9" cy="7" r="4" />
			<path d="M22 21v-2a4 4 0 0 0-3-3.87" />
			<path d="M16 3.13a4 4 0 0 1 0 7.75" />
		</svg>
	)
}
