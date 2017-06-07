declare var document : any;

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
        'navgroups' : [], 'navitems'  : []
    }

    /*------------------------------------------------------
    * @array
    * Place to store all custom method
    */
    keys : any = {
        /* -- Backspace & ESC -- */
        8  : () => { this.key_invoked( 'onBack' ) },
        27 : () => { this.key_invoked( 'onBack' ) },

        /* -- Enter & Space -- */
        13 : () => { this.key_invoked( 'onEnter' ) },
        32 : () => { this.key_invoked( 'onEnter' ) },

        /* -- W & up -- */
        87 : () => { this.key_invoked( 'onUp' ) },
        38 : () => { this.key_invoked( 'onUp' ) },

        /* -- S & down -- */
        83 : () => { this.key_invoked( 'onDown' ) },
        40 : () => { this.key_invoked( 'onDown' ) },

        /* -- A & left -- */
        65 : () => { this.key_invoked( 'onLeft' ) },
        37 : () => { this.key_invoked( 'onLeft' ) },

        /* -- D & right -- */
        68 : () => { this.key_invoked( 'onRight' ) },
        39 : () => { this.key_invoked( 'onRight' ) },
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
    constructor()
    {
        this.add_window_key_events();
    }

    /*-----------------------------------------------------
    * @function - Add new nav group
    * @info - Adds a new navgrouop to the class
    * @navgroup_obj - is the class/obj of the navgroup item
    */
    public add_new_nav_group( navgroup_obj : any = null )
    {
        /* -- Set up thje core object for the navgroup item -- */
        this.nav_groups[ navgroup_obj.get_name() ] = {
            'obj'                : navgroup_obj,
            'nav_items'          : {},
            'nav_items_index'    : [],
            'selected_nav_item'  : null,
        }

        /* -- Keep a record of the index in which the nagrouo come in as -- */
        this.nav_groups_indexing.push(
            navgroup_obj.get_name()
        );
    }

    /*-----------------------------------------------------
    * @function - Append new nav item
    * @info - Adds a new navitem to an exsisting navgroup
    * @conditions set - Only if Navitems found
    * -----------------------------------------------------
    * [attr] = startingPoint? : boolean; - is the main starting point of the app;
    * [attr] = entryPoint?    : boolean; - When the new navgro is enterd, is the first item it will find;
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
        this.nav_groups[ nav_group_name ]['nav_items_index'].push(
            nav_item_name
        );

        /* -- Safe the ref to the group and item for starting -- */
        if( nav_item.props.startingPoint )
        {
            this.move_to_new_nav_group(
                nav_group_name, nav_item_name
            );
        }

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
                this.keys[ key ]()
                event.preventDefault();
            }
        });

    }

    /*------------------------------------------------------
    * Key invoked
    * @desc : Function to set up keybindings for the componant
    */
    private key_invoked( event : string = null )
    {
        /* -- default ket bindings -- */
        let default_actions : any = this.default_actions;

        /* --  First check to see if navitem has instruction -- */
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
            this.analyse_instruction(
                instruction
            );
        }
    }

    /* ------------------------------------------------------
    * - Analyse instructions
    /* ------------------------------------------------------
    | Instructions  | is default | Description                                                           |
    |---------------|------------|-----------------------------------------------------------------------|
    |               |            |                                                                       |
    | ng:*|ni:*     |            | will move to nav group and item at onces, must start with ng          |
    |               |            |                                                                       |
    | ni:next       | default    | next navitem                                                          |
    | ni:prev       | default    | previous navitem                                                      |
    | ni:last       |            | Go to last item                                                       |
    | ni:first      |            | Go to first item                                                      |
    | ni:{{#}}      |            | Go to the given index of an item                                      |
    | ni:{{name}}   |            | Go to the item with that name                                         |
    |               |            |                                                                       |
    | ng:next       | default    | next navgroup                                                         |
    | ng:prev       | default    | previous navgroup                                                     |
    | ng:last       |            | Go to last selected navgroup                                          |
    | ng:{{#}}      |            | Go to the given navgroup by index                                     |
    | ng:{{name}}   |            | Go to the navgroup by name                                            |
    |               |            |                                                                       |
    | hook:{{name}} |            | add the name of your custom hook (must be set up in custom methods  ) |
    * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    private analyse_instruction( instruction : string = null )
    {
        let delimiter       : string  = ':';
        let navitem_prefix  : string  = 'ni'   + delimiter;
        let navgroup_prefix : string  = 'ng'   + delimiter;
        let hook_prefix     : string  = 'hook' + delimiter;

        if( instruction.includes( '|' ) && instruction.startsWith("ng:") )
        {
            let instructions : any = instruction.split("|");

            for( let instruction of instructions )
            {
                this.analyse_instruction( instruction );
            }
        }

        /* -- Move to item -- */
        else if( instruction.includes( navitem_prefix ) )
        {
            instruction = instruction.replace( navitem_prefix , '');

            /* -- If passing a number find name of nav group -- */
            if( Number( instruction ) )
            {
                instruction = this.active_navgroup['nav_items_index'][ Number( instruction ) - 1 ];
            }

            this.move_to_new_nav_item( instruction );

        }

        /* -- Move to nav group -- */
        else if( instruction.includes( navgroup_prefix ) )
        {
            instruction = instruction.replace( navgroup_prefix , '');

            /* -- If passing a number find name of nav group -- */
            if( Number( instruction ) )
            {
                instruction = this.nav_groups_indexing[ Number( instruction ) - 1 ];
            }

            this.move_to_new_nav_group( instruction );

        }

        /* -- Let's invoke a hook -- */
        else if( instruction.indexOf( hook_prefix ) > -1 )
        {
            // Hooks.call( instruction, {
            //     'active_navgroup' : this.active_navgroup,
            //     'active_navitem'  : this.active_navitem
            // } );
        }

    }

    /*------------------------------------------------------
    * @function - Run instructions
    * @info - A programatic way to call an instuction
    * @instruction set - linked to analyse_instruction string
    */
    public run_instructions( instruction : string = null )
    {
        if( instruction )
        {
            this.analyse_instruction( instruction );
        }
    }

    /*------------------------------------------------------
    * ---------
    */
    public run_action( event : string = null )
    {
        if( event )
        {
            this.key_invoked(
                event
            );
        }
    }

    /*------------------------------------------------------
    * Move to new nav group
    * @instruction - based in the ng info on the table above ( analyse_instruction )
    * @nav_item_name - the name of the item in the active_nav_group
    */
    private move_to_new_nav_group( instruction : string = null, nav_item_name : string = null )
    {
        let active_nav_group   : any = this.active_navgroup;
        let next_navgroup_name : string = instruction;

        if( active_nav_group )
        {
            let moves : any = {
                /* -- Looking for either the next or previous nav group -- */
                'prev' : this.get_next_nav_group( active_nav_group.obj.get_name(), instruction ),
                'next' : this.get_next_nav_group( active_nav_group.obj.get_name(), instruction ),

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

                /* -- Remove the active item name of the group class -- */
                this.active_navgroup.obj.active_item_indicator(
                    this.active_navitem.get_name(), 'remove'
                );
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
    * Move to new nav item
    * @instruction - based in the ni info on the table above ( analyse_instruction )
    */
    private move_to_new_nav_item( instruction : string = null )
    {
        let active_group : any = this.active_navgroup;

        /* -- prepare all the item that we could move to -- */
        let possible_moves : any = {
            /* -- Core movments -- */
            'next'   : this.get_next_nav_item( active_group['selected_nav_item'], 'next' ),
            'prev'   : this.get_next_nav_item( active_group['selected_nav_item'], 'prev' ),
            'first'  : active_group['nav_items_index'][ 0 ],
            'last'   : active_group['nav_items_index'][ active_group['nav_items_index'].length - 1 ],

            /* -- Spechial movments -- */
            "move_by_name"     : this.get_item_in_group( instruction ),
            'last_selected'    : active_group['selected_nav_item'],
            'item_entry_point' : active_group['item_entry_point']
        }

        /* -- Move to item of a given name -- */
        if( possible_moves[ "move_by_name" ] != false )
        {
            active_group['selected_nav_item'] = instruction;
        }

        /* -- if instruction has been given - then try to move there -- */
        else if( instruction != null )
        {
            /* -- Looking for either the next or previous nav group -- */
            if( possible_moves.hasOwnProperty( instruction ) )
            {
                active_group['selected_nav_item'] = possible_moves[ instruction ];
            }
        }

        /* -- See if this group have been given an item as an entry point -- */
        else if( possible_moves['item_entry_point'] )
        {
            active_group['selected_nav_item'] = possible_moves['item_entry_point'];
        }

        /* -- if history item for this group is true, then lets move to that one -- */
        else if( active_group.obj.get_history_item() )
        {
            active_group['selected_nav_item'] = possible_moves['last_selected'];
        }

        /* -- If no position have been given then let's move to the first item -- */
        /* -- If we still haven't got an item to move to - lets just go to the first item -- */
        if( active_group['selected_nav_item'] == null )
        {
            active_group['selected_nav_item'] = possible_moves['first'];
        }

        /* -- Turn off the current item | if one has been set-- */
        if( this.active_navitem )
        {
            this.active_navitem.toggle_active();

            /* -- Remove the active item name of the group class -- */
            active_group.obj.active_item_indicator(
                this.active_navitem.get_name(), 'remove'
            );
        }

        /* -- Update the navitem object -- */
        this.active_navitem = active_group['nav_items'][ active_group['selected_nav_item'] ].obj;

        /* -- AddMake the last active item unacitve -- */
        this.active_navitem.toggle_active();

        /* -- Add the active item name of the group class -- */
        active_group.obj.active_item_indicator(
            this.active_navitem.get_name()
        );

        /* -- Add to the history stack -- */
        this.history_stack['navitems'].push(
            this.active_navitem.get_name()
        );
    }

    /*------------------------------------------------------
    * Get item in group
    * @item_name - the name of the navitem you wish to use
    */
    private get_item_in_group( item_name : string = null ) : boolean
    {
        let active_group : any = this.active_navgroup;

        if( active_group )
        {
            if( item_name )
            {
                return active_group.nav_items.hasOwnProperty( item_name );
            }
        }

        return false;
    }

    /*------------------------------------------------------
    * Get next nav item
    * @nav_group_name - the name of the navgroup you wish to use
    * @direction - {{ next }} or {{ previous }}
    */
    private get_next_nav_group( nav_group_name : string = null, dir : string = 'next' ) : string
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
    * Get next nav item
    * @nav_item_name - the name of the navitem you wish to use
    * @direction - {{ next }} or {{ previous }}
    */
    private get_next_nav_item( nav_item_name : string = null, direction : string = 'next'  ) : any
    {
        let ni_indexing : string[] = this.active_navgroup['nav_items_index'];
        let at_pos      : number   = ni_indexing.indexOf( nav_item_name );
        let next_item   : number   = at_pos;

        /* -- Update depending on direction -- */
        next_item = ( direction == 'next' )? next_item += 1 : next_item -= 1;

        /* -- Constraints to check -- */
        var constraint = {
            under : ( next_item < 0 ),
            over  : ( next_item == ni_indexing.length ),
        }

        if( constraint.under )
        {
            /* -- Move to last nav group -- */
            next_item = ni_indexing.length - 1;
        }
        else if ( constraint.over )
        {
            /* -- Move to first nav group  -- */
            next_item = 0;
        }

        /* -- Return the name of the found nav group -- */
        return ni_indexing[ ( next_item ) ];
    }

}


export var NgController = new _NgController();