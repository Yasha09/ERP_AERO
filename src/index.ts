import "reflect-metadata";
import * as dotenv from "dotenv";
import express from 'express';
import YAML from 'yamljs';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';

import {AppDataSource} from "./data-source";
import authRouter from "./models/auth/auth.router";
import {errorHandler} from "./errorHandler/errorHandler";
import cookieParser from "cookie-parser";
import userRouter from "./models/users/user.routet";
import fileRouter from "./models/files/file.router";
import {logger} from "./common/logger/winston";

dotenv.config();

const app = express();
const {PORT = 3000} = process.env;


const corsOptions = {
    origin: '*', // Allow access from any domain
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};

app.use(cors(corsOptions));

// Middlewares
app.use(express.json({limit: "20mb"}));
app.use(express.urlencoded({limit: "20mb", extended: true}));
app.use(cookieParser());

// Routes
app.use('/api/file', fileRouter);
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

// Global error handler
app.use(errorHandler)

// Swagger
const swaggerDocument = YAML.load(path.resolve(__dirname, '../swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

AppDataSource.initialize()
    .then(async () => {
        app.listen(PORT, () => {
            logger.info("Server is running on http://localhost:" + PORT);
        });
        logger.info("Data Source has been initialized!");
    })
    .catch((error) => console.log("error-------", error));

