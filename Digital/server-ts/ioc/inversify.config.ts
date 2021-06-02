import { Container } from 'inversify';

import { MockServer } from '../mockServer';
import { MockServerModule } from './mockServerModule';

const serverContainer = new Container();

serverContainer.bind<MockServer>(MockServerModule.MockServer).to(MockServer);

export { serverContainer };
