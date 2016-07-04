import { commonServiceName, CommonService } from "../common/common";

interface AdminVm {
    title: string;
}

(function () {
    "use strict";
    const controllerId = "admin";
    angular.module("app").controller(controllerId, [commonServiceName, admin]);

    function admin(common: CommonService) {
        const log = common.logger.getLoggers(controllerId);

        const vm: AdminVm = this;
        vm.title = "Admin";

        activate();

        function activate() {
            common.activateController([], controllerId, vm.title)
                .then(function () { log.info("Activated Admin View"); });
        }
    }
})();