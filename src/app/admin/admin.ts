import { commonName, Common } from "../common/common";

interface AdminVm {
    title: string;
}

(function () {
    "use strict";
    const controllerId = "admin";
    angular.module("app").controller(controllerId, [commonName, admin]);

    function admin(common: Common) {
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