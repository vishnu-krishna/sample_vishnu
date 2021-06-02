import { Observable } from 'rxjs/Observable';

import { InvalidDatesModel } from '../../model/oneMinMove/invalidDates.model';

export abstract class IInvalidDatesService {
    public abstract GetInvalidDates(state: string): Observable<InvalidDatesModel[]>;
    public abstract GetInvalidStringDates(): String[];
    public abstract FirstValidDay(): InvalidDatesModel;
    public abstract LastValidDay(): InvalidDatesModel;
    public abstract SelectedDay(): InvalidDatesModel;
    public abstract LastValidDayDisconnection(): InvalidDatesModel;
    public abstract FirstValidDayDisconnection(): InvalidDatesModel;
    public abstract RelatedValidDayDisconnection(connectOnDate: string): InvalidDatesModel;
}
