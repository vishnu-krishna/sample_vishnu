import { Router } from 'express';

export interface IMockApi {

    registerRoutes(): Router;

}
