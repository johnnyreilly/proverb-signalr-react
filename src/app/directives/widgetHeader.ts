export const widgetHeaderName = "widgetHeader";

widgetHeader.$inject = [];
export function widgetHeader() {
    // Usage:
    // <div widget-header title="vm.map.title"></div>
    const directive = {
        link: link,
        restrict: "A",
        scope: {
            "title": "@",
            "subtitle": "@",
            "rightText": "@",
            "allowCollapse": "@"
        },
        template: require("./widgetHeader.html")
    };
    return directive;

    function link(scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) {
        attrs.$set("class", "widget-head");
    }
}