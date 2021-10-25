import 'source-map-support/register';
import '~/config/dotenvConfig';

import moment from 'moment';

import SchedulerApp from '~/App';
import { currentEnvironment } from '~/constant/environment';
import { PID, PM2_ID } from '~/constant/etc';
import loggerFactory from '~/library/loggerFactory';

const app = new SchedulerApp().getApp();

// 서버 정보 로깅
const serverLogger = loggerFactory('server');

// 서버 시작
const server = app.listen(8001, () => {
    // pm2 graceful reload 를 위해 ready signal 전달
    if (process.send) process.send('ready');

    // 서버 시작 로깅
    serverLogger.write(makeMessage('server started.'));
});

// 프로세스 종료 신호 수신
process.on('SIGINT', () => {
    // SIGINT 로깅
    serverLogger.write(
        makeMessage('SIGINT signal received : try to close server.')
    );

    // 서버 종료
    server.close(() => {
        // 로깅
        serverLogger.write(makeMessage('close server complete.'), () => {
            // 프로세스 종료
            process.exit(0);
        });
    });
});

const makeMessage = (message: string): string => {
    const additionalInfo = [];
    additionalInfo.push(currentEnvironment);
    if (PM2_ID) additionalInfo.push(PM2_ID);
    if (PID) additionalInfo.push(PID);

    let additionalMessage = '';
    if (additionalInfo.length > 0)
        additionalMessage = additionalInfo.reduce<string>(
            (prevText, info) => prevText + `[${info}]`,
            ''
        );

    return `[${moment().format(
        'YYYY-MM-DD HH:mm:ss.SSSS'
    )}]${additionalMessage} ${message}\n`;
};
