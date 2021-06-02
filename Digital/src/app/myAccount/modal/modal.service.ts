import { Injectable } from '@angular/core';
import { IModalService } from '../services/contract/imodal.service';

@Injectable()
export class ModalService implements IModalService {
    public activate: (options: Object) => Promise<boolean>;
    public close: () => void;
    public isModalOpen: () => boolean;
}
