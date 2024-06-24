module.exports = {
  apps: [
    {
      name: "PROJECTFINAL",
      script: "serve",
      autorestart: true,
      watch: true,
      env: {
        PM2_SERVE_PATH: "./build",
        PM2_SERVE_PORT: 3000,
        PM2_SERVE_SPA: "true",
        VITE_APP_NODE_ENV: "development",
        NODE_ENV: "development",
      },
    },
  ],
};