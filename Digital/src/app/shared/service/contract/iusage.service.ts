import { Observable } from 'rxjs/Observable';
import { ContractViewModel } from '../../../myAccount/services/account.service';
import { UsageDataModel } from '../../model/usage/usageData.model';

export abstract class IUsageService {

    /**
     * Gets the basic usage available for the specified contract
     * @param contractNumber The contract number of the usage data required
     */
    public abstract GetBasic(contractNumber: string): Observable<UsageDataModel>;

    /**
     * Gets the monthly usage data for the specified contract
     * @param contractNumber The contract number of the usage data required
     */
    public abstract GetMonthly(contractNumber: string): Observable<UsageDataModel>;

    /**
     * Gets a single monthly data item, if the specifed day is within that month. Always returns a UsageDataModel.
     *
     * Example Use:
     * If you request data for the day 2017-03-17, and montly data exists for the month of March,
     * then a single record of cost and consumption of the montly usage data for March will be returned. If you request
     * data for a day of a month, where no usage data exists for that month, then the UsageDataModel will have no cost or consumption data
     *
     * @param contract The contract of the usage data required
     * @param day The day within a month
     */
    public abstract GetMonthlyForDay(contract: ContractViewModel, day: Date): Observable<UsageDataModel>;

    /**
     * Gets the usage data for an incomplete month, by adding the sum of the daily data within that month
     * @param contractNumber The contract number of the usage data required
     */
    public abstract GetMonthSoFar(contractNumber: string): Observable<UsageDataModel>;

    /**
     * Gets the daily data for the specified contract
     * @param contractNumber The contract number of the usage data required
     */
    public abstract GetDaily(contractNumber: string): Observable<UsageDataModel>;

    /**
     * Gets the daily usage data for a specified month and contract
     * @param contract The contract of the usage data required
     * @param date A date that resides in the same month as the monthly data you require
     */
    public abstract GetDailyForMonth(contract: ContractViewModel, date: Date): Observable<UsageDataModel>;

    /**
     * Determines if a specified month has a complete set of data. This is determined by ensuring that we have daily data for the whole month
     * Returns true if the specified month has a complete set of data. False if it does not.
     *
     * @param contract The contract of the usage data required
     * @param month A date that resides in the same month as the data you require
     */
    public abstract HaveCompleteDailyDataForMonth(contract: ContractViewModel, month: Date): Observable<boolean>;

    /**
     * Gets the hourly usage for specified contract
     * @param contractNumber The contract number of the usage data required
     */
    public abstract GetHourly(contractNumber: string): Observable<UsageDataModel>;

    /**
     * Gets the hourly usage for a specified day only
     * @param contractNumber The contract number of the usage data required
     * @param date The day for which you require hourly usage data
     */
    public abstract GetHourlyForDate(contractNumber: string, date: Date): Observable<UsageDataModel>;

}
