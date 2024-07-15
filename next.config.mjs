/** @type {import('next').NextConfig} */

const rulesToProcess = [/\.m?js/, /\.(js|cjs|mjs)$/].map(String);
const dirToIgnore = /data/;

const nextConfig = {
	webpack: (config) => {
		config.module.rules = config.module.rules.map((rule) => {
			if (rule !== "..." && rulesToProcess.indexOf(String(rule.test)) > -1) {
				rule.exclude = [dirToIgnore];
			}
			return rule;
		});
		return config;
	},
};

export default nextConfig;
