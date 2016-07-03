import Spinner from "spin.js";

interface SpinnerScope extends ng.IScope {
    spinner: Spinner;
}

interface SpinnerAttributes extends ng.IAttributes {
    spinner: any;
}

export const spinnerName = "spinner";

spinner.$inject = [];
export function spinner() {
    // Description:
    //  Creates a new Spinner and sets its options
    // Usage:
    //  <div spinner="vm.spinnerOptions"></div>
    const directive = {
        link: link,
        restrict: "A"
    };
    return directive;

    function link(scope: SpinnerScope, element: ng.IAugmentedJQuery, attrs: SpinnerAttributes) {
        scope.spinner = null;
        scope.$watch(attrs.spinner, function (options) {
            if (scope.spinner) {
                scope.spinner.stop();
            }
            scope.spinner = new Spinner(options);
            scope.spinner.spin(element[0]);
        }, true);
    }
}