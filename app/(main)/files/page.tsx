import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { FileView } from "@/components/blocks/fileview";

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
						<BreadcrumbPage>Files</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<div className="flex items-center">
				<h1 className="text-lg font-semibold md:text-2xl">Files</h1>
			</div>

			<div className="border shadow-lg rounded-lg">
				<FileView />
			</div>
		</>
	)
}
