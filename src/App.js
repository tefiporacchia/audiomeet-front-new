import React from 'react';
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import Dashboard from "./components/auth/Dashboard";
import  {auth} from './firebase';
import Sync from "./components/data/Preferences";
import { createBrowserHistory } from 'history';
import Preferences from "./components/data/Preferences";
import UserData from "./components/data/UserData";
import Pictures from "./components/data/Pictures";
import TarjetasTinder from "./components/home/TarjetasTinder";
import BotonesSwipe from "./components/home/BotonesSwipe";
import Header from "./components/home/Header";
import Navigation from "./components/home/Navigation";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import {useParams} from "react-router";
import { AuthProvider } from "./contexts/AuthContext"
import PrivateRoute from "./contexts/PrivateRoute";
import Notifications from "./components/extras/Notifications";

import Audio2 from "./components/chat/Audio2";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import audiomeetPuntero from '../src/components/data/audiomeetPuntero.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    iconAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: [13, 20],
});

L.Marker.prototype.options.icon = DefaultIcon;

const curUser = auth.currentUser;

function App() {
    // const historyInstance = createBrowserHistory();

    return (
        // <BrowserRouter history={historyInstance}>
        //console.log(curUser),
        <Router>
            <AuthProvider>
            <Switch>
                <Route exact path={'/register'} component={Register}/> //si el path es ese, cargame ese componente
                <Route exact path={'/login'} component={Login}/>
                <PrivateRoute exact path={'/preferences'} component={Preferences}/>
                <PrivateRoute exact path={'/notifications'} component={Notifications}/>
                <PrivateRoute exact path={'/userdata'} component={UserData}/>
                <PrivateRoute exact path={'/pictures'} component={Pictures}/>
                <Route path="/signup" component={SignUp} />
                <Route path="/signin" component={SignIn} />
                <PrivateRoute path="/chat/:link" component={Audio2} />

                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute path="/">
                    {/*<Header />
                    <TarjetasTinder />
                    <BotonesSwipe />*/}

                    <Navigation/>

                </PrivateRoute>


            </Switch>
            </AuthProvider>
        </Router>
    );
}

export default App;