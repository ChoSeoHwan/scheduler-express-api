import moment from 'moment';
import rfs, { Generator } from 'rotating-file-stream';

import { LOG_PATH } from '~/constant/etc';

const getLogger = (loggerName: string): ReturnType<typeof rfs.createStream> => {
    const fileNameGenerator: Generator = (time, index) =>
        time
            ? `${loggerName}.${moment(time).format('YYYYMMDD')}.${index}.log`
            : `${loggerName}.log`;

    return rfs.createStream(fileNameGenerator, {
        interval: '1d',
        path: LOG_PATH
    });
};

export default getLogger;
