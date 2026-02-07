import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sprint-fe-project.s3.ap-northeast-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },

  async rewrites() {
    return {
      // fallback은 파일 시스템 라우트와 동적 라우트 확인 후 적용됨
      fallback: [
        {
          source: "/api/:path*",
          destination: "https://sp-globalnomad-api.vercel.app/20-2/:path*",
        },
      ],
    };
  },
};

export default nextConfig;
