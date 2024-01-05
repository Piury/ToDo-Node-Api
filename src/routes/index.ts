import express from 'express';
import { UserRouter } from './users.routes';
import bodyParser from 'body-parser';



export const routes = express.Router();

routes.use(bodyParser.json());
routes.use(bodyParser.urlencoded({ extended: false }));

routes.use('/api', UserRouter);