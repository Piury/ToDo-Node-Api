import express from 'express';
import { UserRouter } from './users.routes';

export const routes = express.Router();
routes.use('/api', UserRouter);