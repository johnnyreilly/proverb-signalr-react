import { commonServiceName, CommonService } from "../common/common";
import { configName, Config } from "../typesAndInterfaces/config";
import $ from "jquery";
import "signalr";

export const connectionServiceName = "connection";

export class ConnectionService {

    connection: SignalR.Hub.Connection;

    static $inject = [commonServiceName, configName];
    constructor(private common: CommonService, private config: Config) {
        this.connection = $.hubConnection(config.remoteServiceRoot);
    }

    start() {
        return this.common.$q((resolve, reject) => this.connection.start().done(resolve).fail(reject));
    }
}
