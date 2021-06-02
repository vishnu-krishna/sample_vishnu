import { Request } from 'express';

export class CacheManager {

    public static saveItem(req: Request, key: string, data: any) {
        req.app.locals['customercache'][req['mockServerSessionId']][req['nameId']][key] = data;
    }

    public static getItem(req: Request, key: string) {
        let result = req.app.locals['customercache'][req['mockServerSessionId']][req['nameId']][key];
        return result;
    }

}
