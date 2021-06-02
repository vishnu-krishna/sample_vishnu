export class Utilities {

    public static generateId() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
            (c) => {
                let r = Math.floor(Math.random() * 16);
                let v = c === 'x' ? r : (r % 4 + 4);
                return v.toString(16);
            }).toUpperCase();
    }

}
