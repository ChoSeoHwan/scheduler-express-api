import morgan from 'morgan';

import { currentEnvironment, Environment } from '~/constant/environment';
import loggerFactory from '~/library/loggerFactory';

const morganMiddleware = (): ReturnType<typeof morgan>[] => {
    const logger = loggerFactory('access');

    const morganList = [];

    // 기본 로깅
    morganList.push(
        morgan('combined', {
            stream: logger
        })
    );

    // 개발 환경에서는 console 추가
    if (currentEnvironment !== Environment.PRODUCTION) {
        morganList.push(morgan('dev'));
    }

    return morganList;
};

export default morganMiddleware;
