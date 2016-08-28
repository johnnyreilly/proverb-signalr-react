import { commonServiceName, CommonService } from "../common/common";
import { configName, Config } from "../typesAndInterfaces/config";
import { LoggerFunction } from "../common/logger";
import { connectionServiceName, ConnectionService } from "./connection";
import { Sage } from "./repository.sage";
import { SaveResult } from "../typesAndInterfaces/saveResult";
// import $ from "jquery";
// import "signalr";


export interface Saying {
    id: number;
    sageId: number;
    sage?: Sage;
    text: string;
}

export const repositorySayingServiceName = "repository.saying";


// const connection = $.hubConnection(__CONNECTION_URL__);
// const sayingHubProxy = connection.createHubProxy("SayingHub");
// contosoChatHubProxy.on('addContosoChatMessageToPage', function(name, message) {
//     console.log(name + ' ' + message);
// });
// connection.start().done(function() {
//     // Wire up Send button to call NewContosoChatMessage on the server.
//     $('#newContosoChatMessage').click(function () {
//         contosoChatHubProxy.invoke('newContosoChatMessage', $('#displayname').val(), $('#message').val());
//         $('#message').val('').focus();
//                 });
//     });

// connection.start().done(() => {
// sayingHubProxy.invoke("GetAllSayings").done(data => {
//         console.log ("signalr data", data);
//     }).fail(function (error) {
//         console.log("Invocation of NewContosoChatMessage failed. Error: " + error);
//     });
// });


export class RepositorySayingService {

    log: LoggerFunction;
    proxy: SignalR.Hub.Proxy;
    cache: Map<number, Saying>;

    static $inject = [commonServiceName, configName, connectionServiceName];
    constructor(private common: CommonService, private config: Config, private connectionService: ConnectionService) {
        this.log = common.logger.getLogFn(repositorySayingServiceName);
        this.proxy = connectionService.connection.createHubProxy("SayingHub");
        this.proxy.on("getAllCalled", (name, message) => {
            this.log(name + " " + message);
        });
        this.cache = new Map();
    }

    getAll() {
        return this.common.$q<Saying[]>((resolve, reject) => {
            this.connectionService.connection.start().done(() => {
                this.proxy.invoke("GetAll").then((data: Saying[]) => {
                    const sayings = data;
                    this.log(sayings.length + " Sayings loaded");
                    resolve(sayings);
                }).fail(reject);
            }).fail(reject);
        });
    }

    getById(id: number, forceRemote?: boolean) {
        let saying: Saying;
        if (!forceRemote) {
            saying = this.cache.get(id);
            if (saying) {
                this.log("Saying [id: " + saying.id + "] loaded from cache");
                return this.common.$q.when(saying);
            }
        }

        return this.common.$q<Saying>((resolve, reject) => {
            this.connectionService.connection.start().done(() => {
                this.proxy.invoke("Get", { id }).then((data: Saying) => {
                    saying = data;
                    this.cache.set(saying.id, saying);
                    this.log("Saying [id: " + saying.id + "] loaded");
                    resolve(saying);
                }).fail(reject);
            }).fail(reject);
        });
    }

    remove(id: number) {
        return this.common.$q<void>((resolve, reject) => {
            this.connectionService.connection.start().done(() => {
                this.proxy.invoke("Remove", { id })
                    .then(data => {
                        this.log("Saying [id: " + id + "] removed");
                        resolve(data);
                    })
                    .fail(reject);
            }).fail(reject);
        });
    }

    save(saying: Saying) {
        return this.common.$q<SaveResult>((resolve, reject) => {
            this.connectionService.connection.start().done(() => {
                this.proxy.invoke("Save", { saying })
                    .then((saveResult: SaveResult) => {
                        this.log(`Saying ${ saveResult.isSaved ? `[id: ${ saveResult.savedId }] saved` : "save failed" }`);
                        resolve(saveResult);
                    })
                    .fail(reject);
            }).fail(reject);
        });
    }
}
