export class MockResponseSchema {

    public status?: number;
    public body: any;

    constructor() {
        this.status = 200;
        this.body = {};
    }

}
