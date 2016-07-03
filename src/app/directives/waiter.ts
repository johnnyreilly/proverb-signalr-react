export const waiterName = "waiter";

waiter.$inject = [];
export function waiter() {
    // Usage:
    // <waiter is-waiting="vm.isBusy" spinner-options="vm.spinnerOptions" waitMessage="vm.busyMessage"></waiter>
    const directive = {
        link: link,
        restrict: "E",
        scope: {
            "isWaiting": "=",
            "spinnerOptions": "=",
            "waitMessage": "="
        },
        template: require("./waiter.html")
    };
    return directive;

    function link(scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) {
        // attrs.$set("class", "widget-head");
    }
}