import React from 'react';
import '../../style/home/Header.scss';
import PersonIcon from '@material-ui/icons/Person';
import ForumIcon from '@material-ui/icons/Forum';
import { IconButton } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Link, useHistory } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';



const Header = ({botonRetroceder}) => {

    const historial = useHistory();
    return (
        <div className="header">

            {botonRetroceder ? (
                <IconButton onClick={() => historial.replace(botonRetroceder)} >
                    <ArrowBackIosIcon fontSize="large" className="header__botonRetroceder" />
                </IconButton>

            ) : (
                <Link to="/dashboard">
                <IconButton className="botonHome">
                    {/*<PersonIcon className="header__icon" fontSize="large" />*/}
                    <HomeIcon fontSize="medium" className="header__botonRetroceder" />
                </IconButton>
                </Link>
            )}

            <Link to="/">
                <img img src={'/assets/audioMeetLogoBlanco.png'}
                     className="header__logo"
                     alt="logo" />
            </Link>


            <Link to="/chats">
                <IconButton>
                    <ForumIcon className="header__icon" fontSize="large"/>
                </IconButton>
            </Link>


        </div>
    )
}

export default Header;