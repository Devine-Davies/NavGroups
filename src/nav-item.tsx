import * as React from "react";
import * as ReactDOM from "react-dom";
import { NgController } from "./ng-controller";

export interface NavItemProps {
    /* -- Name the item -- */
    name?          : string;

    /* -- Starting point -- */
    startingPoint? : boolean;

    /* -- When entering the group use this item
    -- takes priority over historyItem  -- */
    entryPoint?    : boolean;

    /* -- class name to use when active -- */
    activeClassName?    : string;

    /* -- Here are our events for the navItems-- */
    onEnter?       : string;
    onBack?        : string;
    onUp?          : string;
    onRight?       : string;
    onDown?        : string;
    onLeft?        : string; 

    // onExit?       : any;
    // onEntrance?   : any;
}

export class NavItem extends React.Component<NavItemProps, undefined> {

    private _NgController: any;

    navitem       : HTMLElement = null;
    nav_item_name : string = null;

    public constructor() {
        super();
        this._NgController = NgController;
    }

    /*------------------------------------------------------
    * Some class attributes functions
    */
    get_active_class_name() : string  { return ( this.props.activeClassName )? this.props.activeClassName : 'active'; }
    is_entry_point()        : boolean { return ( this.props.entryPoint )? true : false; }
    was_given_name()        : boolean { return ( this.props.name ) ? true : false       }

    /*------------------------------------------------------
    * this it where we append this object and all of its navitems 
    */
    componentDidMount()
    {
        if ( this.props.name ) {
            this.navitem.classList.add( this.props.name );
        }
    }

    /*------------------------------------------------------
    * Some class functions
    */
    toggle_active() 
    { 
        if( this.navitem )
        {
            this.navitem.classList.toggle( this.get_active_class_name() ); 
        }
    }

    /*------------------------------------------------------
    * ------
    */
    make_active()
    {    
        this.navitem.classList.add( this.get_active_class_name() ); 
    }

    /*------------------------------------------------------
    * ------
    */
    remove_active() 
    { 
        this.navitem.classList.remove( this.get_active_class_name() ); 
    }

    /*------------------------------------------------------
    * Get name
    * returns the NavGroups name from the attribute
    * if no attribute has been given, a random name is generated and that is returned
    -- */
    get_name()
    {
        if( this.nav_item_name == null )
        {
            this.nav_item_name = ( this.props.name )? this.props.name : this.gen_random_name() ;
        }

        return this.nav_item_name;
    }

    /*------------------------------------------------------
    * Gens a random name for this navgitem
    */
    gen_random_name() 
    {
        let random_name : string = '';

        for( let i = 0; i < 2; i++)
            random_name += Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1) + '-'

        return random_name.substring(0, random_name.length - 1);

    }

    /*------------------------------------------------------
    * checks to see if the instruction has been supplied though the navitem attributes
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
    recursiveCloneChildren( children : any ) 
    {
        return React.Children.map(children, (child : any) => {

            var childProps : any = {};

            if ( child.props ) 
            {
                childProps.children = this.recursiveCloneChildren( child.props.children );
                return React.cloneElement(child, childProps);
            }

            return child;
        })
    }

    /*------------------------------------------------------
    * ------
    */
    render() { return <div className="nav-item" ref={(ni) => { this.navitem = ni; }} >  { this.recursiveCloneChildren( this.props.children ) }  </div> }

}