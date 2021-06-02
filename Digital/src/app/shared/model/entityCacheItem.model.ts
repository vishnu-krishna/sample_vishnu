export class EntityCacheItem<T> {

    public data: T;
    public expires: Date;

    constructor(_data: T, _expires: Date) {
        this.data = _data;
        this.expires = _expires;
    }

}
