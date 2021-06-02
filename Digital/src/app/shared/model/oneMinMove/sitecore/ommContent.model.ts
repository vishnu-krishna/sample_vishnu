import { OneMinuteMove } from './oneMinuteMove';

export class OmmContentModel {
    public oneMinuteMove: OneMinuteMove;
}

/**
 * OmmInMemoryModel
 * @export
 * @class OmmInMemoryModel
 */
export class OmmInMemoryModel {
    constructor(public address: string) {}
}
