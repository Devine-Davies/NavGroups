import * as React from "react";
export interface NavGroupProps {
    name?: string;
    direction?: string;
    historyItem?: boolean;
    activeClassName?: string;
    onEnter?: string;
    onBack?: string;
    onUp?: string;
    onRight?: string;
    onDown?: string;
    onLeft?: string;
}
export declare class NavGroup extends React.Component<NavGroupProps, undefined> {
    private _NgController;
    nav_group: any;
    nav_group_name: string;
    last_active_navitem_name: string;
    constructor();
    get_name(): string;
    get_active_class_name(): string;
    get_direction(): string;
    get_history_item(): boolean;
    toggle_active(): void;
    make_active(): void;
    indicate_active_item(active_navitem_name?: string, item_was_given_name?: boolean): void;
    gen_random_name(): string;
    componentDidMount(): void;
    recursiveCloneChildren(children: any): React.SFCElement<{
        ref: number;
    }>[];
    fetch_instruction(instruction?: string): any;
    render(): JSX.Element;
}
