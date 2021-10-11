import { Request, Response } from 'express';

import HttpException from '~/exception/HttpException';

const errorHandlerMiddleware = (
    err: HttpException,
    req: Request,
    res: Response
): void => {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';

    res.status(status).json({
        status,
        message
    });
};

export default errorHandlerMiddleware;
