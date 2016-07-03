import { common } from "../common/common";
import { config } from "../app";
import { loggerFunction } from "../common/logger";
import { sage } from "./repository.sage";

export interface saying {
    id: number;
    sageId: number;
    sage?: sage;
    text: string;
}

export const repositorySayingServiceName = "repository.saying";

export class RepositorySayingService {

    log: loggerFunction;
    rootUrl: string;
    cache: Map<number, saying>;

    static $inject = ["$http", "common", "config"];
    constructor(private $http: ng.IHttpService, private common: common, private config: config) {
        this.log = common.logger.getLogFn(repositorySayingServiceName);
        this.rootUrl = config.remoteServiceRoot + "saying";
        this.cache = new Map();
    }

    getAll() {
        return this.$http.get<saying[]>(this.rootUrl).then(response => {
            var sayings = response.data;
            this.log(sayings.length + " Sayings loaded");
            return sayings;
        });
    }

    getById(id: number, forceRemote?: boolean) {
        var saying: saying;
        if (!forceRemote) {
            saying = this.cache.get(id);
            if (saying) {
                this.log("Saying [id: " + saying.id + "] loaded from cache");
                return this.common.$q.when(saying);
            }
        }

        return this.$http.get<saying>(this.rootUrl + "/" + id).then(response => {
            saying = response.data;
            this.cache.set(saying.id, saying);
            this.log("Saying [id: " + saying.id + "] loaded");
            return saying;
        });
    }

    remove(id: number) {
        return this.$http.delete<void>(this.rootUrl + "/" + id).then(response => {
            this.log("Saying [id: " + id + "] removed");

            return response.data;
        }, errorReason => this.common.$q.reject(errorReason.data));
    }

    save(saying: saying) {
        return this.$http.post<number>(this.rootUrl, saying).then(response => {
            var sayingId = response.data || saying.id;

            this.log("Saying [id: " + sayingId + "] saved");

            return sayingId;
        }, errorReason => this.common.$q.reject(errorReason.data));
    }
}
