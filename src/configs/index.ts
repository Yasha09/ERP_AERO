import 'dotenv/config';


// TODO: implement type checking for .env fields
const PORT: number = Number(process.env.PORT) || 8080;

const APP_BASE_URL: string = process.env.APP_BASE_URL || 'http://localhost:3000';

const JWT_SECRET: string = process.env.JWT_SECRET || 'SomePrivateKey';

const JWT_EXPIRATION_DATE: string = process.env.JWT_EXPIRATION_DATE as string;

const REFRESH_TOKEN_EXPIRATION_DATE: string = process.env.REFRESH_TOKEN_EXPIRATION_DATE as string;

const REFRESH_TOKEN_SECRET:string= process.env.REFRESH_TOKEN_SECRET as string;


export default {
    PORT,
    JWT_SECRET,
    JWT_EXPIRATION_DATE,
    REFRESH_TOKEN_EXPIRATION_DATE,
    REFRESH_TOKEN_SECRET
};
