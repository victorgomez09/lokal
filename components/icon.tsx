"use client";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as eva from 'eva-icons';
import React, { useEffect } from "react";

interface IconProps extends React.ComponentProps<'i'> {
	name: string;
};

export const Icon = ({ name, ...rest }: IconProps) => {
	useEffect(() => {
		eva.replace();
	}, []);

	return (
		<i data-eva={name} {...rest} />
	);
};
