import {AppDataSource} from "../../data-source";
import {File} from "../../entity/File.entity";
import awsStorageService from "./s3.service";
import errorMessages from "../../common/constants/errorMessages";
import {HTTPStatus} from "../../errorHandler/types";
import {Exception} from "../../errorHandler/exception";
import {getFileName, urlBuilder} from "./common/utils";
import {IFileMetadata, IPaginationData, IPaginationResponse} from "./common/interface";

class FileService {
    async createOne(payload: { userId: number, file?: Express.Multer.File }): Promise<IFileMetadata> {
        const {userId, file} = payload;
        const fileRepository = AppDataSource.getRepository(File);
        if (!file || !file.buffer) {
            throw new Exception(HTTPStatus.BadRequest, {
                message: errorMessages.fileNotFound,
            });
        }

        const fileName = getFileName(file.originalname);
        await awsStorageService.upload(fileName, file.buffer);

        const metadata = await awsStorageService.getFileMetadata(fileName);

        return fileRepository.save({
            name: fileName,
            url: urlBuilder(fileName),
            userId,
            size: metadata.ContentLength,
            type: metadata.ContentType,
            mimeType: file.mimetype,
            extension: file.originalname.split('.').pop() || 'jpg',
        });
    }

    async getAll(userId: number, paginationData: IPaginationData): Promise<IPaginationResponse> {
        const {page, pageSize} = paginationData;
        const fileRepository = AppDataSource.getRepository(File);
        const [files, total] = await fileRepository.findAndCount({
            where: {user: {id: userId}},
            skip: (page - 1) * pageSize,
            take: pageSize
        })
        return {
            files,
            total,
            page,
            pageSize
        };
    }

    async getOne(id: string): Promise<File> {
        const fileRepository = AppDataSource.getRepository(File);

        const file = await fileRepository.findOne({
            where: {
                id
            }
        });

        if (!file) {
            throw new Exception(HTTPStatus.NotFound, {
                message: errorMessages.fileNotFound,
            });
        }

        return file;
    }

    async updateOne(id: string, payload: any): Promise<File> {
        const fileRepository = AppDataSource.getRepository(File);

        const file = await fileRepository.findOne({
            where: {
                id
            }
        });

        if (!file) {
            throw new Exception(HTTPStatus.NotFound, {
                message: errorMessages.fileNotFound,
            });
        }

        return fileRepository.save({
            ...file,
            ...payload
        });
    }

    async deleteOne(id: string): Promise<void> {
        const fileRepository = AppDataSource.getRepository(File);

        const file = await fileRepository.findOne({
            where: {
                id
            }
        });

        if (!file) {
            throw new Exception(HTTPStatus.NotFound, {
                message: errorMessages.fileNotFound,
            });
        }

        await awsStorageService.delete(file.name);
        await fileRepository.delete(id);

    }

}

const fileService = new FileService();
export default fileService;
