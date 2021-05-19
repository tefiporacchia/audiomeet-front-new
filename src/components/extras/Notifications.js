import React from 'react';
import '../../style/home/Navigation.scss';
import PersonIcon from '@material-ui/icons/Person';
import ForumIcon from '@material-ui/icons/Forum';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {Link, Route, useHistory} from 'react-router-dom';

import NotificationsHeader from "./NotificationsHeader";
import NotificationsList from "./NotificationsList";


const Navigation = ({}) => {

    return (
        <div className="navigation">
            <NotificationsHeader />
            <NotificationsList />
        </div>
    )
}

export default Navigation;