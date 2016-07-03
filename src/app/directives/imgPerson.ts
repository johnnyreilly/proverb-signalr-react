import { config } from "../app";

export const imgPersonName = "imgPerson";

imgPerson.$inject = ["config"];
export function imgPerson(config: config) {
    //Usage:
    //<img img-person="{{s.speaker.imageSource}}"/>
    var basePath = config.imageSettings.imageBasePath;
    var unknownImage = config.imageSettings.unknownPersonImageSource;
    var directive = {
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