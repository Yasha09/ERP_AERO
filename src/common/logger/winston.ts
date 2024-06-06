import winston from "winston";
const { combine, timestamp, json, printf } = winston.format;
const timestampFormat = 'MMM-DD-YYYY HH:mm:ss';


const myFormat = printf(({ timestamp, level, message, ...data }) => {
    const response = {
        timestamp,
        level,
        message,
        data // metadata
    };
    return JSON.stringify(response);
});
export const logger = winston.createLogger({
    format: combine(
        timestamp({ format: timestampFormat }),
        json(),
        myFormat
    ),
    transports: [
        new winston.transports.Console() // Add console transport
    ]
});