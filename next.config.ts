// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: `${process.env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES}.fly.storage.tigris.dev`,
//         port: '',
//         //pathname: '/**',
//       },
//     ],
//   }
// }
// export default nextConfig;
 /** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nextlms1.fly.storage.tigris.dev',
      },
    ],
  },
};

export default nextConfig;
