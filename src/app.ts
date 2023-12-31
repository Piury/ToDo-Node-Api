import * as fs from "fs";
import morgan from "morgan";
import express, { Express, NextFunction, Request, Response, response } from 'express';
import dotenv from 'dotenv';
import { routes } from "./routes";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger_output.json";
import * as bodyParser from 'body-parser';

dotenv.config();

morgan.token('host', function (req, res) {
  return req.hostname;
});
const app: Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;

app.use(routes);
app.use(morgan(':method :host :status :res[content-length] - :response-time ms', {
  stream: fs.createWriteStream("app.log"),
}))

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.redirect('/api-docs');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

app.listen(port, () => {
});

