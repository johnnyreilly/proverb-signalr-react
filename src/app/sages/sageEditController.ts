import { commonServiceName, CommonService } from "../common/common";
import { modalDialogServiceName, ModalDialogService } from "../common/modalDialog";
import { Loggers } from "../common/logger";
import { datacontextName, DataContext } from "../services/datacontext";
import { Sage } from "../services/repository.sage";

export const sageEditControllerName = "sageEdit";

export interface SageEditRouteParams extends ng.ui.IStateParamsService {
    id: string;
}

export interface SageEditScope extends ng.IScope {
    form: ng.IFormController;
}

export class SageEditController {

    dateOfBirthDatePickerIsOpen: boolean;
    errors: Map<string, string>;
    log: Loggers;
    sage: Sage;
    title: string;

    _isSavingOrRemoving: boolean;

    static $inject = ["$location", "$stateParams", "$scope", modalDialogServiceName, commonServiceName, datacontextName];
    constructor(
        private $location: ng.ILocationService,
        private $stateParams: SageEditRouteParams,
        public  $scope: SageEditScope,
        private modalDialog: ModalDialogService,
        private common: CommonService,
        private datacontext: DataContext
        ) {

        this.dateOfBirthDatePickerIsOpen = false;
        this.errors = new Map();
        this.log = common.logger.getLoggers(sageEditControllerName);
        this.sage = undefined;
        this.title = "Sage Edit";

        this._isSavingOrRemoving = false;

        this.activate();
    }

    // Prototype methods

    activate() {
        const id = parseInt(this.$stateParams.id, 10);
        const dataPromises: ng.IPromise<any>[] = [this.datacontext.sage.getById(id).then(sage => this.sage = sage)];

        this.common.activateController(dataPromises, sageEditControllerName, this.title)
            .then(() => {
                this.log.info("Activated Sage Edit View");
                this.title = "Sage Edit: " + this.sage.name;
            });
    }

    dateOfBirthDatePickerOpen() {
        this.dateOfBirthDatePickerIsOpen = true;
    }

    remove() {

        const sageToRemove = this.sage.name;

        this.modalDialog.deleteDialog("Do you want to remove " + sageToRemove + "?")
            .then(() => {

                this._isSavingOrRemoving = true;

                this.common.waiter(this.datacontext.sage.remove(this.sage.id), sageEditControllerName, "Removing " + sageToRemove)
                    .then(response => {

                        this.log.success("Removed " + sageToRemove);
                        this.$location.path("/sages");
                    })
                    .catch(response => {
                        this.log.error("Failed to remove " + sageToRemove, response);
                    })
                    .finally(() => this._isSavingOrRemoving = false);
            });
    }

    save() {

        this.errors.clear(); // Wipe server errors
        this._isSavingOrRemoving = true;

        const sageToSave = this.sage.name;

        this.common.waiter(this.datacontext.sage.save(this.sage), sageEditControllerName, "Saving " + sageToSave)
            .then(response => {

                this.log.success("Saved " + sageToSave);
                this.$location.path("/sages/detail/" + this.sage.id);
            })
            .catch(response => {

                if (response.errors) {

                    angular.forEach(response.errors, (errors, field) => {
                        const model: ng.INgModelController = this.$scope.form[field];
                        if (model) {
                            model.$setValidity("server", false);
                        }
                        else {
                            // No screen element to tie failure message to so pop a toast
                            this.log.error(errors);
                        }
                        this.errors.set(field, errors.join(","));
                    });
                }
                else {
                    this.log.error("Failed to save " + sageToSave, response);
                }
            })
            .finally(() => this._isSavingOrRemoving = false);
    }

    // Properties

    get hasChanges(): boolean {
        return this.$scope.form.$dirty;
    }

    get canSave(): boolean {
        return this.hasChanges && !this.isSavingOrRemoving && this.$scope.form.$valid;
    }

    get isSavingOrRemoving(): boolean {
        return this._isSavingOrRemoving;
    }
}
