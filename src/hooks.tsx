/*------------------------------------------------------
 Hooks
 ------------------------------------------------------
 * Used for client communication and CWC call back function
 * Developer can also set hooks for complainants callback function
 ------------------------------------------------------
*/
export class Hooks {

    /*------------------------------------------------------
    * @array
    * Place to store all custom method
    */
    hooks : any = {
        'custom'   : {},
        'd-hook'   : {}, 
        'c-hook'   : {}, 
        'cwc-hook' : {}
    };

    /*------------------------------------------------------
    * @function
    */
    constructor(
    ){}

    /*------------------------------------------------------
    * @function
    * Create custom methods
    */
    public set( name : string = null, cb : any = null )
    {
        /* -- need a name and callback function -- */
        if( name && cb )
        {
            /* -- Name not be be empty -- */
            if( name != '' && ( typeof cb == 'function' ) )
            {  
                let hook_set_and_name : any = this.get_hook_set_from_name( name );

                this.initiate(
                    hook_set_and_name.set, hook_set_and_name.name, cb,
                );

            }
        }
    }

    /*------------------------------------------------------
    * @function - Create reserved hook
    * @info     - Creates a reserved CWC hook
    */
    public call( hook_name : string = null, args : any = null )
    { 
        if( hook_name )
        {
            let hook_data : any = this.get_hook_set_from_name( hook_name );

            if( this.hooks[ hook_data.set ].hasOwnProperty( hook_data.name ) )
            {
                if( args ) {
                    this.hooks[ hook_data.set ][ hook_data.name ]( args );
                } else {
                    this.hooks[ hook_data.set ][ hook_data.name ]( );
                }
            }
        }   
    }

    /*------------------------------------------------------
    * @function - Create reserved hook
    * @info     - Creates a reserved CWC hook
    */
    private get_hook_set_from_name( hook_name : string = null ) : any
    {
        let sets : string[] = this.get_all_sets();
        let set  : string   = sets[0];

        for( let potential_sets of sets )
        {
            set = ( hook_name.includes( set ) )? potential_sets : set
        }

        return {
            set  : set, name : hook_name.replace( set + ':' , '' )
        }
    }

    /*------------------------------------------------------
    * @function - Create reserved hook
    * @info     - Creates a reserved CWC hook
    */
    private initiate( set : string = null, name : string = null, cb : any = null)
    {
        this.hooks[ set ][ name ] = cb;
    }

    /*------------------------------------------------------
    -- */
    private get_all_sets() : string[]
    {
        let sets: string[] = [];

        for( let set in this.hooks )
            sets.push( set );

        return sets;
    }

}

// export var NgHooks = new _NgHooks();