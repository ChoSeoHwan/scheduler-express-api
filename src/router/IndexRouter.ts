import { RestApiRouter } from '@choseohwan/express-utils';
import { HTTPMethod } from '@choseohwan/utils/constant';
import { Request, Response } from 'express';

class IndexRouter extends RestApiRouter {
    protected index(req: Request, res: Response): void {
        res.json({
            message: 'index te'
        });
    }

    protected show(req: Request, res: Response): void {
        res.json({
            message: 'show',
            params: req.params
        });
    }

    protected store(req: Request, res: Response): void {
        res.json({
            message: 'store'
        });
    }

    protected update(req: Request, res: Response): void {
        res.json({
            message: 'update',
            params: req.params
        });
    }

    protected delete(req: Request, res: Response): void {
        res.json({
            message: 'delete',
            params: req.params
        });
    }

    @RestApiRouter.registerRouter(HTTPMethod.GET, '/custom')
    protected custom(req: Request, res: Response): void {
        res.json({
            message: 'custom'
        });
    }
}

export default IndexRouter;
