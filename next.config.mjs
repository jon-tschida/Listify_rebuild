/** @type {import('next').NextConfig} */
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
};

export default nextConfig;
