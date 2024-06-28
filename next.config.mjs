/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.ctfassets.net',
                port: '',
                pathname: '/**'
            }
        ]
    },
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [{
                    key: 'X-Frame-Options',
                    value: 'SAMEORIGIN'
                }, {
                    key: 'Contentful-Security-Policy',
                    value: `frame-ancestors 'self' https://app.contentful.com`
                }]
            }
        ]
    }
};

export default nextConfig;
