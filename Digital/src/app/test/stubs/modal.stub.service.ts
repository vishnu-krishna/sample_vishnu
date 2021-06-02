import { Injectable } from '@angular/core';
import { IModalService } from '../../myAccount/services/contract/imodal.service';

@Injectable()
export class ModalServiceStub implements IModalService {

    public activate(options: Object): Promise<boolean> {
        throw new Error('Not Implemented');
    }

    public close(): void {
        throw new Error('Not Implemented');
    }

    public isModalOpen(): boolean {
        throw new Error('Not Implemented');
    }
}
