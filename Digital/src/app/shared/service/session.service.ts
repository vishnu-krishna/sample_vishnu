import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {
    /**
     * @author Vishnu Chander
     * @returns {boolean}
     * @param Nil
     * @description Deletes the session id if it is present.
     */
    public deleteSession(): boolean {
        if (sessionStorage.getItem('SessionId')) {
            sessionStorage.removeItem('SessionId');
            return true;
        }
        return false;
    }

}
