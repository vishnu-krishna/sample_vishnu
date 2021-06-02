import { Observable } from 'rxjs/Observable';
import { PrintDocMappings } from '../redLineApi.service';

export abstract class IRedLineApiService {
    public abstract getBillsForContract(contractNumber: string): Observable<PrintDocMappings[]>;
    public abstract getBillPdfUrl(contractAccount: string, printDoc: string): Observable<string>;
}
