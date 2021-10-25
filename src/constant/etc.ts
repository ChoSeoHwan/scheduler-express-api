import path from 'path';

export const LOG_PATH = path.resolve(process.env.LOG_PATH || './logs');
export const PM2_ID = process.env.pm_id;
export const PID = process.pid;
