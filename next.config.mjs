/** @type {import('next').NextConfig} */
import webpack from 'webpack';

const nextConfig = {
	webpack: (config, { isServer }) => {
		config.plugins.push(
			new webpack.IgnorePlugin({
				resourceRegExp: /^data\//, // Ignore all files under the 'data' directory
			})
		);
		return config;
	},
};

export default nextConfig;
