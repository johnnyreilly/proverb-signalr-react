import { commonServiceName, CommonService } from "../common/common";
import { modalDialogServiceName, ModalDialogService } from "../common/modalDialog";
import { Loggers } from "../common/logger";
import { datacontextName, DataContext } from "../services/datacontext";
import { Sage } from "../services/repository.sage";
import { Saying } from "../services/repository.saying";

export const sayingEditControllerName = "sayingEdit";

interface SayingEditRouteParams extends ng.ui.IStateParamsService {
    id: string;
}

interface SayingEditScope extends ng.IScope {
    form: ng.IFormController;
}

export class SayingEditController {

    errors: Map<string, string>;;
    log: Loggers;
    sages: Sage[];
    saying: Saying;
    title: string;

    private _isSavingOrRemoving: boolean;

    static $inject = ["$location", "$stateParams", "$scope", modalDialogServiceName, commonServiceName, datacontextName];
    constructor(
        private $location: ng.ILocationService,
        private $stateParams: SayingEditRouteParams,
        private $scope: SayingEditScope,
        private bsDialog: ModalDialogService,
        private common: CommonService,
        private datacontext: DataContext
        ) {

        this.errors = new Map();
        this.log = common.logger.getLoggers(sayingEditControllerName);
        this.sages = [];
        this.saying = undefined;

        this._isSavingOrRemoving = false;

        this.activate();
    }

    // Prototype methods

    activate() {

        const id = parseInt(this.$stateParams.id, 10);
        const dataPromises: ng.IPromise<any>[] = [this.datacontext.sage.getAll().then(data => this.sages = data)];
        let title: string;

        if (id) {
            dataPromises.push(this.datacontext.saying.getById(id, true).then(saying => this.saying = saying));
            title = "Saying Edit";
        }
        else {
            title = "Saying Add";
        }

        this.common.activateController(dataPromises, sayingEditControllerName, title)
            .then(() => {
                this.log.info("Activated " + title + " View");
                this.title = title;

                if (id) {
                    // Set the saying's sage by looking it up in the sages already loaded
                    this.saying.sage = this.sages.find(s => s.id === this.saying.sageId);
                }
            });
    }

    remove() {

        this.bsDialog.deleteDialog("Do you want to remove this saying?")
            .then(() => {

                this._isSavingOrRemoving = true;

                this.common.waiter(this.datacontext.saying.remove(this.saying.id), sayingEditControllerName, "Removing saying")
                    .then(response => {

                        this.log.success("Removed saying");
                        this.$location.path("/sayings/").search("sageId", this.saying.sageId);
                    })
                    .catch(response => {
                        this.log.error("Failed to remove saying", response);
                    })
                    .finally(() => this._isSavingOrRemoving = false);
            });
    }

    save() {

        this.errors.clear(); // Wipe server errors
        this._isSavingOrRemoving = true;

        // Prepare the saying to save - send the minimal payload of data across the wire
        const sayingToSave = angular.copy(this.saying);
        if (sayingToSave.sage) {
            sayingToSave.sageId = sayingToSave.sage.id;
        }
        else {
            sayingToSave.sageId = 0;
        }
        sayingToSave.sage = null;

        this.common.waiter(this.datacontext.saying.save(sayingToSave), sayingEditControllerName, "Saving saying")
            .then(sayingId => {

                this.log.success("Saved saying");
                this.$location.path("/sayings/").search("sageId", sayingToSave.sageId);
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
                    this.log.error("Failed to save saying", response);
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
