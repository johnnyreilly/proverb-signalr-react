import { commonServiceName, CommonService } from "../common/common";
import { configName, Config } from "../typesAndInterfaces/config";
import { LoggerFunction } from "../common/logger";
import { Sage } from "./repository.sage";

export interface Saying {
    id: number;
    sageId: number;
    sage?: Sage;
    text: string;
}

export const repositorySayingServiceName = "repository.saying";

export class RepositorySayingService {

    log: LoggerFunction;
    rootUrl: string;
    cache: Map<number, Saying>;

    static $inject = ["$http", commonServiceName, configName];
    constructor(private $http: ng.IHttpService, private common: CommonService, private config: Config) {
        this.log = common.logger.getLogFn(repositorySayingServiceName);
        this.rootUrl = config.remoteServiceRoot + "saying";
        this.cache = new Map();
    }

    getAll() {
        return this.$http.get<Saying[]>(this.rootUrl).then(response => {
            const sayings = response.data;
            this.log(sayings.length + " Sayings loaded");
            return sayings;
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

        return this.$http.get<Saying>(this.rootUrl + "/" + id).then(response => {
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

    save(saying: Saying) {
        return this.$http.post<number>(this.rootUrl, saying).then(response => {
            const sayingId = response.data || saying.id;

            this.log("Saying [id: " + sayingId + "] saved");

            return sayingId;
        }, errorReason => this.common.$q.reject(errorReason.data));
    }
}
