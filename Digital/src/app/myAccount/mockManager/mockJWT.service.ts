import * as jwt_decode from 'jwt-decode';
import { HmacSHA256 } from 'crypto-js';
import * as Utf8 from 'crypto-js/enc-utf8';
import * as Base64  from 'crypto-js/enc-base64';

const secret: string = 'myaccountmocking';

export const MockJWTService = {
    encode : (payload: any) => {
        return tokenBase.generateToken(payload);
    },
    decode : (payload: string) => {
        const parts = payload.split('.');
        if (parts.length !== 3) {
            throw new Error('Token must contain 3 parts');
        }
        return jwt_decode(payload);
    }
};

const tokenBase = {
    generateToken(data: any): string {
        const header = {
            typ: 'JWT',
            alg: 'HS256'
        };
        const stringifiedHeader = Utf8.parse(JSON.stringify(header));
        const encodedHeader = this.base64Url(stringifiedHeader);
        const stringifiedData = Utf8.parse(JSON.stringify(data));
        const encodedData = this.base64Url(stringifiedData);
        const jwtPart = `${encodedHeader}.${encodedData}`;
        const signatureEncrypt = HmacSHA256(jwtPart, secret);
        const signature = this.cleanBase(signatureEncrypt.toString(Base64));
        return `${jwtPart}.${signature}`;
    },
    base64Url(baseTo: string): string {
        let encodedSource = Base64.stringify(baseTo);
        return this.cleanBase(encodedSource);
    },
    cleanBase(base: string): string {
        return base.replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');
    }
};
