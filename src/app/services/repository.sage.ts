import Moment from "moment";

import { commonServiceName, CommonService } from "../common/common";
import { configName, Config } from "../typesAndInterfaces/config";
import { LoggerFunction } from "../common/logger";
import { Saying } from "./repository.saying";
import { connectionServiceName, ConnectionService } from "./connection";
import { SaveResult } from "../typesAndInterfaces/saveResult";

export interface Sage {
    id: number;
    name: string;
    username: string;
    email: string;
    dateOfBirth: Date;
    sayings?: Saying[];
}

export const repositorySageServiceName = "repository.sage";

export class RepositorySageService {

    log: LoggerFunction;
    proxy: SignalR.Hub.Proxy;
    cache: Map<number, Sage>;

    static $inject = [commonServiceName, configName, "moment", connectionServiceName];
    constructor(private common: CommonService, private config: Config, private moment: typeof Moment, private connectionService: ConnectionService) {
        this.log = common.logger.getLogFn(repositorySageServiceName);
        this.proxy = connectionService.connection.createHubProxy("SageHub");
        this.proxy.on("getAllCalled", (name, message) => {
            this.log(name + " " + message);
        });
        this.cache = new Map();
    }

    getAll() {
        return this.common.$q<Sage[]>((resolve, reject) => {
            this.connectionService.connection.start().done(() => {
                this.proxy.invoke("GetAll").then((data: Sage[]) => {
                    const sages = data;
                    this.log(sages.length + " Sages loaded");
                    resolve(sages);
                }).fail(reject);
            }).fail(reject);
        });
    }

    getById(id: number, forceRemote?: boolean) {
        let sage: Sage;
        if (!forceRemote) {
            sage = this.cache.get(id);
            if (sage) {
                this.log("Sage " + sage.name + " [id: " + sage.id + "] loaded from cache");
                return this.common.$q.when(sage);
            }
        }

        return this.common.$q<Sage>((resolve, reject) => {
            this.connectionService.connection.start().done(() => {
                this.proxy.invoke("Get", { id }).then((data: Sage) => {
                    sage = data;
                    sage.dateOfBirth = this.moment(sage.dateOfBirth).toDate();
                    this.cache.set(sage.id, sage);
                    this.log("Sage " + sage.name + " [id: " + sage.id + "] loaded");
                    resolve(sage);
                }).fail(reject);
            }).fail(reject);
        });
    }

    remove(id: number) {
        return this.common.$q<void>((resolve, reject) => {
            this.connectionService.connection.start().done(() => {
                this.proxy.invoke("Remove", { id })
                    .then(data => {
                        this.log("Sage [id: " + id + "] removed");
                        resolve(data);
                    })
                    .fail(reject);
            }).fail(reject);
        });
    }

    save(sage: Sage) {
        return this.common.$q<SaveResult>((resolve, reject) => {
            this.connectionService.connection.start().done(() => {
                this.proxy.invoke("Save", { sage })
                    .then((saveResult: SaveResult) => {
                        this.log(`Sage ${ saveResult.isSaved ? `[id: ${ saveResult.savedId }] saved` : "save failed" }`);
                        resolve(saveResult);
                    })
                    .fail(reject);
            }).fail(reject);
        });
    }
}
