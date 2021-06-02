describe('desktop menu', () => {

    beforeEach( () => {
        browser.get('/Apps/selfservice.html#/dashboard');
    });

    it('site nav bar is available when logged in to My Account', () => {
        expect($('.desktop-main-menu__tabs').isPresent()).toEqual(true);
        expect($('.desktop-main-menu__tabs').isDisplayed()).toBeTruthy();
        expect($('li.router-link-active').isDisplayed()).toBeTruthy();
    });

    it('customer navigates to usage from site nav bar', () => {
        $('#desktop-tab-usage').click();
        expect($('my-account-usage').isDisplayed()).toBeTruthy();
        expect($('li.router-link-active').isDisplayed()).toBeTruthy();
    });

});
