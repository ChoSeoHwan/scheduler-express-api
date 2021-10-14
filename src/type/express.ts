import { ErrorRequestHandler, RequestHandler } from 'express';

export type Handler = RequestHandler | ErrorRequestHandler;
