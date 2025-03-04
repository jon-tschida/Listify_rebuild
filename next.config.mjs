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
                        value: "default-src 'self'; connect-src 'self' https://api.edamam.com; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
