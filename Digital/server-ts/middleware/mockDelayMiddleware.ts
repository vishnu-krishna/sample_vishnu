import * as express from 'express';

export class MockDelayMiddleware {
    public static readonly defaultDelayMs: number = 10;

    public static invoke(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const isConfigureRequest = req.path.startsWith('/config/');

        if (req.method !== 'OPTIONS' && !isConfigureRequest) {
            const delayMilliseconds = req.app.locals.mockConfig.fakeDelayMs;

            if (MockDelayMiddleware.defaultDelayMs !== delayMilliseconds) {
                console.log(`Mock delay middleware has a non-default value of ${delayMilliseconds}ms`);
            }

            setTimeout(next, delayMilliseconds);

            return;
        }

        next();
    }
}
