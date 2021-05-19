import React, {useState, useEffect} from 'react';
import '../../style/home/TarjetasTinder.scss';
import TarjetaPersona from 'react-tinder-card'
import firebaseApp, {auth} from '../../firebase'
import moment from 'moment';
import {IconButton} from "@material-ui/core";
import ReplayIcon from "@material-ui/icons/Replay";
import CloseIcon from "@material-ui/icons/Close";
import FavoriteIcon from "@material-ui/icons/Favorite";

import '../../style/extras/NotificationsList.scss';

const NotificationsList = () => {
    const database = firebaseApp.firestore();
    const curUser = auth.currentUser;

    const [notifs, setNotifs]= useState([]);

    useEffect(()=> {

            const desuscribirse = database.collection('matches').onSnapshot(snapshot => (

                setNotifs(snapshot.docs.map( doc => (cumpleCondiciones(doc.data().user1) && doc.data().user2)||(cumpleCondiciones(doc.data().user2) && doc.data().user1)).filter(elem => elem))

            ));
            console.log(notifs);
            return () => {
                desuscribirse();
            }

    },[])

    function cumpleCondiciones(user){
        return user==curUser.email;
    }


    return (
        <div className="wrapper">
            <div className="notifications">
                    {notifs.map(notif => (
                        <div className="notifications__item">
                            <div className="notifications__item__avatar">
                                <img
                                    src="https://i.pinimg.com/originals/a8/16/3a/a8163adee21e0e8e9760fd98d8484a84.gif"/>
                            </div>
                            <div className="notifications__item__content">
                                <span className="notifications__item__title">{notif}</span>
                                <span className="notifications__item__message">is your new match!</span>
                            </div>
                            <div>
                                <div className="notifications__item__option archive js-option">
                                    <i className="fas fa-folder"></i>
                                </div>
                                <div className="notifications__item__option delete js-option">
                                    <i className="fas fa-trash"></i>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>


    )
}

export default NotificationsList;