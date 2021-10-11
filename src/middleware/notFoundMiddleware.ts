import { Request, Response } from 'express';

const notFoundMiddleware = (req: Request, res: Response): void => {
    res.status(404).json({
        message: 'not found page',
        status: 404
    });
};

export default notFoundMiddleware;
