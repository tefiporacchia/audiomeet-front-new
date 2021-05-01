import React from 'react';
import '../../style/home/Header.scss';
import PersonIcon from '@material-ui/icons/Person';
import ForumIcon from '@material-ui/icons/Forum';
import { IconButton } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Link, useHistory } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';



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


            <Link to="/chats">
                <IconButton>
                    <ForumIcon className="header__icon" fontSize="large"/>
                </IconButton>
            </Link>


        </div>
    )
}

export default Header;