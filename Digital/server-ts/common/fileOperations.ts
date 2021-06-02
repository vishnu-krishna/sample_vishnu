import { Response, Request } from 'express';

import * as path from 'path';
import * as fs from 'fs';

const staticRootFolder = '../_mockData';
const baseMockDataPath = `${staticRootFolder}/users`;

export class FileOperations {

    public static baseMockDataPath: string = baseMockDataPath;

    public static serveContentFromDiskBasedOnUrl(req: Request, res: Response, hostKey: string, onFileNotFound?: Function): void {

        let targetFile = path.join(__dirname, baseMockDataPath, req['nameId'], hostKey, req.path, 'response.json');
        let targetFileWithVerb = path.join(__dirname, baseMockDataPath, req['nameId'], hostKey, req.path, `response-${req.method.toLowerCase()}.json`);
        let absTargetFile = path.resolve(targetFile);
        let absTargetFileWithVerb = path.resolve(targetFileWithVerb);

        let fileToLoad = ``;

        if (fs.existsSync(absTargetFile) && fs.statSync(absTargetFile).isFile()) {
            fileToLoad = absTargetFile;
        } else if (fs.existsSync(absTargetFileWithVerb) && fs.statSync(absTargetFileWithVerb).isFile()) {
            fileToLoad = absTargetFileWithVerb;
        }

        if (fileToLoad.length > 0) {

            let data = this.loadFile(fileToLoad);
            if (data.status) {
                res.status(data.status).send(data.body);
            } else {
                res.send(data.body);
            }
            return;

        } else if (onFileNotFound && typeof onFileNotFound === 'function') {
            onFileNotFound();
        } else {
            FileOperations.logFileNotFound(req.url, targetFile, targetFileWithVerb, req['nameId']);

            let errorResponse = {
                message: `Sorry! Can't find the file: ${absTargetFile}`
            };

            res.status(404).json(errorResponse);
            res.end();

        }
    }

    public static serveStaticFile(req: Request, res: Response, mockFileName: string): void {
        let targetFile = path.join(__dirname, staticRootFolder, mockFileName);
        let absTargetFile = path.resolve(targetFile);

        if (fs.existsSync(absTargetFile) && fs.statSync(absTargetFile).isFile()) {
            let buffer = fs.readFileSync(absTargetFile).toString();
            let data = JSON.parse(buffer);
            res.send(data);
            return;
        } else {
            let errorResponse = {
                message: `Sorry! Can't find the file: ${absTargetFile}`
            };
            res.status(404).json(errorResponse);
            res.end();
        }
    }

    public static loadDataFromDiskForEndpoint(req: Request, res: Response, endpoint: string) {
        let targetFile = path.join(__dirname, baseMockDataPath, req['nameId'], endpoint, 'response.json');
        let targetFileWithVerb = path.join(__dirname, baseMockDataPath, req['nameId'], endpoint, `response-${req.method.toLowerCase()}.json`);
        let absTargetFile = path.resolve(targetFile);
        let absTargetFileWithVerb = path.resolve(targetFileWithVerb);

        let fileToLoad = ``;

        if (fs.existsSync(absTargetFile) && fs.statSync(absTargetFile).isFile()) {
            fileToLoad = absTargetFile;
        } else if (fs.existsSync(absTargetFileWithVerb) && fs.statSync(absTargetFileWithVerb).isFile()) {
            fileToLoad = absTargetFileWithVerb;
        }

        if (fileToLoad.length > 0) {

            let data = this.loadFile(fileToLoad);
            return data;

        }

        return undefined;
    }

    public static loadFile(filename): any {
        if (fs.existsSync(filename)) {
            FileOperations.logFileFound(filename);
            let buffer = fs.readFileSync(filename).toString();
            let data = JSON.parse(buffer);
            if (data && data.status && data.body) {
                return data;
            } else {
                return {
                    status: 200,
                    headers: [],
                    body: data
                };
            }
        } else {
            console.warn(`Could not load mock data file: ${filename}`);
            return undefined;
        }
    }

    public static loadContentFromDataFile(req, hostKey): any {

        let absoluteFolder = path.join(__dirname, baseMockDataPath);

        let targetFile = path.join(absoluteFolder, req.nameId, hostKey, req.path, 'response.json');
        let targetFileWithVerb = path.join(absoluteFolder, req.nameId, hostKey, req.path, `response-${req.method.toLowerCase()}.json`);

        let absTargetFile = path.resolve(targetFile);
        let absTargetFileWithVerb = path.resolve(targetFileWithVerb);

        let fileToLoad = ``;

        if (fs.existsSync(absTargetFile) && fs.statSync(absTargetFile).isFile()) {
            fileToLoad = absTargetFile;
        } else if (fs.existsSync(absTargetFileWithVerb) && fs.statSync(absTargetFileWithVerb).isFile()) {
            fileToLoad = absTargetFileWithVerb;
        }

        if (fileToLoad.length > 0) {
            return this.loadFile(fileToLoad);
        } else {
            FileOperations.logFileNotFound(req.url, targetFile, targetFileWithVerb, req.nameId);
            return undefined;
        }
    }

    private static logFileFound(filePath: string): void {
        console.log('Loading file', filePath);
    }

    private static logFileNotFound(
        url: string,
        targetFile: string,
        targetFileWithVerb: string,
        nameId: string
    ): void {
        console.error('No suitable file found');
        console.error('Url:', url);
        console.error('TargetFile:', targetFile);
        console.error('TargetFileWithVerb:', targetFileWithVerb);
        console.error('NameId:', nameId);
    }
}
