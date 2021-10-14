import { RequestHandler } from 'express';
import methodOverride from 'method-override';

const methodOverrideMiddleware = (): RequestHandler[] => {
    return [
        methodOverride('X-HTTP-Method-Override'),
        methodOverride('_method'),
        methodOverride(function (req) {
            if (
                req.body &&
                typeof req.body === 'object' &&
                '_method' in req.body
            ) {
                const method = req.body._method;
                delete req.body._method;
                return method;
            }
        })
    ];
};

export default methodOverrideMiddleware;
