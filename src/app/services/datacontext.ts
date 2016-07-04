import { repositoriesName, Repositories } from "./repositories";
import { RepositorySayingService } from "./repository.saying";
import { RepositorySageService } from "./repository.sage";

export interface DataContext {
    [index: string]: any; // Because of this issue: https://typescript.codeplex.com/discussions/535628
    saying: RepositorySayingService;
    sage: RepositorySageService;
}

export const datacontextName = "datacontext";

datacontextServiceFactory.$inject = [repositoriesName];
export function datacontextServiceFactory(repositories: Repositories) {

    const service: DataContext = {
        // Undefined members will be replaced with properties in defineLazyLoadedRepos
        saying: undefined,
        sage: undefined
    };

    defineLazyLoadedRepos();

    return service;


    /**
     * Replace undefined members on service with ES5 properties for each repo
     */
    function defineLazyLoadedRepos() {

        const repoNames: string[] = [];
        for (const key in service) {
            if (service.hasOwnProperty(key) && (service[key] === undefined)) {
                repoNames.push(key);
            }
        }

        repoNames.forEach(function (name) {
            Object.defineProperty(service, name, {
                configurable: true, // will redefine this property once
                get: function () {
                    // The 1st time the repo is request via this property,
                    // we ask the repositories for it (which will inject it).
                    const repo = repositories.getRepo(name);
                    // Rewrite this property to always return this repo;
                    // no longer redefinable
                    Object.defineProperty(service, name, {
                        value: repo,
                        configurable: false,
                        enumerable: true
                    });
                    return repo;
                }
            });
        });
    }
}