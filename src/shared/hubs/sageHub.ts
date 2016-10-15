import { getConnection, performHubAction } from "./connection";
import { getLogger, Logger } from "../utils/logger";
import { Sage } from "../domain/dtos/sage";
import { SaveResult } from "../domain/saveResult";
import { loadedSage, loadedSages, removedSage, savedSage, saveFailed } from "../actions/sageActions";
import { signalRProxyInvokeFailed } from "../actions/dataActions";

export const hubName = "sageHub";

export class SageHub {
    logger: Logger;
    connection: SignalR.Hub.Connection;
    proxy: SignalR.Hub.Proxy;

    constructor() {
        this.logger = getLogger(hubName);
        this.connection = getConnection();
        this.proxy = this.connection.createHubProxy(hubName);
        this.proxy.on("getAllCalled", (name, message) => this.logger.info(name + " " + message));
        this.proxy.on("sagesUpdated", (sages) => {
            this.logger.info("sages updated", sages);
            loadedSages(sages);
        });
    }

    getAll() {
        performHubAction(() =>
            this.proxy.invoke("getAll").then(loadedSages).fail(signalRProxyInvokeFailed));
    }

    getById(id: number) {
        performHubAction(() =>
            this.proxy.invoke("get", id).then(loadedSage).fail(signalRProxyInvokeFailed));
    }

    remove(id: number) {
        performHubAction(() =>
            this.proxy.invoke("remove", id).then(() => removedSage(id)).fail(signalRProxyInvokeFailed));
    }

    save(saying: Sage) {
        performHubAction(() => this.proxy.invoke("save", saying)
            .then((saveResult: SaveResult) => {
                if (saveResult.isSaved) {
                    savedSage(saveResult.savedId);
                }
                else {
                    saveFailed(saveResult.validations);
                }
            })
            .fail(signalRProxyInvokeFailed));
    }
}

export default new SageHub();
