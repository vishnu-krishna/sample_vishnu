import { DeviceDetectorService } from './deviceDetector.service';
import { TestBed } from '@angular/core/testing';

describe('Device Detector Service', () => {
    let service: DeviceDetectorService;

    beforeEach(() => {
        TestBed.configureTestingModule({ providers: [DeviceDetectorService] });
        service = TestBed.get(DeviceDetectorService);
    });

    it('should have isIE set to true if browser is IE', () => {
        service.userAgent = 'Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko';
        expect(service.isIE).toBeTruthy();
        expect(service.isChrome).toBeFalsy();
        expect(service.isIOS).toBeFalsy();
    });

    it('should have isIOS set to true if browser is running on iOS', () => {
        service.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1';
        expect(service.isIOS).toBeTruthy();
    });

    it('should have isChrome set to true if browser is chrome on desktop', () => {
        service.userAgent = 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36';
        expect(service.isIOS).toBeFalsy();
        expect(service.isChrome).toBeTruthy();
        expect(service.isIE).toBeFalsy();
    });

    it('should have isIOS and isChrome set to true if browser is chrome running on iOS', () => {
        service.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_6 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) CriOS/65.0.3325.152 Mobile/15D100 Safari/604.1';
        expect(service.isIOS).toBeTruthy();
        expect(service.isChrome).toBeTruthy();
        expect(service.isIE).toBeFalsy();
    });

    describe('historyPushStateSupported()', () => {

        it('should return false if chrome on iOS', () => {
            service.isIOS = true;
            service.isChrome = true;
            expect(service.historyPushStateSupported()).toBeFalsy();
        });

        it('should return true if chrome when not iOS', () => {
            service.isIOS = false;
            service.isChrome = true;
            expect(service.historyPushStateSupported()).toBeTruthy();
        });

        it('should return true if not chrome on iOS', () => {
            service.isIOS = true;
            service.isChrome = false;
            expect(service.historyPushStateSupported()).toBeTruthy();
        });

        it('should return true if not chrome and not iOS', () => {
            service.isIOS = false;
            service.isChrome = false;
            expect(service.historyPushStateSupported()).toBeTruthy();
        });

    });

});
