
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';

import './config';

import { errorHandler } from './middlewares';

import {
    metarRouter,
} from './routes';

import {
    loggerMiddleware,
} from './middlewares';

const app = express();

app.set('json spaces', 4);
app.disable('etag');
app.use(cors());

if (process.env.NODE_ENV === 'development') {
    app.use(logger('dev'));
}

app.use(bodyParser.json({ limit: '50mb', extended: false, type: 'application/json' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false, parameterLimit: 50000 }));

app.get('/api/v1/health', (_, res) => res.status(200).json({ message: 'Greetings from Docker-Compose!' }));
app.use('/api/v1/metar', metarRouter);


app.use(loggerMiddleware);
app.use(errorHandler);


export default app;
