import config from '../../configs'
import {Content} from "./common/interface";
import {DeleteObjectCommand, GetObjectCommand, HeadObjectCommand, PutObjectCommand, S3} from "@aws-sdk/client-s3";

const s3 = new S3({
    credentials: {
        accessKeyId: config.AWS_ACCESS_KEY_ID,
        secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
    },
    region: config.AWS_REGION
});


class AwsStorageService {
    async upload(name: string, content: Content): Promise<any> {
        try {
            return await s3.send(new PutObjectCommand({
                Bucket: config.AWS_BUCKET_NAME,
                Key: name,
                Body: content,
            }))
        } catch (error: any) {
            // AwsStorage.throwError(error);
            console.log('error', error)
            throw new Error('File not found');
        }
    }

    async getFileMetadata(name: string): Promise<any> {
        try {
            return await s3.send(new HeadObjectCommand({
                Bucket: config.AWS_BUCKET_NAME,
                Key: name,
            }))
        } catch (error: any) {
            throw new Error('File not found');
        }
    }



    async delete(name: string): Promise<any> {
        try {
            return await s3.send(new DeleteObjectCommand({
                Bucket: config.AWS_BUCKET_NAME,
                Key: name,
            }))
        } catch (error: any) {
            throw new Error('File not found');
        }

    }

}

const awsStorageService = new AwsStorageService();
export default awsStorageService;