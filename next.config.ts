import createMdx from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
};

const withMdx = createMdx({
  extension: /\.mdx?$/,
});

export default withMdx(nextConfig);
