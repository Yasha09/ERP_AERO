import {v4 as uuidv4} from 'uuid';
import path from "path";

export const getFileName = (originalName: string): string => uuidv4() + path.extname(originalName);

export const urlBuilder = (name: string): string => {
    const BUCKET_NAME = process.env.AWS_BUCKET_NAME;
    const AWS_REGION = process.env.AWS_REGION;

    return `https://${BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${name}`;
}