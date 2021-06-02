// TODO: switch to lodash-es when available
import * as _ from 'lodash';
import { GenericStateService } from './../genericState.service';
import { Spied } from './spied.type';

/***
 * Usage:
 *
 * In the top level describe() block of the test file:
 * const stateServiceMockFactory = new GenericStateServiceMockFactory<StateModel>();
 * let stateServiceMock: Spied<GenericStateService<StateModel>>;
 *
 * In the top level beforeEach() section of the test file:
 * stateServiceMock = stateServiceMockFactory.createMock();
 *
 * In the providers[] section of the TestBed.configureTestingModule
 * { provide: 'XXX', useValue: stateServiceMock }
 *
 * To configure the mock with a response:
 * stateServiceMock.getState.and.returnValue(state);
 *
 * To call the mock in a test:
 * expect(stateServiceMock.getState).toEqual(state);
 *
 * Where:
 * XXX = injection logical name for the service. Needs to be unique
 * StateModel = interface name of your state object
 * state = instance of the StateModel
 */
export class GenericStateServiceMockFactory<T> {
    public createMock(): Spied<GenericStateService<T>> {
        const properties = this.getProperties();
        return jasmine.createSpyObj(typeof GenericStateService, properties);
    }

    private getProperties() {
        const names = Object.getOwnPropertyNames(GenericStateService.prototype);
        return _.remove(names, 'constructor');
    }
}
