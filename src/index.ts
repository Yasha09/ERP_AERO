import "reflect-metadata";
import * as dotenv from "dotenv";
import express from 'express';
import YAML from 'yamljs';
import path from 'path';
import swaggerUi from 'swagger-ui-express';


import {AppDataSource} from "./data-source";
import authRouter from "./models/auth/auth.router";
import {errorHandler} from "./errorHandler/errorHandler";
import cookieParser from "cookie-parser";
import userRouter from "./models/users/user.routet";

dotenv.config();

const app = express();
const {PORT = 3000} = process.env;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// Routes
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
            console.log("Server is running on http://localhost:" + PORT);
        });
        console.log("Data Source has been initialized!");
    })
    .catch((error) => console.log("error-------", error));

