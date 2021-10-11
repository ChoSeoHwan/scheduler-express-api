import cookieParser from 'cookie-parser';
import express, { json, urlencoded } from 'express';
import helmet from 'helmet';

import errorHandlerMiddleware from '~/middleware/errorHandlerMiddleware';
import notFoundMiddleware from '~/middleware/notFoundMiddleware';

export const beforeMiddleware = (app: ReturnType<typeof express>): void => {
    app.use(helmet());

    app.use(json());
    app.use(urlencoded({ extended: false }));

    app.use(cookieParser());
};

export const afterMiddleware = (app: ReturnType<typeof express>): void => {
    app.use(notFoundMiddleware);

    app.use(errorHandlerMiddleware);
};
