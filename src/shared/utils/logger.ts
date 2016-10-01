export function getLogger(context: string) {
    return {
        info: (...args: any[]) => console.info([context, ...args]), // tslint:disable-line
        error: (...args: any[]) => console.error([context, ...args]), // tslint:disable-line
        log: (...args: any[]) => console.log([context, ...args]) // tslint:disable-line
    };
}

export interface Logger {
    info: (...args: any[]) => void;
    error: (...args: any[]) => void;
    log: (...args: any[]) => void;
}
