import * as React from 'react';
export interface NavItemProps {
    name?: string;
    startingPoint?: boolean;
    entryPoint?: boolean;
    activeClassName?: string;
    onEnter?: string;
    onBack?: string;
    onUp?: string;
    onRight?: string;
    onDown?: string;
    onLeft?: string;
}
export declare class NavItem extends React.Component<NavItemProps, undefined> {
    private _NgController;
    navitem: HTMLElement;
    nav_item_name: string;
    constructor();
    get_active_class_name(): string;
    is_entry_point(): boolean;
    was_given_name(): boolean;
    componentDidMount(): void;
    toggle_active(): void;
    make_active(): void;
    remove_active(): void;
    get_name(): string;
    gen_random_name(): string;
    fetch_instruction(instruction?: string): any;
    recursiveCloneChildren(children: any): any[];
    render(): JSX.Element;
}
