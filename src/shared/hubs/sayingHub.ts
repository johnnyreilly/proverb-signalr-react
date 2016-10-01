import { getConnection, performHubAction } from "./connection";
import { getLogger, Logger } from "../utils/logger";
import { Saying } from "../domain/dtos/saying";
import { SaveResult } from "../domain/saveResult";
import { loadedSaying, loadedSayings, removedSaying, savedSaying, saveFailed } from "../actions/sayingActions";
import { signalRProxyInvokeFailed } from "../actions/dataActions";

const hubName = "sayingHub";

export class SayingHub {
    logger: Logger;
    connection: SignalR.Hub.Connection;
    proxy: SignalR.Hub.Proxy;

    constructor() {
        this.logger = getLogger(hubName);
        this.connection = getConnection();
        this.proxy = this.connection.createHubProxy(hubName);
        this.proxy.on("getAllCalled", (name, message) => {
            console.log(name + " " + message); // tslint:disable-line
        });
    }

    getAll() {
        performHubAction(() =>
            this.proxy.invoke("getAll").then(loadedSayings).fail(signalRProxyInvokeFailed));
    }

    getById(id: number) {
        performHubAction(() =>
            this.proxy.invoke("get", id).then(loadedSaying).fail(signalRProxyInvokeFailed));
    }

    remove(id: number) {
        performHubAction(() =>
            this.proxy.invoke("remove", id).then(removedSaying).fail(signalRProxyInvokeFailed));
    }

    save(saying: Saying) {
        performHubAction(() => this.proxy.invoke("save", saying)
            .then((saveResult: SaveResult) => {
                if (saveResult.isSaved) {
                    savedSaying(saveResult.savedId);
                }
                else {
                    saveFailed(saveResult.validations);
                }
            })
            .fail(signalRProxyInvokeFailed));
    }
}

export default new SayingHub();
