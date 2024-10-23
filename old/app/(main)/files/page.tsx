import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/old/components/ui/breadcrumb"
import { FileView } from "@/old/components/blocks/fileview";
import { getServerName } from "@/old/lib/actions";

export default async function Home() {
	const server_name = getServerName();

	return (
		<>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/">{server_name}</BreadcrumbLink>
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
