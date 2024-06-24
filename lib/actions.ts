'use server';

import { redirect } from "next/navigation";
import { signIn, createUser, destroyCurrentSession } from "./user";
import { revalidatePath } from "next/cache";
import prisma from "./prisma";

export async function authenticateAction(formData: FormData) {
	const user = await signIn({
		email: formData.get('email')?.toString() ?? '',
		password: formData.get('password')?.toString() ?? '',
	}).catch((error) => {
		throw new Error(error);
	});

	console.log('login user', user);

	if (user) {
		redirect('/');
	}

	return user;
};

export async function registerAction(formData: FormData) {
	console.log('REGISTER ACTION', formData);
	const user = await createUser({
		email: formData.get('email')?.toString() ?? '',
		password: formData.get('password')?.toString() ?? '',
		name: (formData.get('first-name')?.toString() ?? '') + ' ' + (formData.get('last-name')?.toString() ?? ''),
	}).catch((error) => {
		console.log('auth error', error);
	});

	if (user) {
		redirect('/');
	}

	revalidatePath('/register');

	return user;
};

export async function saveServerSettings(formData: FormData) {
	await prisma.setting.upsert({
		where: { id: 'server-name' },
		update: { value: formData.get('server-name')?.toString() ?? '' },
		create: {
			id: 'server-name',
			value: formData.get('server-name')?.toString() ?? '',
		},
	});

	revalidatePath('/settings');

	return true;
};

export async function getServerSettings() {
	const response = {
		serverName: '',
	};

	await prisma.setting.findUnique({
		where: { id: 'server-name' },
	}).then((setting) => response['serverName'] = setting?.value ?? '' );

	return response;
};

export async function getServerUsers() {
	const users = await prisma.user.findMany({
		select: {
			id: true,
			name: true,
			email: true,
			rootDir: true,
			role: true,
			createdAt: true,
			updatedAt: true,
		}
	});

	console.log('users', users);

	return users;
};

export async function logoutAction() {
	destroyCurrentSession();
	redirect('/login');
};

export async function getServerName() {
	const name = await prisma.setting.findUnique({
		where: {
			id: 'server-name',
		},
	});

	return name?.value ?? '';
};

