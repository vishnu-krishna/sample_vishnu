export interface FromJSON {
    fromJSON(json: any): void;
}

export class JSONMapper {
    public static fromJSON(json: any, dst: Object, customMappers?: { [propertyToMap: string]: {(value: any, property?: string)} } ) {
        if (!json || !dst) {
            return;
        }

        for (let property in json) {
            if (json.hasOwnProperty(property) && dst.hasOwnProperty(property)) {
                if (typeof json[property] !== 'object') {
                    let customMapperForProperty = null;
                    if (customMappers) {
                        customMapperForProperty = customMappers[property];
                        if (customMapperForProperty) {
                            let customMapResult = customMapperForProperty.call(dst, json[property], property);
                            dst[property] = customMapResult;
                        }
                    }
                    if (!customMapperForProperty) {
                        dst[property] = json[property];
                    }
                } else if (typeof dst[property] === 'object' && typeof dst[property]['fromJSON'] === 'function') {
                    dst[property]['fromJSON'].call(dst[property], json[property]);
                }
            }
        }
    }
}
