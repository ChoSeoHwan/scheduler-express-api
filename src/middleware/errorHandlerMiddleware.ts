import { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';

import { currentEnvironment, Environment } from '~/constant/environment';
import HttpError from '~/error/HttpError';
import loggerFactory from '~/library/loggerFactory';
import { Handler } from '~/type/express';

const errorHandlerMiddleware = (): Handler[] => {
    const logger = loggerFactory('error');

    return [
        // morgan log for error
        (err: Error, req: Request, res: Response, next: NextFunction) => {
            morgan('combined', {
                stream: logger,
                skip: (req: Request, res: Response) => res.statusCode < 500
            })(req, res, () => next(err));
        },
        // detail error log
        (err: Error, req: Request, res: Response, next: NextFunction) => {
            res.on('finish', () => {
                logger.write(`${err.stack}\n`);
            });

            next(err);
        },
        // set error response
        (err: Error, req: Request, res: Response, next: NextFunction) => {
            let status = 500;
            if (err instanceof HttpError) status = err.status;

            let message = 'Something went wrong';
            if (currentEnvironment !== Environment.PRODUCTION)
                message = err.message;

            res.status(status).json({
                message
            });

            next();
        }
    ];
};

export default errorHandlerMiddleware;
