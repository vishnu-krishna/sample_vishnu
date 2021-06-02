import { Product } from './../model/product/product.model';
import { Observable } from 'rxjs/Rx';
import { get } from '@typed/hashmap';
import { ProductApiService } from './productApi.service';
import { Mock } from 'ts-mocks/lib';
import { IProductRepository } from '../repository/contract/iproduct.repository';

describe('Product API service', () => {
    describe('GetProductAttribute', () => {
        describe('When object with no property', () => {
            it ('Should return "null"', () => {
                // ARRANGE
                const productRepository = new Mock<IProductRepository>();
                productRepository
                    .setup((r) => r.get)
                    .Spy.and.returnValue(Observable.of({}));

                const target = new ProductApiService(productRepository.Object);

                // ACT

                const productObservable = target.GetProductAttribute('Dummy');

                // ASSERT

                productObservable.subscribe((product) => {
                    expect(product).toBeNull();
                });
            });
        });

        describe('When object with "attributes" but no "id"', () => {
            it ('Should return "null"', () => {
                // ARRANGE
                const productRepository = new Mock<IProductRepository>();
                productRepository
                    .setup((r) => r.get)
                    .Spy.and.returnValue(Observable.of({ attributes: [] }));

                const target = new ProductApiService(productRepository.Object);

                // ACT

                const productObservable = target.GetProductAttribute('Dummy');

                // ASSERT

                productObservable.subscribe((product) => {
                    expect(product).toBeNull();
                });
            });
        });

        describe('When object with "id" but no "attributes"', () => {
            it ('Should return "null"', () => {
                // ARRANGE
                const productRepository = new Mock<IProductRepository>();
                productRepository
                    .setup((r) => r.get)
                    .Spy.and.returnValue(Observable.of({ id: 'q' }));

                const target = new ProductApiService(productRepository.Object);

                // ACT

                const productObservable = target.GetProductAttribute('Dummy');

                // ASSERT

                productObservable.subscribe((product) => {
                    expect(product).toBeNull();
                });
            });
        });

        describe('When object with "id" and "attributes"', () => {
            it ('Should return non null product', () => {
                // ARRANGE
                const productRepository = new Mock<IProductRepository>();
                productRepository
                    .setup((r) => r.get)
                    .Spy.and.returnValue(Observable.of({ attributes: [], id: 'q' }));

                const target = new ProductApiService(productRepository.Object);

                // ACT

                const productObservable = target.GetProductAttribute('Dummy');

                // ASSERT

                productObservable.subscribe((product) => {
                    expect(product).not.toBeNull();
                });
            });
        });
    });
});
