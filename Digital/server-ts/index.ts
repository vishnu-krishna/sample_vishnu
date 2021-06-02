import { MockServer, IMockServer } from './mockServer';
import { serverContainer } from './ioc/inversify.config';
import { MockServerModule } from './ioc/mockServerModule';

let server = serverContainer.get<MockServer>(MockServerModule.MockServer);

const DEVELOPMENT_PORT: number = 3456;

server.start(DEVELOPMENT_PORT, (isRunning: boolean, port: number) => {
    if (isRunning) {
        console.log(`Server is running`);
    } else {
        console.error(`Failed to start the server on port ${port}`);
    }
});

module.exports = server.app;
