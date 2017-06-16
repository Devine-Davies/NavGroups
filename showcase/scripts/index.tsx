import * as React from "react";
import * as ReactDOM from "react-dom";
import { NgController, NavGroup, NavItem } from "navgroups";

// Stylesheets
import "../scss/main.scss";

const App = () => (

    <div className='window' >

        <section className="top-pane-container">

                <NavGroup name="info-bar" >

                    <NavItem>Rain 20&deg;c</NavItem>

                    <NavItem >15:43pm</NavItem>

                    <NavItem onDown="ng:last" >Rhys Devine-Davies</NavItem>

                </NavGroup>

        </section>

        <section className="menu-container" >

            <NavGroup name="global-menu" onUp="ng:info-bar|ni:first" onDown="ng:list-one" indicateActiveItem >

                <NavItem name="ni-1" startingPoint >Movies</NavItem>

                <NavItem name="ni-2" >Music</NavItem>

                <NavItem name="ni-3" >Games</NavItem>

                <NavItem name="ni-4" >Photos</NavItem>

                <NavItem name="ni-5" >Apps</NavItem>

                <NavItem name="ni-6" onRight="ng:social-menu" >Internet</NavItem>

            </NavGroup>

            <NavGroup name="social-menu" onUp="ng:info-bar|ni:last" indicateActiveItem >

                <NavItem name="ni-1" onLeft="ng:global-menu" ><i className="fa fa-github" ></i></NavItem>

                <NavItem name="ni-2" > <i className="fa fa-linkedin"></i></NavItem>

                <NavItem name="ni-3" > <i className="fa fa-search"></i> </NavItem>

            </NavGroup>

        </section>

        <section className="body-container" >
            <NavGroup name="list-one" onUp="ng:global-menu" >
                <BodyList/>
            </NavGroup>

            <NavGroup name="list-two" onUp="ng:list-one" >
                <BodyList />
            </NavGroup>
        </section>
    
    </div>
);

interface Props {
  name?: string;
}

class BodyList extends React.Component<Props, {}> {

    movies = [
        'https://s-media-cache-ak0.pinimg.com/originals/29/e3/59/29e3598aca677b4bda6874152bcfe9cf.jpg',
        'https://s-media-cache-ak0.pinimg.com/736x/59/12/0f/59120f2a65fd05a78d9d450039a85a58.jpg',
        'https://s-media-cache-ak0.pinimg.com/736x/fa/78/ee/fa78eeffd9bd0ede0f8024b8910f669c.jpg',
        'https://s-media-cache-ak0.pinimg.com/originals/29/e3/59/29e3598aca677b4bda6874152bcfe9cf.jpg',
        'https://s-media-cache-ak0.pinimg.com/736x/59/12/0f/59120f2a65fd05a78d9d450039a85a58.jpg'
    ];

    render() 
    {
        return ( <div className="ni-list-container" >{ this.movies.map(function(cover, index){

                let name   : string = `ni-${index}`;
                let onDown : string = `ng:next|ni:${index}`;

                return <NavItem name={name} >
                    <div className="poster-container">
                        <div className="poster">
                            <div className="poster__img" style={{backgroundImage: `url(${cover})`}} ></div>
                            <div className="poster__info">
                            <h1 className="poster__title">Movie Title</h1>
                            <p className="poster__text">Lorem Ipsum is simply dummy text of</p>
                            </div>
                        </div>
                    </div>
                </NavItem>
            })}
        </div> );
    }    
}

// window.onload = function(e){ 
NgController.set('install-game',  ( args : any ) => { 
    console.log( args )
});
// }

ReactDOM.render(<App />, document.getElementById("example") );