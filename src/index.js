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
import compression from 'compression';
import dayjs from "dayjs";

/**
 * App
 */
const app = express();
const now = dayjs().format("YYYY-MM-DD HH:mm");

/**
 * Configuration
 */
Sentry.init({
    environment: process.env.NODE_ENV,
    dsn: process.env.SENTRY_DSN,
    integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Tracing.Integrations.Express({ app }),
    ],
    tracesSampleRate: 1.0,
});

app.use(compression());
app.use(helmet());
app.use(bodyParser.json({limit: '10000mb'}));
app.use(bodyParser.urlencoded({limit: '10000mb', extended: false}));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile, {explorer: true}));

/**
 * API
 */
app.get("/", (req, res) => {
    // #swagger.tags = ['Home']
    console.log(process.env.NODE_ENV);
    res.send(`Ok : ${now}`);
});
app.use("/api/data", DataRouter);

app.listen(PORT, () => {
    console.log("Running", PORT);
});

app.timeout = 300 * 1000;