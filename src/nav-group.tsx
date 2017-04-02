import * as React from "react";
import * as ReactDOM from "react-dom";
import { NgController } from "./ng-controller";

export interface NavGroupProps {
    /* -- Name the group -- */
    name?            : string;

    /* -- horizontal || vertical */
    direction?       : string; 

    /* -- When entering the group it to remember the last active item and use that 
    -- */
    historyItem?     : boolean;

    /* -- When added to the group the group will add the call of the item it's self, 
    -- if the item has been given a nam  -- */
    // indicateActiveItem? : boolean;

    /* -- class name to use when active -- */
    activeClassName?    : string;

    /* -- Here are our events for the navGroups-- */
    onEnter?       : string;
    onBack?        : string;
    onUp?          : string;
    onRight?       : string;
    onDown?        : string;
    onLeft?        : string;

    // onExit?       : any;
    // onEntrance?   : any;
}

export class NavGroup extends React.Component<NavGroupProps, undefined> {

    private _NgController: any;
    
    nav_group      : any = null;
    nav_group_name : string = null;

    last_active_navitem_name : string = null;

    public constructor() {
        super();
        this._NgController = NgController;
    }

    /*------------------------------------------------------
    * Get name
    * returns the NavGroups name from the attribute
    * if no attribute has been given, a random name is generated and that is returned
    -- */
    get_name()              : string  { return this.nav_group_name; }
    get_active_class_name() : string  { return ( this.props.activeClassName )? this.props.activeClassName : 'active'; }
    get_direction()         : string  { return ( this.props.direction )? this.props.direction : 'horizontal'; }
    get_history_item()      : boolean { return ( this.props.historyItem )? this.props.historyItem : false;    }

    /*------------------------------------------------------
    * Some class functions
    */
    toggle_active() 
    { 
        if( this.nav_group )
        {
            this.nav_group.classList.toggle( this.get_active_class_name() ); 
        }
    }

    /*------------------------------------------------------
    * Some class functions
    */
    make_active()
    {
        this.nav_group.classList.add( this.get_active_class_name() ); 
    }

    /*------------------------------------------------------
    * Some class functions
    */
    indicate_active_item( active_navitem_name : string = null, item_was_given_name : boolean = false )
    {
        /* -- Make this an setting on the node -- */
        // if( ! this.props.indicateActiveItem ) { return true; }

        if( active_navitem_name )
        {
            if( this.last_active_navitem_name )
            {
                this.nav_group.classList.remove( 
                    this.last_active_navitem_name
                );
            }

            /* -- Only add the name of the item if it has been given a name --  */
            if( item_was_given_name )
            {
                this.last_active_navitem_name = active_navitem_name;
                this.nav_group.classList.add( active_navitem_name ); 
            }

        }
    }

    /*------------------------------------------------------
    * Gens a random name for this navgroup
    */
    gen_random_name() 
    {
        let random_name : string = '';

        for( let i = 0; i < 2; i++)
            random_name += Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1) + '-'

        return  random_name.substring(0, random_name.length - 1);

    }

    /*------------------------------------------------------
    * this it where we append this object and all of its navitems 
    */
    componentDidMount()
    {
        this.nav_group_name = this.props.name || this.gen_random_name();

        if ( this.props.name ) {
            this.nav_group.classList.add( this.nav_group_name );
        }

        this._NgController.add_new_nav_group(
            this.nav_group_name, this
        );

        for (let ref in this.refs) 
        {
            let item : any = this.refs[ ref ];

            if( item.constructor.name == 'NavItem' )
            {
                this._NgController.append_new_nav_item(
                    this.nav_group_name, item
                )
            }
        }

    }

    /*------------------------------------------------------
    */
    recursiveCloneChildren( children : any ) {

        return React.Children.map(children, (child : any, idx ) => {

            return React.cloneElement(child, { ref: idx });

        })
    }

    /*------------------------------------------------------
    * checks to see if the instruction has been supplied though the navgroup attributes
    */
    fetch_instruction( instruction : string = '' )
    {
        let props : any = this.props;

        if( props.hasOwnProperty( instruction ) )
        {
            return ( props[ instruction ] );
        }

        return null;

    }

    /*------------------------------------------------------
    */
    render() { return <div className="nav-group" ref={(ng) => { this.nav_group = ng; }}  >  { this.recursiveCloneChildren( this.props.children ) }  </div> }

}