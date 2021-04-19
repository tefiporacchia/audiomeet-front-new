import React from 'react';
import {Route, Switch, Redirect, BrowserRouter} from 'react-router-dom';
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import Sync from "./components/data/Preferences";
import { createBrowserHistory } from 'history';
import Preferences from "./components/data/Preferences";
import UserData from "./components/data/UserData";
import Pictures from "./components/data/Pictures";
/*import Header from "./components/home/Header";*/
import TarjetasTinder from "./components/home/TarjetasTinder";
import BotonesSwipe from "./components/home/BotonesSwipe";

function App() {
    const historyInstance = createBrowserHistory();

    return (
        <BrowserRouter history={historyInstance}>
            <Switch>
                <Route exact path={'/signup'} component={SignUp}/> //si el path es ese, cargame ese componente
                <Route exact path={'/signin'} component={SignIn}/>
                <Route exact path={'/preferences'} component={Preferences}/>
                <Route exact path={'/userdata'} component={UserData}/>
                <Route exact path={'/pictures'} component={Pictures}/>
                <Route path="/">
                   {/* <Header />*/}
                    <TarjetasTinder />
                    <BotonesSwipe />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;