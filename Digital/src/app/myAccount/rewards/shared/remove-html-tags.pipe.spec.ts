import { RemoveHtmlTagsPipe } from './remove-html-tags.pipe';

describe('RemoveHtmlTagsPipe', () => {

    let pipe: RemoveHtmlTagsPipe;

    beforeEach(() => {
        pipe = new RemoveHtmlTagsPipe();
    });

    it('should return input if no html tags', () => {
        expect(pipe.transform('Lorem Ipsum')).toEqual('Lorem Ipsum');
    });

    it("should return '' if no input value", () => {
        expect(pipe.transform('')).toEqual('');
        expect(pipe.transform(null)).toEqual('');
        expect(pipe.transform(undefined)).toEqual('');
    });

    it('should return input without html tags', () => {
        expect(pipe.transform('<p class="test" style="color:blue">Lorem <b><span>Ipsum</span></b><i>.</i></p>')).toEqual('Lorem Ipsum.');
        expect(pipe.transform('<p><strong>Save 5% off when you purchase online. Valid at all Target outlets and online. </strong></p><p>Gift Cards are for your own personal use. Maximum per order $1,000 with a monthly maximum of $5,000. Treat Gift Card')).toEqual('Save 5% off when you purchase online. Valid at all Target outlets and online. Gift Cards are for your own personal use. Maximum per order $1,000 with a monthly maximum of $5,000. Treat Gift Card');
        expect(pipe.transform('<div style="padding:15px;background-color:#f4f4f4"><div style="font-size:18px;font-weight:bold;margin-bottom:10px">The Experience </div><ul class="fa-ul"><li><i class="fa-li f')).toEqual('The Experience <i class="fa-li f');
    });

    it('should return input if it contains < or >', () => {
        expect(pipe.transform('50% off if value < $50')).toEqual('50% off if value < $50');
        expect(pipe.transform('50% off if value > $50')).toEqual('50% off if value > $50');
    });

    it('will remove text between < and > even if accidental', () => {
        expect(pipe.transform('50% off if value < $50 but > $10')).toEqual('50% off if value  $10');
    });
});
