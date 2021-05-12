import React from 'react';
import '../../style/home/Navigation.scss';
import PersonIcon from '@material-ui/icons/Person';
import ForumIcon from '@material-ui/icons/Forum';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {Link, Route, useHistory} from 'react-router-dom';
import Header from "./Header";
import TarjetasTinder from "./TarjetasTinder";
import BotonesSwipe from "./BotonesSwipe";

const Navigation = ({}) => {

    return (
        <div className="navigation">
            <Header />
            <TarjetasTinder />
        </div>
    )
}

export default Navigation;