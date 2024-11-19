/** @type {import('next').NextConfig} */
/*
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'edamam-product-images.s3.amazonaws.com',
                port: '',
                pathname: '/web-img/**',
            },
        ],
    },
    env: {
        API_KEY: process.env.API_KEY,
      }
};

export default nextConfig;
*/
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'edamam-product-images.s3.amazonaws.com',
                port: '',
                pathname: '/web-img/**',
            },
        ],
    },
    env: {
        API_KEY: process.env.API_KEY,
    },
    async headers() {
        return [
            {
                source: "/(.*)", // Match all routes
                headers: [
                    {
                        key: "Content-Security-Policy",
                        value: "frame-ancestors: https://app.mutinyhq.com; script-src: https://*.mutinycdn.com; img-src: https://*.mutinycdn.com; connect-src: https://*.mutinyhq.com, https://*.mutinyhq.io, https://*.mutinycdn.com;",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
