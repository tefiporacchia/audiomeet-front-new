import React, {useState, useEffect} from 'react';
import '../../style/home/TarjetasTinder.scss';
import TarjetaPersona from 'react-tinder-card'
import firebaseApp, {auth} from '../../firebase'
import moment from 'moment';
import {IconButton} from "@material-ui/core";
import ReplayIcon from "@material-ui/icons/Replay";
import CloseIcon from "@material-ui/icons/Close";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SendIcon from '@material-ui/icons/Send';

import '../../style/extras/NotificationsList.scss';
import NotificationsIcon from "@material-ui/icons/Notifications";
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import {blue} from "@material-ui/core/colors";

const NotificationsList = () => {
    const database = firebaseApp.firestore();
    const curUser = auth.currentUser;

    const [notifs, setNotifs]= useState([]);
    const [names, setNames]= useState([]);

    useEffect(()=> {

            const desuscribirse = database.collection('matches').onSnapshot(snapshot => (

                setNotifs(snapshot.docs.map( doc => (cumpleCondiciones(doc.data().user1) && doc.data().user2)  ||  (cumpleCondiciones(doc.data().user2) && doc.data().user1)).filter(elem => elem))

            ));
            console.log(notifs);
            return () => {
                desuscribirse();
            }

    },[])

    function cumpleCondiciones(user){
        return user==curUser.email;
    }

    useEffect(()=> {
        if(notifs){
            const desuscribirse = database.collection('userImages').onSnapshot(snapshot => (
                setNames(snapshot.docs.map( doc => notifs.includes(doc.id) && devolverObjetoAppendeado(doc.id,doc.data().username, doc.data().userImages[0])).filter(elem => elem))
            ));

            return () => {
                desuscribirse();
            }
        }
    },[notifs])


    function devolverObjetoAppendeado(id, name, image){
        const object = new Object();
        object.id = id;
        object.name = name;
        object.image= image;
        return object;
    }


    /*useEffect(()=> {
        setNotifs(notifs.map(notif =>(
        database.collection("userImages").doc(notif).get().then((doc) => {
            if (doc.exists) {
                devolverObjetoAppendeado(notif, doc.data().username, doc.data().userImages[0])
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        })
        )))


    },[notifs])*/



    return (
        <div className="wrapper">
            <div className="notifications">
                    {names.map(name => (
                        <div className="notifications__item">
                            <div className="notifications__item__avatar">
                                <img
                                    src={name.image}/>
                            </div>
                            <div className="notifications__item__content">
                                <span className="notifications__item__title">{name.name}</span>
                                <span className="notifications__item__message">is your new match!</span>
                            </div>
                            <div>
                                {/*<div className="notifications__item__option archive js-option">*/}
                                    <SendIcon style={{fontSize:15, marginBottom:1.8, marginLeft:1, fill: '#029aff'}}/>
                                {/*</div>*/}
                                {/*<div className="notifications__item__option delete js-option">
                                    <i className="fas fa-trash"></i>
                                </div>*/}
                            </div>
                        </div>
                    ))}
            </div>
        </div>


    )
}

export default NotificationsList;