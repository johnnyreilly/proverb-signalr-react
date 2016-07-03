export interface repositories {
    /**
     * Get named Repository (by injection)
     */
    getRepo: (repoName: string) => any;
}

export const repositoriesServiceFactoryName = "repositories";

repositoriesServiceFactory.$inject = ["$injector"];
export function repositoriesServiceFactory($injector: ng.auto.IInjectorService) {
    var service: repositories = {
        getRepo: getRepo,
    };

    return service;

    // Get named Repository Ctor (by injection), new it, and initialize it
    function getRepo(repoName: string) {
        var fullRepoName = "repository." + repoName.toLowerCase();
        var repo = $injector.get(fullRepoName);
        return repo;
        //var Repo = $injector.get(fullRepoName);
        //return new Repo(manager);
    }
}