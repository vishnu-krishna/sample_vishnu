describe('footer', () => {

    beforeEach( () => {
        browser.get('/Apps/selfservice.html#/dashboard');
    });

    it('Footer to be displayed upon logging in to My Account & navigate to <element> from footer', () => {
        expect($('.agl-footer').isPresent()).toEqual(true);
        $('#footer-privacy-link').click();
        browser.ignoreSynchronization = true;

        browser.getAllWindowHandles().then(function (handles) {
            var newWindowHandle = handles[1]; // this is your new window
            browser.switchTo().window(newWindowHandle).then(function () {
                expect(browser.getCurrentUrl()).toMatch('https://www.agl.com.au/site-pages/privacy');
            });
        });
    });

});
