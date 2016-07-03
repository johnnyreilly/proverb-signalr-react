export const widgetMinimizeName = "widgetMinimize";

widgetMinimize.$inject = [];
export function widgetMinimize() {
    // Usage:
    // <a widget-minimize></a>
    // Creates:
    // <a widget-minimize="" href="#"><i class="fa fa-chevron-up"></i></a>
    const directive = {
        link: link,
        template: '<i class="fa fa-chevron-up"></i>',
        restrict: "A"
    };
    return directive;

    function link(scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) {
        // $("body").on("click", ".widget .wminimize", minimize);
        attrs.$set("href", "#");
        attrs.$set("wminimize", undefined);
        element.click(minimize);

        function minimize(e: Event) {
            e.preventDefault();
            const $wcontent = element.parent().parent().next(".widget-content");
            const iElement = element.children("i");
            if ($wcontent.is(":visible")) {
                iElement.removeClass("fa fa-chevron-up");
                iElement.addClass("fa fa-chevron-down");
            } else {
                iElement.removeClass("fa fa-chevron-down");
                iElement.addClass("fa fa-chevron-up");
            }
            $wcontent.toggle(500);
        }
    }
}
