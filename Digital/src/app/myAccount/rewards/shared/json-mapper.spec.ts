import { JSONMapper } from './json-mapper';

enum GenderTest {
    Male,
    Female
}

class DetailsTest {
    public colour: string = null;
    public rating = 0;

    public fromJSON(json: any) {
        JSONMapper.fromJSON(json, this);
    }
}

class DetailsCustomMapTest extends DetailsTest {
    public gender: GenderTest = null;

    public fromJSON(json: any) {
        JSONMapper.fromJSON(json, this, {
            gender: (value: any) => GenderTest[value]
        });
    }
}

describe('JSONMapper', () => {

    it('should map properties that exist in both src and dst', () => {
        const src = {
            firstName: 'Fred',
            lastName: 'Jones',
            age: 24,
            birthdate: '24-07-2005'
        };
        const dst = {
            firstName: '',
            lastName: '',
            age: null
        };
        JSONMapper.fromJSON(src, dst);
        expect(dst.firstName).toEqual(src.firstName);
        expect(dst.lastName).toEqual(src.lastName);
        expect(dst.age).toEqual(src.age);
        expect(dst['birthdate']).toBeUndefined();
    });

    it('should map sub object properties that implement fromJSON', () => {
        const src = {
            type: 'test',
            details: {
                colour: 'red',
                rating: 5
            },
            moreDetails: {
                interest: 0
            }
        };
        const dst = {
            type: '',
            details: new DetailsTest()
        };

        JSONMapper.fromJSON(src, dst);
        expect(dst.type).toEqual(src.type);
        expect(dst.details.colour).toEqual(src.details.colour);
        expect(dst.details.rating).toEqual(src.details.rating);
        expect(dst['moreDetails']).toBeUndefined();
    });

    it('should allow custom mappers', () => {
        const src = {
            type: 'test',
            details: {
                colour: 'red',
                rating: 5,
                gender: 'Female'
            }
        };
        const dst = {
            type: '',
            details: new DetailsCustomMapTest()
        };

        JSONMapper.fromJSON(src, dst);
        expect(dst.type).toEqual(src.type);
        expect(dst.details.colour).toEqual(src.details.colour);
        expect(dst.details.rating).toEqual(src.details.rating);
        expect(dst.details.gender).toEqual(GenderTest.Female);
    });

});
