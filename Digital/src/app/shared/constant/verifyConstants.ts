export class VerifyConstants {

    // constants
    public static customerTypes = {
        residential: 'R',
        commercialAndIndustrial: 'L',
        smallAndMediumEnterprise: 'B'
    };
    public static verificationIdTypes = {
        drivingLicenseNumber: 'drivingLicenseNumber',
        medicareNumber: 'medicareNumber',
        passportNumber: 'passportNumber',
        phoneNumber: 'phoneNumber',
        nameAsOnBill: 'nameAsOnBill',
        abn: 'abn',
        acn: 'acn',
        dob: 'dob'
    };

    public static verificationTypes = {
        oneType: 'oneType',
        twoType: 'twoType'
    };

    public static verificationStatuses = {
        fail: 'fail',
        pass: 'pass',
        oneFieldVerified: 'oneFieldVerified',
        exceededTryCount: 'exceededTryCount'
    };
}
