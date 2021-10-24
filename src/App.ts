import { Application, makeRouter } from '@choseohwan/express-utils';
import cookieParser from 'cookie-parser';
import { json, urlencoded } from 'express';
import helmet from 'helmet';

import errorHandlerMiddleware from '~/middleware/errorHandlerMiddleware';
import methodOverrideMiddleware from '~/middleware/methodOverrideMiddleware';
import morganMiddleware from '~/middleware/morganMiddleware';
import notFoundMiddleware from '~/middleware/notFoundMiddleware';
import IndexRouter from '~/router/IndexRouter';

class SchedulerApp extends Application {
    /**
     * before middleware 세팅
     *
     * @returns {void}
     */
    protected initBeforeMiddleware(): void {
        this.app.use(helmet());

        this.app.use(json());
        this.app.use(urlencoded({ extended: false }));

        this.app.use(cookieParser());

        this.app.use(methodOverrideMiddleware());

        this.app.use(morganMiddleware());
    }

    /**
     * router 세팅
     *
     * @returns {void}
     */
    protected initRouter(): void {
        this.app.use('/', makeRouter(IndexRouter));
    }

    /**
     * after middleware 세팅
     *
     * @returns {void}
     */
    protected initAfterMiddleware(): void {
        this.app.use(notFoundMiddleware);

        this.app.use(errorHandlerMiddleware());
    }
}

export default SchedulerApp;
