import { AglCurrencyPipe } from './aglCurrency.pipe';

describe('AGL Currency pipe', () => {
    describe('Far a valid amount', () => {
        it ('Should output leading $ symbol', () => {
            // Arrange
            const aglCurrencyPipe = new AglCurrencyPipe();

            // Act
            const actual = aglCurrencyPipe.transform(0.35);

            // Assert
            expect(actual.startsWith('$')).toBeTruthy(`value was ${actual}`);
        });
    });

    describe('For cents only', () => {
        it ('Should use zero for dollar value', () => {
            // Arrange
            const aglCurrencyPipe = new AglCurrencyPipe();

            // Act
            const actual = aglCurrencyPipe.transform(0.35);

            // Assert
            expect(actual).toBe('$0.35');
        });
    });
});
