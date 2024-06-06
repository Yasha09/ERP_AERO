import "reflect-metadata";
import {DataSource} from "typeorm";

import * as dotenv from "dotenv";
import {User} from "./entity/User.entity";
import {RefreshToken} from "./entity/RefreshToken.entity";
import {File} from "./entity/File.entity";

dotenv.config();

const {MYSQL_DATABASE, MYSQL_HOST, MYSQL_PORT, MYSQL_PASSWORD, MYSQL_USER, NODE_ENV,} =
    process.env;

export const AppDataSource = new DataSource({
    type: "mysql",
    host: MYSQL_HOST,
    port: parseInt(MYSQL_PORT || "3306"),
    username: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,

    synchronize: false,
    logging: NODE_ENV === "dev" ? false : false,
    entities: [User, RefreshToken, File],
    migrations: ["dist/migrations/*{.ts,.js}"],
    migrationsTableName: "custom_migration_table",
    subscribers: [],
});

