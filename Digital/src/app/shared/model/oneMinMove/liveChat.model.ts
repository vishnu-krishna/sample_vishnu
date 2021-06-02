export class Product {
    public product: ProductData;
    constructor(name: string, category: string, sku: string) {
        this.product = { name, category, sku };
    }
}

export class ProductData {
    public name: string;
    public category: string;
    public sku: string;
}

export class MoveData {
    public type: string = 'purchase';
    public cart: Cart;
    public orderId: string;
    constructor() {
        this.cart = new Cart();
    }
}

export class Cart {
    public products: Product[];
    constructor() {
        this.products = [];
    }
}
export class CustomerData {
    public type: string = 'ctmrinfo';
    public info: CustomerInfo;
    constructor() {
        this.info = new CustomerInfo();
    }
}
export class CustomerInfo {
    public customerId: string = '';
    public userName: string = '';
}
