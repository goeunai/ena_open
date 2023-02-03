import dotenv from 'dotenv';
dotenv.config();

import {PORT} from './common/constants.js';
import express from 'express';
import helmet from 'helmet';
import DataRouter from './routes/data.js';
import swaggerFile from './swagger/output/swagger.json' assert { type: "json" };
import swaggerUi from 'swagger-ui-express';
import bodyParser from "body-parser";


/**
 * App
 */
const app = express();

/**
 * Configuration
 */
app.use(helmet());
app.use(bodyParser.json())
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile, { explorer: true }));


/**
 * API
 */
app.get("/", (req, res) => {
    // #swagger.tags = ['Home']
    res.send("Ok");
});
app.use("/api/data", DataRouter);

app.listen(PORT, () => {
    console.log("Running", PORT);
});