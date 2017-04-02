// import { Hooks } from "./hooks";

declare var window : any;


export class _NgController {

    /*------------------------------------------------------
    * @array
    * Keep an index od the order they come in
    */
    nav_groups_indexing : string[] = [];

    /*------------------------------------------------------
    * @object
    * Our main object for all our item 
    */
    nav_groups : any = {};

    /*------------------------------------------------------
    * @HtmlElement
    * our current navNavgroup
    */
    active_navgroup : any = null;
    
    /*------------------------------------------------------
    * @HtmlElement
    * our current navItem
    */
    active_navitem : any = null;

    /*------------------------------------------------------
    * @array
    * Keep an index od the order they come in
    */
    history_stack : any = {
        'navgroups' : [],
        'navitems'  : []
    }

    /*------------------------------------------------------
    * @array
    * Place to store all custom method
    */
    keys : any = {
        /* -- Backspace & ESC -- */
        8  : () => { this.key_function( 'onBack' ) },
        27 : () => { this.key_function( 'onBack' ) },

        /* -- Enter & Space -- */
        13 : () => { this.key_function( 'onEnter' ) },
        32 : () => { this.key_function( 'onEnter' ) },

        /* -- W & up -- */
        87 : () => { this.key_function( 'onUp' ) },
        38 : () => { this.key_function( 'onUp' ) },

        /* -- S & down -- */
        83 : () => { this.key_function( 'onDown' ) },
        40 : () => { this.key_function( 'onDown' ) },

        /* -- A & left -- */
        65 : () => { this.key_function( 'onLeft' ) },
        37 : () => { this.key_function( 'onLeft' ) },

        /* -- D & right -- */
        68 : () => { this.key_function( 'onRight' ) },
        39 : () => { this.key_function( 'onRight' ) },
    };

    /*------------------------------------------------------
    * @Default actions
    * If no actions are provided use these
    */
    default_actions : any = { 
        'vertical' : {
            'onUp'    : 'ni:prev',
            'onRight' : 'ng:next',
            'onDown'  : 'ni:next',
            'onLeft'  : 'ng:prev'
        },

        'horizontal' : {
            'onUp'    : 'ng:prev',
            'onRight' : 'ni:next',
            'onDown'  : 'ng:next',
            'onLeft'  : 'ni:prev'
        }
    }

    /*------------------------------------------------------
    */
    constructor(
        // _Hooks : any = Hooks
    )
    { 
        this.add_window_key_events(); 
    }

    /*------------------------------------------------------
    * @function - Add window key events
    * @info - Add window key-binds for Navgroup
    * @conditions set - Only if Navitems found
    */
    private add_window_key_events()
    {
        window.addEventListener("keydown", ( event : any ) =>
        {
            var key = event.keyCode || event.which;

            /* -- Find if the key is in our object -- */
            if ( this.keys.hasOwnProperty( event.keyCode || event.which ) )
            {
                this.keys[key]()
                event.preventDefault();
            }
        });

    }

    /*------------------------------------------------------
    */
    public add_new_nav_group( nav_group_name : string = null, obj : any = null )
    {
        this.nav_groups[ nav_group_name ] = {
            'obj'                : obj,
            'nav_items'          : {},
            'nav_items_indexing' : [],
            'selected_nav_item'  : null,
        }

        this.nav_groups_indexing.push(
            nav_group_name
        );

    }

    /*------------------------------------------------------
    */
    public append_new_nav_item( nav_group_name : string = null, nav_item : any = null )
    {
        let nav_group      : any = this.nav_groups[ nav_group_name ];
        let nav_item_name  : string = nav_item.get_name();

        /* -- Set this item as an gen entry point for the group is  -- */
        if( nav_item.is_entry_point() ) 
        {
            this.nav_groups[ nav_group_name ]['item_entry_point'] = nav_item_name; 
        }

        /* -- Add into the right group -- */
        this.nav_groups[ nav_group_name ]['nav_items'][ nav_item_name ] = {
            'name'         : nav_item_name,
            'obj'          : nav_item
        };

        /* -- Add to indexing -- */
        this.nav_groups[ nav_group_name ]['nav_items_indexing'].push(
            nav_item_name
        )

        /* -- Safe the ref to the group and item for starting -- */
        if( nav_item.props.startingPoint )
        {
            this.move_to_new_nav_group(
                nav_group_name, nav_item_name
            );
        }

    }

    /*------------------------------------------------------
    */
    public run_instructions( instruction : string = null )
    {
        if( instruction )
        {
            this.analyse_instructions(
                instruction
            );
        }
    }

    /*------------------------------------------------------
    */
    public run_action( event : string = null )
    {
        if( event )
        {
            this.key_function(
                event
            );
        }
    }

    /*------------------------------------------------------
    */
    private key_function( event : string = null )
    {
        /* --  -- */
        let default_actions : any = this.default_actions;

        /* --  First check to see if nav item has instruction -- */
        let instruction = this.active_navitem.fetch_instruction( event );

        /* -- if not use nav group -- */
        instruction = ( instruction == null )? this.active_navgroup.obj.fetch_instruction( event ) : instruction
        
        /* -- if still no instruction, lets make some use some default_actions -- */
        if( instruction == null )
        {
            let navgroup_direction : string = this.active_navgroup.obj.get_direction();
            instruction = default_actions[ navgroup_direction ][ event ];
        }

        if( instruction != null )
        {
            this.analyse_instructions(
                instruction
            );
        }

    }

    /* ------------------------------------------------------
    * - Analyse instructions
    /* ------------------------------------------------------
    * -------------------------------------------------------
    * - ng:*|ni:*              |         | - will move to nav group and item at onces, must start with ng
    * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    * - ni:next                | default | - next navitem
    * - ni:prev                | default | - previous navitem
    * - ni:last                |         | - Go to last item
    * - ni:first               |         | - Go to first item
    * - ni:*                   |         | - Go to the given index of an item
    * - ni:name                |         | - Go to the item with that name

    * - ng:next                | default | - next navgroup
    * - ng:prev                | default | - previous navgroup
    * - ng:last                |         | - Go to last selected navgroup
    * - ni:*                   |         | - Go to the given navgroup by index
    * - ni:name                |         | - Go to the navgroup by name

    * - hook:*(custom method)  |         | - add custom method to end of arg, must be set up in custom methods
    * - hook:*(custom method)  |         | - add custom method to end of arg, must be set up in custom methods
    * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    private analyse_instructions( instruction : string = null )
    {
        let delimiter : string  = ':';
        let navgroup  : string  = 'ng'   + delimiter;
        let navitem   : string  = 'ni'   + delimiter;
        let hook      : string  = 'hook' + delimiter;


        if( instruction.includes( '|' ) && instruction.startsWith("ng:") )
        {
            let split : any = instruction.split("|");
            
            this.analyse_instructions( split[ 0 ] )

            this.analyse_instructions( split[ 1 ] )
        }

        /* -- Move to item -- */
        else if( instruction.includes( navitem ) )
        {
            instruction = instruction.replace( navitem , '');

            /* -- If passing a number find name of nav group -- */
            if( Number( instruction ) )
            {
                instruction = this.active_navgroup['nav_items_indexing'][ Number( instruction ) - 1 ];
            }

            this.move_to_new_nav_item( instruction );

        }

        /* -- Move to nav group -- */
        else if( instruction.includes( navgroup ) )
        {
            instruction = instruction.replace( navgroup , '');

            /* -- If passing a number find name of nav group -- */
            if( Number( instruction ) )
            {
                instruction = this.nav_groups_indexing[ Number( instruction ) - 1 ];
            }

            this.move_to_new_nav_group( instruction );

        }

        /* -- Let's invoke a hook -- */
        else if( instruction.indexOf( hook ) > -1 )
        {
            let args = {
                'active_navgroup' : this.active_navgroup,
                'active_navitem'  : this.active_navitem
            }

            // Hooks.call( instruction, args );

        }

    }

    /*------------------------------------------------------
    */
    private move_to_new_nav_group( instruction : string = null, nav_item_name : string = null )
    {
        let active_nav_group   : any = this.active_navgroup;
        let next_navgroup_name : string = instruction;

        if( active_nav_group )
        {
            let moves : any = {
                /* -- Looking for either the next or previous nav group -- */
                'prev' : this.get_next_prev_nav_group( active_nav_group.obj.get_name(), instruction ),
                'next' : this.get_next_prev_nav_group( active_nav_group.obj.get_name(), instruction ),

                /* -- Looking for either the next or previous nav group -- */
                'last' : this.history_stack['navgroups'][ this.history_stack['navgroups'].length - 2 ]
            }

            if( moves.hasOwnProperty( instruction ) )
            {
                next_navgroup_name = moves[ instruction ];
            }
            else
            {
                next_navgroup_name = instruction;
            }
        }
    
        if( this.nav_groups.hasOwnProperty( next_navgroup_name ) )
        {
            if( this.active_navgroup )
            {
                this.active_navgroup.obj.toggle_active();
            }

            this.active_navgroup = this.nav_groups[ next_navgroup_name ];
            this.active_navgroup.obj.toggle_active();

            /* -- Add to the history stack -- */
            this.history_stack['navgroups'].push(
                this.active_navgroup.obj.get_name()
            );

            /* -- Check to see if we should move to a new nav item in group -- */
            this.move_to_new_nav_item(
                nav_item_name
            );
        }

    }

    /*------------------------------------------------------
    */
    private move_to_new_nav_item( instruction : string = null )
    {
        let active_group : any = this.active_navgroup;

        /* -- prepare all the item they we could move to -- */
        let items_to_move_to : any = {
            'next'             : this.get_next_prev_nav_item( active_group['selected_nav_item'], 'next' ),
            'prev'             : this.get_next_prev_nav_item( active_group['selected_nav_item'], 'prev' ),

            'first'            : active_group['nav_items_indexing'][ 0 ],
            'last'             : active_group['nav_items_indexing'][ active_group['nav_items_indexing'].length - 1 ],
            'last_selected'    : active_group['selected_nav_item'],
            'item_entry_point' : active_group['item_entry_point'] 
        }

        /* -- Move to item name if given -- */
        if( this.item_in_group( instruction ) != false )
        {
            active_group['selected_nav_item'] = instruction;
        }

        /* -- if instruction has been given - then try to move there -- */
        else if( instruction != null )
        {
            /* -- Looking for either the next or previous nav group -- */
            if( items_to_move_to.hasOwnProperty( instruction ) )
            {
                active_group['selected_nav_item'] = items_to_move_to[ instruction ];
            }
        }

        /* -- See if this group have been given an item as an entry point -- */
        else if( items_to_move_to['item_entry_point'] )
        {
            active_group['selected_nav_item'] = items_to_move_to['item_entry_point'];
        }

        /* -- if history item for this group is true, then lets move to that one -- */
        else if( active_group.obj.get_history_item() )
        {
            active_group['selected_nav_item'] = items_to_move_to['last_selected'];
        }

        /* -- If no position have been given then let's move to the first item -- */
        else
        {
            active_group['selected_nav_item'] = items_to_move_to['first'];
        }

        /* -- If we still haven't got an item to move to - lets just go to the first item -- */
        if( active_group['selected_nav_item'] == null )
        {
            active_group['selected_nav_item'] = items_to_move_to['first'];
        }

        /* -- Turn off the current item | if one has been set-- */
        if( this.active_navitem ) 
        {
            this.active_navitem.toggle_active();
        }

        /* -- Update the navitem object -- */
        this.active_navitem = active_group['nav_items'][ active_group['selected_nav_item'] ].obj;

        /* -- Add to the history stack -- */
        this.active_navitem.toggle_active();

        /* -- Add to the history stack -- */
        this.history_stack['navitems'].push(
            this.active_navitem.get_name()
        );

        /* -- Add to the history stack -- */
        active_group.obj.indicate_active_item(
            this.active_navitem.get_name(),
            this.active_navitem.was_given_name()
        );

    }

    /*------------------------------------------------------
    */
    private item_in_group( item_name : string = null ) : boolean 
    {
        let active_group : any = this.active_navgroup;

        if( item_name )
        {
            return active_group.nav_items.hasOwnProperty( item_name );
        }

        return false;
    }

    /*------------------------------------------------------
    */
    private swap_active_item( item_name : string = null )
    {
        if( item_name )
        {
            console.log( "this.active_navgroup['selected_nav_item']" );
            console.log( this.active_navgroup['selected_nav_item'] );
            console.log( item_name != this.active_navgroup['selected_nav_item'] ) 
        }
    }

    /*------------------------------------------------------
    */
    private get_next_prev_nav_group( nav_group_name : string = null, dir : string = 'next' ) : string
    {
        let ng_indexing : string[] = this.nav_groups_indexing;
        let at_pos      : number   = this.nav_groups_indexing.indexOf( nav_group_name );
        let next_nav    : number   = at_pos;

        /* -- Update depending on direction -- */
        next_nav = ( dir == 'next' )? next_nav += 1 : next_nav -= 1; 

        /* -- Nav constraints -- */
        var constraint = {
            under : ( next_nav < 0 ),
            over  : ( next_nav == ng_indexing.length ),
        }

        /* -- Move to last nav group -- */
        if( constraint.under ) {
            next_nav = ng_indexing.length - 1;
        }

        /* -- Move to first nav group  -- */
        else if ( constraint.over ) {
            next_nav = 0;
        }

        /* -- Return the name of the found nav group -- */
        return ng_indexing[ ( next_nav ) ]

    }

    /*------------------------------------------------------
    */
    private get_next_prev_nav_item( nav_item_name : string = null, dir : string = 'next'  ) : any
    {
        let ni_indexing : string[] = this.active_navgroup['nav_items_indexing'];
        let at_pos      : number   = ni_indexing.indexOf( nav_item_name );
        let next_item   : number   = at_pos;

        /* -- Update depending on direction -- */
        next_item = ( dir == 'next' )? next_item += 1 : next_item -= 1; 

        /* -- Nav constraints -- */
        var constraint = {
            under : ( next_item < 0 ),
            over  : ( next_item == ni_indexing.length ),
        }

        /* -- Move to last nav group -- */
        if( constraint.under ) { next_item = ni_indexing.length - 1; }

        /* -- Move to first nav group  -- */
        else if ( constraint.over ) { next_item = 0; }

        /* -- Return the name of the found nav group -- */
        return ni_indexing[ ( next_item ) ];

    }

}

export var NgController = new _NgController();