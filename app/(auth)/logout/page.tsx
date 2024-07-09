"use client";
import { logoutAction } from "@/lib/actions";
import { useEffect } from "react";

export default function LogoutPage() {

	useEffect(() => {
		const form = document.getElementById('logout');
		(form as HTMLFormElement | null)?.submit();
	}, []);

	return (
		<form action={logoutAction} id="logout"></form>
	);
};
