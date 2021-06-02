
import { async, inject, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { IProductApiService } from '../../shared/service/contract/iproductApi.service';
import { ProductAttributesService } from './productAttributesService';
import { ContractViewModel, AccountViewModel } from './account.service';
import { Product } from '../../shared/model/product/product.model';

describe(`Product Attribute Service`, () => {

    let accounts = [
        {
            accountNumber: '123456789',
            contracts: [
                {
                    productId: 'AGLMKTREPP1',
                }
            ]
        }
    ];

    let product: Product = {
        id: 'AGLMKTREPP1',
        description: 'Prepay Product Scheduled',
        fuelType: 'Electricity',
        invalid: false,
        attributes: [
            {
                id: ProductAttributesService.payOnTimeDiscountAttributeId,
                description: 'Pay on time Discount Type',
                regionId: null,
                dataType: 'String',
                value: 'COMBINED',
                valueDescription: 'usage and supply',
                unitOfMeasure: null
            }
        ]
    };

    let products = [product];

    let anotherProduct: Product = {
        id: 'AGLMKTREPP1',
        description: 'Prepay Product Scheduled',
        fuelType: 'Electricity',
        invalid: false,
        attributes: [
            {
                id: 'ZPRICE_DISCOUNT_PER',
                description: 'Price Discount Percent',
                regionId: 'VIC',
                dataType: 'Numeric',
                value: '2',
                valueDescription: 'Value Description',
                unitOfMeasure: 'Percentage'
            }
        ]
    };

    let mandatoryEBillingProduct: Product = {
        id: 'AGLMKTREPP1',
        description: 'Prepay Product Scheduled',
        fuelType: 'Electricity',
        invalid: false,
        attributes: [
            {
                id: 'Z_EBILLING',
                description: 'EBilling',
                regionId: 'VIC',
                dataType: 'Numeric',
                value: '1',
                valueDescription: 'Mandatory',
                unitOfMeasure: 'Percentage'
            }
        ]
    };

    let mandatoryDirectDebitProduct: Product = {
        id: 'AGLMKTREPP1',
        description: 'Prepay Product Scheduled',
        fuelType: 'Electricity',
        invalid: false,
        attributes: [
            {
                id: 'Z_DIRECTDEBIT',
                description: 'Direct Debit',
                regionId: 'VIC',
                dataType: 'Numeric',
                value: '1',
                valueDescription: 'Mandatory',
                unitOfMeasure: 'Percentage'
            }
        ]
    };

    beforeEach(() => {

        let productApiServiceStub = {
            GetProductAttribute: () => {
                throw new Error('productApiServiceStub.GetProductAttribute has not been mocked properly.');
            }
        };

        TestBed.configureTestingModule({
            declarations: [],
            imports: [],
            providers: [
                {
                    provide: IProductApiService,
                    useValue: productApiServiceStub
                },
                ProductAttributesService
            ]
        });
        spyOn(productApiServiceStub, 'GetProductAttribute').and.returnValue(Observable.of(products));
    });

    it('should call processAttributes from processContractProductAttributes', () => {

        // ACT
        let serviceInstance = TestBed.get(ProductAttributesService);

        spyOn(serviceInstance, 'processAttributes');
        serviceInstance.processContractProductAttributes(accounts);

        // ASSERT
        expect(serviceInstance.processAttributes).toHaveBeenCalled();

    });

    it('should use the stored products if the processContractProductAttributes is called again', () => {

        // ACT
        let serviceInstance = TestBed.get(ProductAttributesService);
        spyOn(serviceInstance, 'processAttributes');

        // ASSERT
        expect(serviceInstance.products).toBeNull();
        serviceInstance.processContractProductAttributes(accounts);
        expect(serviceInstance.products).not.toBeNull();

    });

    it('should return an array of attributes when getAttributes is called', async(()  => {

        // ACT
        let serviceInstance = TestBed.get(ProductAttributesService);

        // ASSERT
        serviceInstance.getAttributes(accounts).subscribe((result) => expect(result.length).toBeGreaterThan(0));

    }));

    it('should an empty array of attributes when getAttributes is called', async(() => {

        // ARRANGE
        let accountsWithContractWithNoProduct = [
            {
                accountNumber: '123456789',
                contracts: []
            }
        ];

        // ACT
        let serviceInstance = TestBed.get(ProductAttributesService);

        // ASSERT
        serviceInstance.getAttributes(accountsWithContractWithNoProduct).subscribe((result) => expect(result.length).toBe(0));

    }));

    it('should not call setPayOnTimeFlag from processAttributes if no products as passed', () => {
        // ARRANGE
        let emptyProducts: Product[] = [];

        // ACT
        let serviceInstance = TestBed.get(ProductAttributesService);
        spyOn(serviceInstance, 'setPayOnTimeFlag');
        serviceInstance.processAttributes(accounts, emptyProducts);

        // ASSERT
        expect(serviceInstance.setPayOnTimeFlag).not.toHaveBeenCalled();

    });

    it('should not call setMandatoryEBillingFlag from processAttributes if no products as passed', () => {
        // ARRANGE
        let emptyProducts: Product[] = [];

        // ACT
        let serviceInstance = TestBed.get(ProductAttributesService);
        spyOn(serviceInstance, 'setMandatoryEBillingFlag');
        serviceInstance.processAttributes(accounts, emptyProducts);

        // ASSERT
        expect(serviceInstance.setMandatoryEBillingFlag).not.toHaveBeenCalled();

    });

    it('should not call setMandatoryDirectDebitFlag from processAttributes if no products as passed', () => {
        // ARRANGE
        let emptyProducts: Product[] = [];

        // ACT
        let serviceInstance = TestBed.get(ProductAttributesService);
        spyOn(serviceInstance, 'setMandatoryDirectDebitFlag');
        serviceInstance.processAttributes(accounts, emptyProducts);

        // ASSERT
        expect(serviceInstance.setMandatoryDirectDebitFlag).not.toHaveBeenCalled();

    });

    it('should call setPayOnTimeFlag from processAttributes when a product is passed', () => {

        // ACT
        let serviceInstance = TestBed.get(ProductAttributesService);
        spyOn(serviceInstance, 'setPayOnTimeFlag');
        serviceInstance.processAttributes(accounts, products);

        // ASSERT
        expect(serviceInstance.setPayOnTimeFlag).toHaveBeenCalled();

    });

    it('should call setMandatoryEBillingFlag from processAttributes when a product is passed', () => {

        // ACT
        let serviceInstance = TestBed.get(ProductAttributesService);
        spyOn(serviceInstance, 'setMandatoryEBillingFlag');
        serviceInstance.processAttributes(accounts, products);

        // ASSERT
        expect(serviceInstance.setMandatoryEBillingFlag).toHaveBeenCalled();

    });

    it('should call setMandatoryDirectDebitFlag from processAttributes when a product is passed', () => {

        // ACT
        let serviceInstance = TestBed.get(ProductAttributesService);
        spyOn(serviceInstance, 'setMandatoryDirectDebitFlag');
        serviceInstance.processAttributes(accounts, products);

        // ASSERT
        expect(serviceInstance.setMandatoryDirectDebitFlag).toHaveBeenCalled();

    });

    it('should set the pay on time flag when product is present', () => {

        // ARRANGE
        let contract: ContractViewModel = new ContractViewModel('33333333');

        // ACT
        let serviceInstance = TestBed.get(ProductAttributesService);
        serviceInstance.setPayOnTimeFlag(contract, product);

        // ASSERT
        expect(contract.hasPayOnTimeDiscount).toBeTruthy();

    });

    it('should not the set pay on time flag when product is not present', () => {
        // ARRANGE
        let contract: ContractViewModel = new ContractViewModel('33333333');

        // ACT
        let serviceInstance = TestBed.get(ProductAttributesService);
        serviceInstance.setPayOnTimeFlag(contract, anotherProduct);

        // ASSERT
        expect(contract.hasPayOnTimeDiscount).toBeFalsy();

    });

    it('should set mandatory ebilling flag when product is present', () => {
        // ARRANGE
        let contract: ContractViewModel = new ContractViewModel('33333333');

        // ACT
        let serviceInstance = TestBed.get(ProductAttributesService);
        serviceInstance.setMandatoryEBillingFlag(contract, mandatoryEBillingProduct);

        // ASSERT
        expect(contract.isMandatoryEBilling).toBeTruthy();

    });

    it('should set mandatory direct debit flag when product is present', () => {
        // ARRANGE
        let contract: ContractViewModel = new ContractViewModel('33333333');

        // ACT
        let serviceInstance = TestBed.get(ProductAttributesService);
        serviceInstance.setMandatoryDirectDebitFlag(contract, mandatoryDirectDebitProduct);

        // ASSERT
        expect(contract.isMandatoryDirectDebit).toBeTruthy();

    });
});
