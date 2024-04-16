module.exports = {
  apps: [
    {
      name: 'nestjs',
      script: 'dist/main.js',
      instances: 1,  // 根据需求设置实例数量
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'prod',
      },
    },
  ],
};