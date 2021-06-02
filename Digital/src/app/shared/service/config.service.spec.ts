import { NavigationExtras, Router } from '@angular/router';
import { Mock } from 'ts-mocks/lib';
import { ConfigService } from './config.service';

describe('config service', () => {
    describe('routeWithParameters', () => {
        it('it should navigate filtered by query parameters from white list', () => {
            const router = new Mock<Router>();
            const routerSpy = router
                             .setup((x) => x.navigate)
                             .Spy;
            const activatedRoute: any = {
                snapshot: {
                    queryParams: {
                        param1: 'param1',
                        param2: 'param2'
                    }
                }
            };
            const destinationRoute: string = 'http://destinationRoute.com';
            const queryParamsWhiteList: string[] = ['param2', 'param3'];
            const configService = new ConfigService();

            configService.routeWithParameters(router.Object, activatedRoute, destinationRoute, queryParamsWhiteList);

            expect(routerSpy).toHaveBeenCalledWith([destinationRoute], { queryParams: { param2: 'param2' } });
        });
    });
});
