/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'raw.githubusercontent.com', 
      'images.unsplash.com',
      'plus.unsplash.com',
      'source.unsplash.com',
      'www.ohiotechnews.com',
      'www.marketsandmarkets.com',
      'www.protolabs.com',
      'www.ibisworld.com',
      'www.digitalc.org',
      'www.pwc.com',
      'www.g42.ai',
      'explodingtopics.com',
      'edgedelta.com',
      '3dprintingindustry.com',
      '3dprint.com',
      'www.hoffleigh.com'
    ],
  },
};

module.exports = nextConfig; 