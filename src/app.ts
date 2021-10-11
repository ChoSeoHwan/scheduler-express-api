import express from 'express';

import { afterMiddleware, beforeMiddleware } from '~/config/middleware';
import routes from '~/config/routes';

const app = express();

// set before middleware
beforeMiddleware(app);

// set routes
routes(app);

// set after middleware
afterMiddleware(app);

// start server
app.listen(8001, () => {
    console.log('test');
});
