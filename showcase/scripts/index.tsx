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

                    <NavItem onDown="ng:last" > Rhys Devine-Davies</NavItem>

                </NavGroup>

        </section>

        <section className="menu-container" >

            <NavGroup name="global-menu" onUp="ng:info-bar|ni:first" onDown="ng:list-one" indicateActiveItem >

                <NavItem name="ni-1" startingPoint >My session</NavItem>

                <NavItem name="ni-2" >Movies</NavItem>

                <NavItem name="ni-3" >Music</NavItem>

                <NavItem name="ni-4" >TV</NavItem>

                <NavItem name="ni-5" onRight="ng:social-menu" >Movies</NavItem>

            </NavGroup>

            <NavGroup name="social-menu" onUp="ng:info-bar|ni:last" indicateActiveItem >

                <NavItem name="ni-1" onLeft="ng:global-menu" ><i className="fa fa-github" ></i></NavItem>

                <NavItem name="ni-2" > <i className="fa fa-linkedin"></i></NavItem>

                <NavItem name="ni-3" > <i className="fa fa-search"></i> </NavItem>

            </NavGroup>

        </section>

        <section className="body-container" >
            <NavGroup name="list-one" onUp="ng:global-menu" >
                <NavItem name="ni-1" >
                    <div className="poster-container">
                        <div className="poster">
                            <div className="poster__img"></div>
                            <div className="poster__info">
                            <h1 className="poster__title">Movie Title</h1>
                            <p className="poster__text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                            </div>
                        </div>
                    </div>
                </NavItem>

                <NavItem name="ni-2" >
                    <div className="poster-container">
                        <div className="poster">
                            <div className="poster__img"></div>
                            <div className="poster__info">
                            <h1 className="poster__title">Movie Title</h1>
                            <p className="poster__text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                            </div>
                        </div>
                    </div>
                </NavItem>

                <NavItem name="ni-3" >
                    <div className="poster-container">
                        <div className="poster">
                            <div className="poster__img"></div>
                            <div className="poster__info">
                            <h1 className="poster__title">Movie Title</h1>
                            <p className="poster__text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                            </div>
                        </div>
                    </div>
                </NavItem>

                <NavItem name="ni-4" >
                    <div className="poster-container">
                        <div className="poster">
                            <div className="poster__img"></div>
                            <div className="poster__info">
                            <h1 className="poster__title">Movie Title</h1>
                            <p className="poster__text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                            </div>
                        </div>
                    </div>
                </NavItem>

                <NavItem name="ni-5" >
                    <div className="poster-container">
                        <div className="poster">
                            <div className="poster__img"></div>
                            <div className="poster__info">
                            <h1 className="poster__title">Movie Title</h1>
                            <p className="poster__text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                            </div>
                        </div>
                    </div>
                </NavItem>
            </NavGroup>

            <NavGroup name="list-two" onUp="ng:list-one" >
                <NavItem name="ni-1" >
                    <div className="poster-container">
                        <div className="poster">
                            <div className="poster__img"></div>
                            <div className="poster__info">
                            <h1 className="poster__title">Movie Title</h1>
                            <p className="poster__text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                            </div>
                        </div>
                    </div>
                </NavItem>

                <NavItem name="ni-2" >
                    <div className="poster-container">
                        <div className="poster">
                            <div className="poster__img"></div>
                            <div className="poster__info">
                            <h1 className="poster__title">Movie Title</h1>
                            <p className="poster__text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                            </div>
                        </div>
                    </div>
                </NavItem>

                <NavItem name="ni-3" >
                    <div className="poster-container">
                        <div className="poster">
                            <div className="poster__img"></div>
                            <div className="poster__info">
                            <h1 className="poster__title">Movie Title</h1>
                            <p className="poster__text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                            </div>
                        </div>
                    </div>
                </NavItem>

                <NavItem name="ni-4" >
                    <div className="poster-container">
                        <div className="poster">
                            <div className="poster__img"></div>
                            <div className="poster__info">
                            <h1 className="poster__title">Movie Title</h1>
                            <p className="poster__text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                            </div>
                        </div>
                    </div>
                </NavItem>

                <NavItem name="ni-5" >
                    <div className="poster-container">
                        <div className="poster">
                            <div className="poster__img"></div>
                            <div className="poster__info">
                            <h1 className="poster__title">Movie Title</h1>
                            <p className="poster__text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                            </div>
                        </div>
                    </div>
                </NavItem>
            </NavGroup>
        </section>
    
    </div>
);

window.onload = function(e){ 

    NgController.set('install-game',  ( args : any ) => { 
        console.log( args )
    });

}

ReactDOM.render(<App />, document.getElementById("example") );