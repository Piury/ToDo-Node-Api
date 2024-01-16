import express from 'express';
import { UserRouter } from './users.routes';
import { ProjectRouter } from './project.routes';
import { TaskRouter } from './task.routes';
import bodyParser from 'body-parser';



export const routes = express.Router();

routes.use(bodyParser.json());
routes.use(bodyParser.urlencoded({ extended: false }));

routes.use('/api/', UserRouter);
routes.use('/api/', ProjectRouter);
routes.use('/api/', TaskRouter);