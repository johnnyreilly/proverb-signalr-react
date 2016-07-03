// Thanks @Basarat! http://stackoverflow.com/a/24863256/761388
function safeWatch<T extends Function>(expression: T) {
    return () => {
        try {
            return expression();
        }
        catch (e) {
            return null;
        }
    };
}

// Plant a validation message to the right of the element when it is declared invalid by the server
export const serverErrorName = "serverError";

serverError.$inject = [];
export function serverError() {

    // Usage:
    // <input class="col-xs-12 col-sm-9" name="sage.name" ng-model="vm.sage.name" server-error="vm.errors" />

    const directive = {
        link: link,
        restrict: "A",
        require: "ngModel" // Make Angular supply the ngModel controller as the 4th parameter in the link function
    };
    return directive;

    function link(scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ngModelController: ng.INgModelController) {
        // Extract values from attributes (deliberately not using isolated scope because using Angular UI)
        const errorKey: string = attrs["name"]; // eg "sage.name"
        const errorDictionaryExpression: string = attrs["serverError"]; // eg "vm.errors"

        // Bootstrap alert template for error
        const template = '<div class="alert alert-danger" role="alert"><i class="glyphicon glyphicon-warning-sign larger"></i> %error%</div>';

        // Create an element to hold the validation message
        const decorator = angular.element("<div></div>");
        element.after(decorator);

        // Watch ngModelController.$error.server & show/hide validation accordingly
        scope.$watch(safeWatch(() => ngModelController.$error.server), showHideValidation);

        function showHideValidation(serverError: boolean) {

            // Display an error if serverError is true otherwise clear the element
            let errorHtml = "";
            if (serverError) {
                const errorDictionary: { [field: string]: string } = scope.$eval(errorDictionaryExpression);
                errorHtml = template.replace(/%error%/, errorDictionary[errorKey] || "Unknown error occurred...");
            }
            decorator.html(errorHtml);
        }

        // wipe the server error message upon keyup or change events so can revalidate with server 
        element.on("keyup change", (event) => {
            scope.$apply(() => { ngModelController.$setValidity("server", true); });
        });
    }
}

// upon keyup / change events set validity to true - to be used alongside tooltip
export const serverErrorTooltipName = "serverErrorTooltip";

serverErrorTooltip.$inject = ["$compile"];
export function serverErrorTooltip($compile: ng.ICompileService) {

    // Usage:
    // <input class="col-xs-12 col-sm-9" name="sage.name" ng-model="vm.sage.name"
    //        server-error-tooltip tooltip="{{vm.errors['sage.name']}}" />

    const directive = {
        link: link,
        restrict: "A",
        require: "ngModel", // Make Angular supply the ngModel controller as the 4th parameter in the link function
    };
    return directive;

    function link(scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ngModelController: ng.INgModelController) {

        // wipe the server error message upon keyup or change events so can revalidate with server 
        element.on("keyup change", (event) => {
            scope.$apply(() => { ngModelController.$setValidity("server", true); });
        });
    }
}