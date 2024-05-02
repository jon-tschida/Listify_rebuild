/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
                port: '',
                pathname: '**',
            },
        ],
        domains:["edamam-product-images.s3.amazonaws.com"]
    },
};

export default nextConfig;
