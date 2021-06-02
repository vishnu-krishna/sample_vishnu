import { Injectable } from '@angular/core';
import cloneDeep from 'lodash-es/cloneDeep';

/**
 * Usage:
 * In modules the syntax is:
 * { provide: 'XXX', useClass: GenericStateService }
 *
 * In the contructor of the component the syntax is:
 * @Inject('XXX') private serviceVariableName: GenericStateService<StateModel>
 *
 * Where:
 * XXX = injection logical name for the service. Needs to be unique
 * StateModel = interface name of your state object
 */
@Injectable()
export class GenericStateService<T>  {
    private state: T;

    public hasState(): boolean {
        return !!this.state;
    }
    public getState(): T {
        return cloneDeep(this.state);
    }

    public setState(state: T): GenericStateService<T> {
        this.state = state;
        return this;
    }

    public resetState(): GenericStateService<T> {
        this.state = undefined;
        return this;
    }
}
