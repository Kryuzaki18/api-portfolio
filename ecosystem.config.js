module.exports = {
  apps: [
    {
      name: "api-portfolio",
      script: "./src/app.js",
      instances: "1",
      exec_mode: "cluster",
      autorestart: true,
      watch: false,
      time: true,
      env: {
        NODE_ENV: "production",
      },
      env_development: {
        NODE_ENV: "development",
      },
    },
  ],
};
