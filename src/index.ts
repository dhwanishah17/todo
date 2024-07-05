/**
 * Required External Modules
 */
import * as dotenv from 'dotenv';
import express, { Express } from 'express';
import { json, urlencoded } from 'body-parser';
import routes from './routes';
import { logger } from './logger/Logger';
import { environment } from './config';
import { errorHandlerMiddleware, responseHandling } from './middleware';

dotenv.config();

/**
 * App Variables
 */
if (!environment.port) {
  process.exit(1);
}

const PORT: number = environment.port || 3000;

const app: Express = express();
// app.use(cors({
//   optionsSuccessStatus: 200
// }));
app.use(urlencoded({
  extended: true
}));
app.use(json());
app.use(responseHandling);

app.use('/api/v1', routes);
app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  logger.info(`👍 Server successfully started at port ${PORT}`);
});
export default app;
