import { Router } from 'express';

import HTTPMethod from '~/constant/HTTPMethod';
import { Handler } from '~/type/express';

export interface RouterPath {
    method: HTTPMethod;
    path: string;
    handler: Handler | undefined;
}

class RestApiRouter {
    private readonly router: ReturnType<typeof Router>;
    private readonly routerPaths: RouterPath[] = [];
    private readonly middleware: Handler[] = [];

    constructor() {
        this.router = Router();

        // 기본 rest api router 세팅
        this.initRestApiRouter();

        // 유저 정의 middleware 추가
        if (this.addMiddleware) this.middleware.push(...this.addMiddleware());

        // middleware 등록
        this.registerMiddleware();

        // 추가 router 등록
        if (this.addRouterPath)
            this.routerPaths.unshift(...this.addRouterPath());

        // router 등록
        this.registerRouter();
    }

    /**
     * router 등록 decorator
     *
     * @param {HTTPMethod} method http method
     * @param {string} path router url path
     * @returns {void}
     */
    public static registerRouter(method: HTTPMethod, path: string) {
        return <T extends Handler>(
            target: RestApiRouter,
            propertyKey: string,
            descriptor: TypedPropertyDescriptor<T>
        ): void => {
            const originalMethod = target.addRouterPath;

            target.addRouterPath = function () {
                let routerPath: RouterPath[] = [];
                if (originalMethod) {
                    routerPath = originalMethod.apply(this);
                }

                routerPath.push({ method, path, handler: descriptor.value });
                return routerPath;
            };
        };
    }

    /**
     * middleware 등록 decorator
     *
     * @param {RestApiRouter} target decorator target (RestApiRouter)
     * @param {string} propertyKey property key
     * @param {TypedPropertyDescriptor} descriptor 등록하고자 하는 함수
     * @returns {void}
     */
    public static registerMiddleware<T extends Handler>(
        target: RestApiRouter,
        propertyKey: string,
        descriptor: TypedPropertyDescriptor<T>
    ): void {
        const originalMethod = target.addMiddleware;

        target.addMiddleware = function () {
            let middleware: Handler[] = [];
            if (originalMethod) {
                middleware = originalMethod.apply(this);
            }

            if (descriptor.value) middleware.push(descriptor.value);
            return middleware;
        };
    }

    /**
     * router 생성 및 전달
     *
     * @returns {ReturnType<typeof Router>} 생성된 router
     */
    public static makeRouter(): ReturnType<typeof Router> {
        const instance = new this();
        return instance.router;
    }

    /**
     * 기본 rest api router 세팅
     *
     * @returns {void}
     */
    private initRestApiRouter(): void {
        this.routerPaths.push(
            { method: HTTPMethod.GET, path: '/', handler: this.index },
            { method: HTTPMethod.GET, path: '/:id', handler: this.show },
            { method: HTTPMethod.POST, path: '/', handler: this.store },
            { method: HTTPMethod.PATCH, path: '/:id', handler: this.update },
            { method: HTTPMethod.DELETE, path: '/:id', handler: this.delete }
        );
    }

    /**
     * middleware 등록
     *
     * @returns {void}
     */
    private registerMiddleware(): void {
        this.middleware.forEach((middleware) => {
            this.router.use(middleware);
        });
    }

    /**
     * router 등록
     *
     * @returns {void}
     */
    private registerRouter(): void {
        this.routerPaths.forEach(({ method, path, handler }) => {
            // 실제 함수가 없을 경우 다음 router 등록
            if (!handler) return true;

            switch (method) {
                case 'GET':
                    this.router.get(path, handler);
                    break;

                case 'POST':
                    this.router.post(path, handler);
                    break;

                case 'PUT':
                    this.router.put(path, handler);
                    break;

                case 'PATCH':
                    this.router.patch(path, handler);
                    break;

                case 'DELETE':
                    this.router.delete(path, handler);
                    break;

                default:
            }
        });
    }

    /**
     * middleware 추가
     *
     * @returns {Handler[]}
     */
    protected addMiddleware?(): Handler[];

    private addRouterPath?(): RouterPath[];

    // 기본 rest api function
    protected index?(...args: Partial<Parameters<Handler>>): void;
    protected show?(...args: Partial<Parameters<Handler>>): void;
    protected store?(...args: Partial<Parameters<Handler>>): void;
    protected update?(...args: Partial<Parameters<Handler>>): void;
    protected delete?(...args: Partial<Parameters<Handler>>): void;
}

export default RestApiRouter;
