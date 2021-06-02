import { ProductAttributeModel } from './productAttribute.model';
export class Product {
    public id: string;
    public description: string;
    public fuelType: string;
    public invalid: boolean;
    public attributes: ProductAttributeModel[];
}
