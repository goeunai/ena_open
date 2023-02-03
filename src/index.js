import dotenv from 'dotenv';
dotenv.config();

import {PORT} from './common/constants.js';
import express from 'express';
import helmet from 'helmet';
import DataRouter from './router/data.js';
import swaggerFile from './swagger/output/swagger.json' assert { type: "json" };
import swaggerUi from 'swagger-ui-express';

/**
 * App
 */
const app = express();


/**
 * Configuration
 */
app.use(helmet());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile, { explorer: true }));


/**
 * API
 */
app.get("/", (req, res) => {
    res.send(":)");
});
app.use("/api/data", DataRouter);

app.listen(PORT, () => {
    console.log("Running", PORT);
});