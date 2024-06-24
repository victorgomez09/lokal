import { NewUserDialog } from "@/components/blocks/newuserdialog";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getServerSettings, getServerUsers, saveServerSettings } from "@/lib/actions";
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

			<div className="space-y-6">
				<Card className="max-w-2xl p-4">
					<h2 className="text-base font-semibold md:text-lg mb-4">General settings</h2>

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

				<Card className="max-w-2xl">
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
		</>
	);
}