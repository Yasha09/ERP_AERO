import 'dotenv/config';


const PORT: number = Number(process.env.PORT) || 8080;

const APP_BASE_URL: string = process.env.APP_BASE_URL || 'http://localhost:3000';

const JWT_SECRET: string = process.env.JWT_SECRET || 'SomePrivateKey';

const JWT_EXPIRATION_DATE: string = process.env.JWT_EXPIRATION_DATE as string;

const REFRESH_TOKEN_EXPIRATION_DATE: string = process.env.REFRESH_TOKEN_EXPIRATION_DATE as string;

const REFRESH_TOKEN_SECRET:string= process.env.REFRESH_TOKEN_SECRET as string;
const AWS_ACCESS_KEY_ID:string=process.env.AWS_ACCESS_KEY_ID as string;
const AWS_SECRET_ACCESS_KEY:string=process.env.AWS_SECRET_ACCESS_KEY as string;
const AWS_REGION=process.env.AWS_REGION as string;
const AWS_BUCKET_NAME=process.env.AWS_BUCKET_NAME as string;


export default {
    PORT,
    JWT_SECRET,
    JWT_EXPIRATION_DATE,
    REFRESH_TOKEN_EXPIRATION_DATE,
    REFRESH_TOKEN_SECRET,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    AWS_REGION,
    AWS_BUCKET_NAME
};
