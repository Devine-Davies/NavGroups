export declare class Hooks {
    hooks: any;
    constructor();
    set(name?: string, cb?: any): void;
    call(hook_name?: string, args?: any): void;
    private get_hook_set_from_name(hook_name?);
    private initiate(set?, name?, cb?);
    private get_all_sets();
}
