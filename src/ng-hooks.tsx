/*------------------------------------------------------
 Hooks
 ------------------------------------------------------
 * Used for client communication and CWC call back function
 * Developer can also set hooks for complainants callback function
 ------------------------------------------------------
*/
export class NgHooks {

    /*------------------------------------------------------
    * @array
    * Place to store all custom method
    */
    hook_sets : string[] = [
        'custom',
    ];

    /*------------------------------------------------------
    * @array
    * Place to store all custom method
    */
    hooks : any = {
        'custom'   : {},
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
    public  set( hook_info : any = null )
    {
        /* -- Has to be object -- */
        if( typeof hook_info === 'object' )
        {
            /* -- need a hook name and method -- */
            if( hook_info.hasOwnProperty('hook_name') && hook_info.hasOwnProperty('method') )
            {
                /* -- Name not be be empty -- */
                if( hook_info.hook_name != '' && ( typeof hook_info.method == 'function' ) )
                {  
                    let hook_set_and_name : any = this.get_hook_set_from_name( hook_info.hook_name );

                    this.initiate_hook(
                        hook_set_and_name.set,
                        hook_set_and_name.name,
                        hook_info,
                    );

                }
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
                if( args )
                {
                    this.hooks[ hook_data.set ][ hook_data.name ].method( args );
                }
                else
                {
                    this.hooks[ hook_data.set ][ hook_data.name ].method( );
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
        let hook_set : string = this.hook_sets[ 0 ];

        let potential_sets : any = {
            'custom'   : hook_name.includes('hook'),
            'd-hook'   : hook_name.includes('d-hook'),
            'c-hook'   : hook_name.includes('c-hook'),
            'cwc-hook' : hook_name.includes('cwc-hook'),
        };

        for( let set of this.hook_sets )
        {
            if( hook_name.includes( set ) )
            {
                hook_set = set;
            }
        }

        return {
            set  : hook_set,
            name : hook_name.replace( hook_set + ':' , '' )
        }
    }

    /*------------------------------------------------------
    * @function - Create reserved hook
    * @info     - Creates a reserved CWC hook
    */
    private initiate_hook( hook_set : string = null, hook_name : string = null, hook_info : any = null )
    {
        this.hooks[ hook_set ][ hook_name ] = {
            'hook_name': hook_info.hook_name,
            'method'   : hook_info.method
        };
    }

}

// export var NgHooks = new _NgHooks();