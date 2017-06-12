import { Hooks } from './../hooks';
export declare class _NgController extends Hooks {
    navgroups_indexing: string[];
    navgroups: any;
    active_navgroup: any;
    active_navitem: any;
    history_stack: any;
    default_actions: any;
    keys: any;
    constructor();
    add_new_nav_group(NavGroupComp?: any): void;
    append_new_nav_item(group_name?: string, NavItemComp?: any): void;
    private add_window_key_events();
    private key_invoked(action?);
    run_instructions(instruction?: string): void;
    run_action(event?: string): void;
    private analyse_instruction(instruction?);
    private move_to_new_nav_group(instruction?, navitem_name?);
    private get_next_nav_group(nav_group_name?, dir?);
    private move_to_new_nav_item(instruction?);
    private get_item_in_group(item_name?);
    private get_next_nav_item(nav_item_name?, direction?);
}
export declare var NgController: _NgController;
