import { FeatureIntro } from '../shared/featureIntro';

export class FeatureIntroHelper {
    public static getFirstNonViewedFeatureIntro(featureIntros: FeatureIntro[]): FeatureIntro {
        let result: FeatureIntro;

        let nonViewedIntros = featureIntros.filter((featureIntro) => !featureIntro.hasViewed);
        if (nonViewedIntros.length > 0) {
            result = nonViewedIntros[nonViewedIntros.length - 1];
        }

        return result;
    }
}
