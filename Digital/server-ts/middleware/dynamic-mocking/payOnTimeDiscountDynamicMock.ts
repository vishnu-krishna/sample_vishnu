import * as express from 'express';
import { overwriteResponse } from './dynamicMocks';

import { DynamicMockKey, DynamicMockDesiredState, DynamicMock } from './../../../src/app/myAccount/mockManager/models/dynamicMock';
import { PaymentApiModel } from './../../../src/app/shared/service/api.service';
import { Product } from './../../../src/app/shared/model/product/product.model';
import { ProductAttributeModel } from './../../../src/app/shared/model/product/productAttribute.model';

export class PayOnTimeDiscountDynamicMock {
    public static readonly payOnTimeDiscountAttributeId: string = 'ZPOT_TYP';
    private static readonly potdOnRequestedDynamicMockKey = DynamicMock.generateKey(DynamicMockKey.potdProducts, DynamicMockDesiredState.enabled);
    private static readonly potdOffRequestedDynamicMockKey = DynamicMock.generateKey(DynamicMockKey.potdProducts, DynamicMockDesiredState.disabled);

    public static alterPaymentsApiResponse(req: express.Request, res: express.Response, next: express.NextFunction): void {
        overwriteResponse(req, res, PayOnTimeDiscountDynamicMock.potdOnRequestedDynamicMockKey, (body?: any) => {
            let payments: PaymentApiModel[] = body;
            if (payments) {
                payments.forEach((payment) => {
                    const potdDiscount = 0.1; // just choose some arbitrary value
                    const noCurrentPotdValue = (payment.payOnTimeDiscount || 0) === 0;
                    const isNotOverdue = (payment.overdue || 0) === 0;

                    if (noCurrentPotdValue && isNotOverdue && payment.currentBalance > 0) {
                        payment.payOnTimeDiscount = +(payment.currentBalance * potdDiscount).toFixed(2);
                        payment.currentBalanceExcludingPayOnTimeDiscount = payment.currentBalance + payment.payOnTimeDiscount;
                    }
                });
            }
        });

        overwriteResponse(req, res, PayOnTimeDiscountDynamicMock.potdOffRequestedDynamicMockKey, (body?: any) => {
            let payments: PaymentApiModel[] = body;
            if (payments) {
                payments.forEach((payment) => {
                    payment.payOnTimeDiscount = 0;
                    payment.currentBalanceExcludingPayOnTimeDiscount = 0;
                });
            }
        });

        next();
    }

    public static alterProductApiResponse(req: express.Request, res: express.Response, next: express.NextFunction): void {
        overwriteResponse(req, res, PayOnTimeDiscountDynamicMock.potdOnRequestedDynamicMockKey, (body?: any) => {
            let product: Product = body;
            if (product) {
                let found = product.attributes.some((attribute: ProductAttributeModel) => attribute.id === PayOnTimeDiscountDynamicMock.payOnTimeDiscountAttributeId);

                if (!found) {
                    product.attributes.push({
                        id: PayOnTimeDiscountDynamicMock.payOnTimeDiscountAttributeId,
                        description: 'A dynamically mocked POTD Product',
                        regionId: null,
                        dataType: 'String',
                        value: 'COMBINED',
                        valueDescription: 'usage and supply',
                        unitOfMeasure: null
                    });
                }
            }
        });

        overwriteResponse(req, res, PayOnTimeDiscountDynamicMock.potdOffRequestedDynamicMockKey, (body?: any) => {
            let product: Product = body;
            if (product) {
                product.attributes.forEach((attribute) => {
                    if (attribute.id === PayOnTimeDiscountDynamicMock.payOnTimeDiscountAttributeId) {
                        attribute.id = `not_${attribute.id}`;
                        attribute.description = `Not ${attribute.description}`;
                    }
                });
            }
        });

        next();
    }
}
