import express from 'express';

abstract class Application {
    protected app;

    constructor() {
        this.app = express();

        // before middleware 세팅
        this.initBeforeMiddleware && this.initBeforeMiddleware();

        // router 세팅
        this.initRouter && this.initRouter();

        // after middleware 세팅
        this.initAfterMiddleware && this.initAfterMiddleware();
    }

    protected initBeforeMiddleware?(): void;
    protected initAfterMiddleware?(): void;
    protected initRouter?(): void;

    /**
     * 서버 시작
     *
     * @param {number} port 포트 번호
     * @param {() => void} callback 실행 시 callback
     * @returns {void}
     */
    public start(port = 8001, callback?: () => void): void {
        this.app.listen(port, callback);
    }
}

export default Application;
