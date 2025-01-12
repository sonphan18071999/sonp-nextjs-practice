import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    env:{
        API_FAKE_SERVER:process.env.API_FAKE_SERVER
    }
};

export default nextConfig;
