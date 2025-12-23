/** @type {import('next').NextConfig} */
const isStaticExport = true;
const nextConfig = {
  output: 'export',
  basePath: '/dreamvalian.github.io',
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_STATIC_EXPORT: isStaticExport ? '1' : '0',
    NEXT_PUBLIC_USE_LEGACY_INDEX: '0',
    NEXT_PUBLIC_BASE_PATH: '/dreamvalian.github.io',
  },
};

export default nextConfig;
