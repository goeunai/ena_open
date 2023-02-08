import dotenv from 'dotenv';
dotenv.config();

import {PORT} from './common/constants.js';
import express from 'express';
import helmet from 'helmet';
import DataRouter from './routes/data.js';
import swaggerFile from './swagger/output/swagger.json' assert { type: "json" };
import swaggerUi from 'swagger-ui-express';
import bodyParser from "body-parser";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import {httpsOnly} from "./middleware/httpsOnly.js";
import compression from 'compression';

/**
 * App
 */
const app = express();

/**
 * Configuration
 */
Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Tracing.Integrations.Express({ app }),
    ],
    tracesSampleRate: 1.0,
});

app.use(compression());
app.use(httpsOnly);
app.use(helmet());
app.use(bodyParser.json())
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile, { explorer: true }));

/**
 * API
 */
app.get("/", (req, res) => {
    // #swagger.tags = ['Home']
    console.log(process.env.NODE_ENV);
    res.send("Ok");
});
app.use("/api/data", DataRouter);

app.listen(PORT, () => {
    console.log("Running", PORT);
});