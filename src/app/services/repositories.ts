export interface Repositories {
    /**
     * Get named Repository (by injection)
     */
    getRepo: (repoName: string) => any;
}

export const repositoriesName = "repositories";

repositoriesServiceFactory.$inject = ["$injector"];
export function repositoriesServiceFactory($injector: ng.auto.IInjectorService) {
    const service: Repositories = {
        getRepo: getRepo,
    };

    return service;

    // Get named Repository Ctor (by injection), new it, and initialize it
    function getRepo(repoName: string) {
        const fullRepoName = "repository." + repoName.toLowerCase();
        const repo = $injector.get(fullRepoName);
        return repo;
        // const Repo = $injector.get(fullRepoName);
        // return new Repo(manager);
    }
}