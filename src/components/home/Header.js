import React, {useEffect, useState} from 'react';
import '../../style/home/Header.scss';
import PersonIcon from '@material-ui/icons/Person';
import ForumIcon from '@material-ui/icons/Forum';
import {IconButton, makeStyles} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Link, useHistory } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import firebaseApp, {auth} from "../../firebase";

const Header = ({botonRetroceder}) => {

    const historial = useHistory();

    const database = firebaseApp.firestore();
    const curUser = auth.currentUser;

    const [notifsToShow, setNotifsToShow]= useState([]);



    useEffect(()=> {

        const desuscribirse = database.collection('matches').onSnapshot(snapshot => (
        //Chequeo que user1 se llame como el usuario actual y user1notificado sea falsa, o que user2 se llame como el usuario actual y user2notificado sea falsa.
            setNotifsToShow(snapshot.docs.map( doc => (cumpleCondiciones(doc.data().user1) && doc.data().user1notificado===false)  ||  (cumpleCondiciones(doc.data().user2) && doc.data().user2notificado===false)).filter(elem => elem))

        ));
        console.log(notifsToShow);

        return () => {
            desuscribirse();
        }

    },[])

    function cumpleCondiciones(user){
        return user==curUser.email;
    }

    useEffect(()=> {
        //if cargados == true
        //Acceder a matches y modificar los falsos anteriores a verdadero, para que no vuelvan a saltar cuando se cargue el use effect de arriba de nuevo

    },[])

    const valorDelBadge = notifsToShow.length   //Solo a modo ilustrativo, despues directamente dejar solo el notifsToShow.length dentro del badge


    return (

        <div className="header">

            {botonRetroceder ? (
                <IconButton onClick={() => historial.replace(botonRetroceder)} >
                    <ArrowBackIosIcon fontSize="large" className="header__botonRetroceder" />
                </IconButton>

            ) : (
                <Link to="/dashboard">
                <IconButton className="botonHome" >
                    {/*<PersonIcon className="header__icon" fontSize="large" />*/}
                    <AccountCircleIcon fontSize="large" className="header__botonRetroceder" />
                    <span className={'home-span'}>Profile</span>
                </IconButton>

                </Link>
            )}

            {/*<Link to="/">
                <img img src={'/assets/audioMeetLogoBlanco.png'}
                     className="header__logo"
                     alt="logo" />
            </Link>*/}
            <span className={'audiomeet-span'}>Audiomeet</span>


            <Link to="/notifications">

                <IconButton className="botonHome" >
                    {/*<PersonIcon className="header__icon" fontSize="large" />*/}
                    <Badge color="secondary" badgeContent={valorDelBadge}>      {/*Si el length es 0, por default no se muestra el badge*/}
                    <NotificationsIcon fontSize="large" className="header__botonRetroceder" />
                    {/*<span className={'matches-span'}>My matches</span>*/}          {/*Queda mejor sin esta oración, no?*/}
                    </Badge>
                </IconButton>


            </Link>


        </div>
    )
}

export default Header;