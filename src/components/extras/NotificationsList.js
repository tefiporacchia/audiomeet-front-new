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
import {Link} from "react-router-dom";

const NotificationsList = () => {
    const database = firebaseApp.firestore();
    const curUser = auth.currentUser;

    const [notifs, setNotifs]= useState([]);
    const [names, setNames]= useState([]);
    const [matches,setMatches] = useState([]);



    useEffect(()=> {

            const desuscribirse = database.collection('matches').onSnapshot(snapshot => (

                setNotifs(snapshot.docs.map( doc => (cumpleCondiciones(doc.data().user1) && doc.data().user2)  ||  (cumpleCondiciones(doc.data().user2) && doc.data().user1)).filter(elem => elem)),
                setMatches(snapshot.docs.map( doc => (cumpleCondiciones(doc.data().user1) && doc.data())  ||  (cumpleCondiciones(doc.data().user2) && doc.data())).filter(elem => elem))

            ));
            console.log(notifs);
            return () => {
                desuscribirse();
            }

    },[])

    useEffect(()=> {


        database.collection("matches").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(doc.data().user1===curUser.email){
                    database.collection("matches").doc(doc.id).set({
                        user1: doc.data().user1,
                        user2:doc.data().user2,
                        codeChat: doc.data().codeChat,
                        user1notificado: true,
                        user2notificado: doc.data().user2notificado,

                    })
                        .then(() => {
                            console.log("Document successfully written!");
                        })
                        .catch((error) => {
                            console.error("Error writing document: ", error);
                        });
                }else if (doc.data().user2===curUser.email){
                    database.collection("matches").doc(doc.id).set({
                        user1: doc.data().user1,
                        user2:doc.data().user2,
                        codeChat: doc.data().codeChat,
                        user1notificado: doc.data().user1notificado,
                        user2notificado: true,

                    })
                        .then(() => {
                            console.log("Document successfully written!");
                        })
                        .catch((error) => {
                            console.error("Error writing document: ", error);
                        });

                }
            });
        });




    },[])

    function cumpleCondiciones(user){
        return user==curUser.email;
    }

    useEffect(()=> {
        console.log("LO QUE HAY EN MATCHES", matches)
        console.log("GETCODE", getCode("tefii@gmail.com"))

        if(notifs){
            const desuscribirse = database.collection('userImages').onSnapshot(snapshot => (
                setNames(snapshot.docs.map( doc => notifs.includes(doc.id) && devolverObjetoAppendeado(doc.id,doc.data().username, doc.data().userImages[0],getCode(doc.id))).filter(elem => elem))
            ));

            return () => {
                desuscribirse();
            }
        }
    },[notifs])



    function devolverObjetoAppendeado(id, name, image,code){
        const object = new Object();
        object.id = id;
        object.name = name;
        object.image= image;
        object.code=code;
        return object;
    }

    function getCode(user){
        let code=0
        matches.forEach(function(doc){
            if(doc.user1==user){
                code= doc.codeChat
            }else if(doc.user2==user){
                code=doc.codeChat
            }
        })

        return code

    }




    const getURL = (chatCode) =>{
        console.log("CODEEE", chatCode)
        if(chatCode!==0){
            const url= window.location.href
            const url_array = url.split('notifications')
            //console.log("location.href = '"+url_array[0]+"chat"+code+"'")
            //return "location.href = '"+url_array[0]+"chat/"+code+"'"
            console.log(url_array[0]+"chat/"+chatCode)
            window.location.href=url_array[0]+"chat/"+chatCode



        }

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

                                    <SendIcon style={{fontSize:15, marginBottom:1.8, marginLeft:1, fill: '#029aff'}} onClick={getURL(name.code)}/>

                            </div>
                        </div>
                    ))}
            </div>
        </div>


    )
}

export default NotificationsList;