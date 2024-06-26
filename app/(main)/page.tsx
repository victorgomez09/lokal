import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb"

export default async function Home() {
	return (
		<>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/">Skurt</BreadcrumbLink>
					</BreadcrumbItem>

					<BreadcrumbSeparator>/</BreadcrumbSeparator>

					<BreadcrumbItem>
						<BreadcrumbPage>Dashboard</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<div className="flex flex-col">
				<h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
			</div>
		</>
	)
}
