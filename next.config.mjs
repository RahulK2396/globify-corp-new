/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // Enable image optimization for external domains if needed
  images: {
    unoptimized: true, // Keep same behavior as Vite (no server-side image optimization)
  },
  // Ensure trailing slashes match your current behavior
  trailingSlash: false,
};

export default nextConfig;