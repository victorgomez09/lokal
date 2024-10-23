import { NewUserDialog } from "@/old/components/blocks/newuserdialog";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/old/components/ui/breadcrumb"
import { Button } from "@/old/components/ui/button";
import { Card } from "@/old/components/ui/card";
import { Input } from "@/old/components/ui/input";
import { Label } from "@/old/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/old/components/ui/table";
import { getServerSettings, getServerUsers, saveServerSettings } from "@/old/lib/actions";
import { Pen } from "lucide-react";

export default async function Settings() {
	const settings = await getServerSettings();
	const users = await getServerUsers();

	return (
		<>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/">Skurt</BreadcrumbLink>
					</BreadcrumbItem>

					<BreadcrumbSeparator>/</BreadcrumbSeparator>

					<BreadcrumbItem>
						<BreadcrumbPage>Settings</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<div className="flex items-center">
				<h1 className="text-lg font-semibold md:text-2xl">Settings</h1>
			</div>

			<div className="space-y-8">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
					<div>
						<h2 className="text-base font-semibold md:text-lg mb-4">Server settings</h2>
						<p className="text-sm">
							General server settings. (Only visible for owner)
						</p>
					</div>

					<Card className="col-span-2 p-4">
						<form className="grid gap-4" action={saveServerSettings}>
							<div className="grid gap-2">
								<Label htmlFor="server-name">Server Name</Label>
								<Input
									id="server-name"
									name="server-name"
									placeholder="Big NAS"
									defaultValue={settings.serverName}
								/>
							</div>

							<div className="flex">
								<Button className="ml-auto">Save settings</Button>
							</div>
						</form>
					</Card>
				</div>


				<div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
					<div>
						<h2 className="text-base font-semibold md:text-lg mb-4">Users</h2>
						<p className="text-sm">
							Manage users. (Only visible for admins)
						</p>
					</div>

					<Card className="col-span-2">
						<div className="p-4">
							<h2 className="text-base font-semibold md:text-lg">Users</h2>
						</div>

						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Name</TableHead>
									<TableHead>Email</TableHead>
									<TableHead>Role</TableHead>
									<TableHead>Base Directory</TableHead>
								</TableRow>
							</TableHeader>

							<TableBody>
								{users.map((user) => {
									return (
										<TableRow key={user.id}>
											<TableCell style={{ height: 49 }}>
												<div className="flex items-center gap-2">
													<Pen className="h-4 w-4 text-muted-foreground cursor-pointer" />

													{user.name}
												</div>
											</TableCell>

											<TableCell>{user.email}</TableCell>
											<TableCell>
												{user.role == 'O' ? 'Owner' : null}
												{user.role == 'A' ? 'Admin' : null}
												{user.role == 'U' ? 'User' : null}
											</TableCell>
											<TableCell>{user.rootDir}</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>

						<div className="p-4 flex">
							<NewUserDialog>
								<Button className="ml-auto">Add user</Button>
							</NewUserDialog>
						</div>
					</Card>
				</div>
			</div>
		</>
	);
}