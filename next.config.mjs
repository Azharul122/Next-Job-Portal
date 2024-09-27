/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['lh3.googleusercontent.com','firebasestorage.googleapis.com'],
    },
    webpack: (config) => {
      config.module.rules.push({
        test: /\.html$/,
        use: 'html-loader', // You may need to install this via npm
      });
      return config;
    },
  };
  
 export default nextConfig
  