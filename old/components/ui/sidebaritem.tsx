"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/old/lib/utils";

export const SidebarItem = ({ href, children }: { href: string, children: any }) => {
	const pathname = usePathname();

	return (
		<Link
			href={href}
			className={cn(
				"flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all",
				{
					"hover:bg-muted hover:text-primary": pathname != href,
					"bg-rose-500 hover:bg-rose-600 text-gray-50 hover:text-white": pathname == href,
				},
			)}
			prefetch={false}
		>
			{children}
		</Link>
	);
};