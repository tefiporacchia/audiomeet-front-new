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
import {useHistory} from "react-router-dom";
import {useParams} from "react-router";

const NotificationsList = () => {
    const database = firebaseApp.firestore();
    const curUser = auth.currentUser;
    const history = useHistory()
    const [notifs, setNotifs]= useState([]);
    const [names, setNames]= useState([]);



    useEffect(()=> {

            const desuscribirse = database.collection('matches').onSnapshot(snapshot => (

               // setNotifs(snapshot.docs.map( doc => (cumpleCondiciones(doc.data().user1) && doc.data().user2)  ||  (cumpleCondiciones(doc.data().user2) && doc.data().user1)).filter(elem => elem))
                setNotifs(snapshot.docs.map( doc => (cumpleCondiciones(doc.data().user1) && devolverObjetoAppendeadoCorto(doc.data().user2,doc.data().codeChat))  ||  (cumpleCondiciones(doc.data().user2) && devolverObjetoAppendeadoCorto(doc.data().user1,doc.data().codeChat))).filter(elem => elem))
            ));
            console.log("aaaaa");
            console.log(notifs);
            return () => {
                desuscribirse();
            }

    },[])

    function devolverObjetoAppendeadoCorto(user, link){
        const object = new Object();
        object.user = user;
        object.link = link;
        return object;
    }


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

    useEffect(()=>{

        console.log("hola ",names);

    }, [names])

    useEffect(()=> {
        console.log("BBBB");
        console.log(notifs);

        //DOUBLE MAP, en vez de notifs includes poner el segundo map y un if
        if(notifs){
            const desuscribirse = database.collection('userImages').onSnapshot(snapshot => {
                let array = snapshot.docs.map(doc => notifs.map(notif => (doc.id == notif.user) && devolverObjetoAppendeado(doc.id, doc.data().username, doc.data().userImages[0], notif.link)).filter(elem => elem))
                let array2 = array.filter((item)=>item.length>0)
                setNames(array2)
            });

            return () => {
                desuscribirse();
            }
        }
    },[notifs])


    function devolverObjetoAppendeado(id, name, image, link){

        //hacer que reciba el link tmb en los parametros, lo consigue de la posicion de notifs en cuestion
        const object = new Object();
        object.id = id;
        object.name = name;
        object.image= image;
        object.link = link;
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


    //recibe el parametro de "link"
    const onclick = ( val) =>{
        console.log("AAAABBBB")
        console.log(val)
        history.push(`/conv/${val}`);
        //chat/:id
    }


    return (
        <div className="wrapper">
            <div className="notifications">
                    {names.map(name => (
                        console.log("CCCCC"),
                        console.log(name[0].link),
                        <div className="notifications__item" onClick={() => onclick(name[0].link)}>
                            <div className="notifications__item__avatar">
                                <img
                                    src={name[0].image}/>
                            </div>
                            <div className="notifications__item__content">
                                <span className="notifications__item__title">{name[0].name}</span>
                                <span className="notifications__item__message">is your new match!</span>
                            </div>
                            <div>

                                    <SendIcon style={{fontSize:15, marginBottom:1.8, marginLeft:1, fill: '#029aff'}}/>

                            </div>
                        </div>
                    ))}
            </div>
        </div>


    )
}

export default NotificationsList;