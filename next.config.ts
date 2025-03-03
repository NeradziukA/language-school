import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        has: [
          {
            type: "cookie",
            key: "lang",
            value: "ka",
          },
        ],
        destination: "/ka",
        permanent: false,
      },
      {
        source: "/",
        has: [
          {
            type: "cookie",
            key: "lang",
            value: "en",
          },
        ],
        destination: "/en",
        permanent: false,
      },
      {
        source: "/",
        has: [
          {
            type: "cookie",
            key: "lang",
            value: "ru",
          },
        ],
        destination: "/ru",
        permanent: false,
      },
      {
        source: "/",
        has: [
          {
            type: "cookie",
            key: "lang",
            value: "fr",
          },
        ],
        destination: "/fr",
        permanent: false,
      },
      {
        source: "/",
        destination: "/en",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
