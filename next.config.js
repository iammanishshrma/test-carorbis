/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
    reactStrictMode: true,

    //* To import SCSS file to a particular component(instead of using module.css)
    webpack(config) {
        config.module.rules.forEach((rule) => {
            const { oneOf } = rule;
            if (oneOf) {
                oneOf.forEach((one) => {
                    if (!`${one.issuer?.and}`.includes("_app")) return;
                    one.issuer.and = [path.resolve(__dirname)];
                });
            }
        });
        return config;
    },
    distDir: "build",
    images: {
        domains: [
            "sis1037.s3.amazonaws.com",
            "caraorbis.s3.amazonaws.com",
            "caraorbis.s3.ap-south-1.amazonaws.com",
            "sis1037.s3.amazonaws.com",
        ],
    },
};

module.exports = nextConfig;
