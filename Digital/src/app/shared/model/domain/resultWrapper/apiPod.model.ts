import { ApiResultStatus } from './apiResultStatus.enum';

export class ApiPodModel<T> {
    public status: ApiResultStatus;
    public message: string;
    public payload: T;
}
