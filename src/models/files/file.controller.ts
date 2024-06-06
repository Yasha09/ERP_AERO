import {NextFunction, Request, Response} from "express";
import fileService from "./file.service";
import {HTTPStatus} from "../../errorHandler/types";
import {AuthRequest} from "../../common/interfaces";
import awsStorageService from "./s3.service";

class FileController {
    async upload(req: Request, res: Response, next: NextFunction) {

        const fileMetadata = await fileService.createOne({
            userId: req.user.id,
            file: req.file
        })

        res.status(HTTPStatus.Created).json({
            message: "File uploaded successfully",
            data: fileMetadata
        })
    }

    async list(req: AuthRequest, res: Response, next: NextFunction) {
        const files = await fileService.getAll(
            req.user.id,
            {
                page: parseInt(req.query.page as string) || 1,
                pageSize: parseInt(req.query.pageSize as string) || 10
            }
        );

        res.status(HTTPStatus.OK).json({
            message: "Files fetched successfully",
            data: files
        })
    }

    async get(req: Request, res: Response, next: NextFunction) {
        const file = await fileService.getOne(req.params.id);

        res.status(HTTPStatus.OK).json({
            message: "File fetched successfully",
            data: file
        })
    }

    async update(req: Request, res: Response, next: NextFunction) {
        const file = await fileService.updateOne(req
            .params.id, req.body);

        res.status(HTTPStatus.OK).json({
            message: "File updated successfully",
            data: file
        })

    }

    async delete(req: Request, res: Response, next: NextFunction) {
        await fileService.deleteOne(req.params.id);

        res.status(HTTPStatus.OK).json({
            message: "File deleted successfully",
        })
    }

}

const fileController = new FileController();
export default fileController;