import cookieParser from 'cookie-parser';
import { json, urlencoded } from 'express';
import helmet from 'helmet';

import Application from '~/libs/Application';
import errorHandlerMiddleware from '~/middleware/errorHandlerMiddleware';
import methodOverrideMiddleware from '~/middleware/methodOverrideMiddleware';
import notFoundMiddleware from '~/middleware/notFoundMiddleware';
import IndexRouter from '~/router/IndexRouter';

class SchedulerApp extends Application {
    /**
     * router 세팅
     *
     * @returns {void}
     */
    protected initRouter(): void {
        this.app.use('/', IndexRouter.makeRouter());
    }

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
    }

    /**
     * after middleware 세팅
     *
     * @returns {void}
     */
    protected initAfterMiddleware(): void {
        this.app.use(notFoundMiddleware);

        this.app.use(errorHandlerMiddleware);
    }
}

export default SchedulerApp;
