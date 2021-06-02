import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IRedLineApiService } from '../../shared/service/contract/iredlineapi.service';
import { PrintDocMappings } from './../../shared/service/redLineApi.service';

@Injectable()
export class RedLineApiStubService implements IRedLineApiService {
    public getBillsForContract(contractNumber: string): Observable<PrintDocMappings[]> {
        throw new Error('Method not implemented.');
    }
    public getBillPdfUrl(contractAccount: string, printDoc: string): Observable<string> {
        throw new Error('Method not implemented.');
    }
}
