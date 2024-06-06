import {Readable} from "stream";

export type Content = string | Buffer | Readable;

export interface IPaginationData {
    page: number,
    pageSize: number,
}
export interface IFileMetadata {
    name: string,
    url: string,
    mimeType: string,
    extension: string,
    fileSize: number,
    userId: number
}

export interface IPaginationResponse {
    files: IFileMetadata[],
    total: number,
    page: number,
    pageSize: number
}