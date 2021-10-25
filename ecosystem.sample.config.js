module.exports = {
    apps: [
        {
            name: 'scheduler-api',
            script: `./dist/index.js`,
            instances: 0,
            exec_mode: 'cluster',
            wait_ready: true,
            listen_timeout: 30000,
            kill_timeout: 10000
        }
    ]
}