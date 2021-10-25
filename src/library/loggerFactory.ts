import moment from 'moment';
import rfs, { Generator, Options } from 'rotating-file-stream';

import { LOG_PATH } from '~/constant/etc';

interface LoggerDefined {
    name?: string;
    options?: Options;
    generator?: Generator | string;
}

// logger 정의
export type LoggerNames = 'access' | 'server' | 'error';
const loggerList: Record<LoggerNames, LoggerDefined> = {
    access: {},
    server: {
        name: 'server-info'
    },
    error: {}
};

/**
 * logger stream 생성
 *
 * @param {LoggerNames} loggerName 로거 이름
 * @returns {ReturnType<typeof rfs.createStream>} logger stream
 */
const loggerFactory = (
    loggerName: LoggerNames
): ReturnType<typeof rfs.createStream> => {
    const { name, generator, options } = loggerList[loggerName];

    // logger name 세팅
    const customLoggerName = name || loggerName;

    // generator 세팅
    let fileNameGenerator: Generator | string = (time, index) =>
        time
            ? `${customLoggerName}.${moment(time).format(
                  'YYYYMMDD'
              )}.${index}.log`
            : `${customLoggerName}.log`;
    fileNameGenerator = generator || fileNameGenerator;

    // logger stream 생성
    return rfs.createStream(fileNameGenerator, {
        interval: '1d',
        path: LOG_PATH,
        ...options
    });
};

export default loggerFactory;
