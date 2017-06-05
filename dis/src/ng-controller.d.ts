export declare class _NgController {
    nav_groups_indexing: string[];
    nav_groups: any;
    active_navgroup: any;
    active_navitem: any;
    history_stack: any;
    keys: any;
    default_actions: any;
    constructor(_Hooks?: any);
    add_new_nav_group(navgroup_obj?: any): void;
    append_new_nav_item(nav_group_name?: string, nav_item?: any): void;
    private add_window_key_events();
    private key_invoked(event?);
    private analyse_instructions(instruction?);
    private move_to_new_nav_group(instruction?, nav_item_name?);
    private move_to_new_nav_item(instruction?);
    private get_item_in_group(item_name?);
    private get_next_nav_group(nav_group_name?, dir?);
    private get_next_nav_item(nav_item_name?, direction?);
}
export declare var NgController: _NgController;
