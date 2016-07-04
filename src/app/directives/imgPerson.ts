import { configName, Config } from "../typesAndInterfaces/config";

export const imgPersonName = "imgPerson";

imgPerson.$inject = [configName];
export function imgPerson(config: Config) {
    // Usage:
    // <img img-person="{{s.speaker.imageSource}}"/>
    const basePath = config.imageSettings.imageBasePath;
    const unknownImage = config.imageSettings.unknownPersonImageSource;
    const directive = {
        link: link,
        restrict: "A"
    };
    return directive;

    function link(scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) {
        attrs.$observe("ccImgPerson", function(value: string) {
            value = basePath + (value || unknownImage);
            attrs.$set("src", value);
        });
    }
}