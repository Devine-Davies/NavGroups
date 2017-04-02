export declare class _Hooks {
    _GatewayClient: any;
    hook_sets: string[];
    hooks: any;
    constructor();
    set(hook_info?: any): void;
    call(hook_name?: string, args?: any): void;
    private get_hook_set_from_name(hook_name?);
    private initiate_hook(hook_set?, hook_name?, hook_info?);
    private invoke_client_hook(hook_name?);
}
export declare var Hooks: _Hooks;
