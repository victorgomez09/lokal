import { SHA256 } from "crypto-js";
import prisma from "./prisma";
import { Prisma } from "@prisma/client";
import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from "jose";

export type Credentials = {
	email: string;
	password: string;
};

export type NewUser = {
	email: string;
	password: string;
	name: string;
	rootDir: string;
	role: string;
};

export type User = {
	id: string;
	name: string;
	email: string;
	password?: string;
	createdAt: Date,
	updatedAt: Date,
	role: string,
};

// Todo: Generate this on start (?) and store in .env file (?) or maybe somewhere in the process
const sessionKeySecret = "94F20455ADC1C4265A987450D5C96EDBC8E551C4E90A232D419AB095827AE214";

export const hashPassword = (string: string): string => {
	return SHA256(string).toString();
}

export const signIn = async (credentials: Credentials): Promise<User> => {
	const user = await prisma.user.findUnique({
		where: {
			email: credentials.email,
			password: hashPassword(credentials.password)
		},
		select: {
			id: true,
			name: true,
			email: true,
			createdAt: true,
			updatedAt: true,
			password: false,
			role: true,
		},
	});

	if (user) {
		const session = await createSession(user);
		return user;
	}

	throw new Error('Invalid credentials');
};

export const createUser = async (user: NewUser) => {
	const { password } = user;

	if (password.length < 6) {
		throw new Error("password length should be more than 6 characters");
	}

	try {
		const newUser = await prisma.user.create({
			data: { ...user, password: hashPassword(password) },
		});

		const session = await createSession(newUser);

		return newUser;
	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			throw new Error(e.message);
		}
	}
};

export const createSession = async (user: User) => {
	const expires = new Date(Date.now() + (60 * 60 * 24 * 7)); // Set session expiration time (1 week from now)
	const session = await encrypt({ user, expires }); // Encrypt user data and set expiration time

	// Save the session in a cookie
	cookies().set("session", session, { expires, httpOnly: true }); // Set session cookie with expiration time and HTTP only flag

	return session;
};

export const getCurrentSession = async () => {
	const encryptedSessionData = cookies().get('session')?.value;
	if (encryptedSessionData != null) {
		const session = await decrypt(encryptedSessionData);
		return session;
	}

	return null;
}

export const destroyCurrentSession = () => {
	// Destroy the session by clearing the session cookie
	cookies().set("session", "", { expires: new Date(0) });
};

const encrypt = async (payload: any) => {
	const key = new TextEncoder().encode(sessionKeySecret);
	return await new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("1 week")
		.sign(key);
};

const decrypt = async (input: string) => {
	const key = new TextEncoder().encode(sessionKeySecret);
	const { payload } = await jwtVerify(input, key, {
		algorithms: ["HS256"],
	});

	return payload;
};
