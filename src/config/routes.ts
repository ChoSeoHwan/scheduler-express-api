import express from 'express';

import Index from '~/router/index';

const routes = (app: ReturnType<typeof express>): void => {
    app.use('/', Index);
};

export default routes;
