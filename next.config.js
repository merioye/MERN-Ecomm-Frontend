/** @type {import('next').NextConfig} */
const nextConfig = {
    // reactStrictMode: true,
    images: {
        domains: [
            "res.cloudinary.com",
            "lh3.googleusercontent.com",
            "z-p3-scontent.flyp6-2.fna.fbcdn.net",
        ],
    },
};

module.exports = nextConfig;
