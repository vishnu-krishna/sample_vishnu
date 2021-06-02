import { Progress } from 'angular-progress-http';
import { BaseMessage } from './base.message';

export class UploadProgressMessage extends BaseMessage {

    public progress: Progress;

    constructor(progress: Progress) {
        super();
        this.progress = progress;
    }
}
