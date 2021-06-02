import { UserProfileModel } from './userProfile.model';
import { UserProfileResultOutcomeModel } from './userProfileResultOutcome.model';

export class CustomerUserProfileResultModel {
    public customer: UserProfileModel;
    public outcome: UserProfileResultOutcomeModel;
}
