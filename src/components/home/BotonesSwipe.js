import React, {useEffect, useRef, useState} from 'react';
import '../../style/home/BotonesSwipe.scss';
import ReplayIcon from '@material-ui/icons/Replay';
import CloseIcon from '@material-ui/icons/Close';
import StarIcon from '@material-ui/icons/Star';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import { IconButton } from '@material-ui/core';
import firebaseApp, {auth} from "../../firebase";

const BotonesSwipe = () => {

    const database = firebaseApp.firestore();
    const curUser = auth.currentUser;


    const [usersLiked, setUsersLiked]= useState([]);
    const [myUsersLiked, setMyUsersLiked]= useState([]);
    const [lastRejected,setLastRejected]= useState(null);


    const desuscribirse3 = database.collection('usersLiked').onSnapshot(snapshot => (
        setUsersLiked(snapshot.docs.map( doc => {return({id:doc.id, ...doc.data()})}))

        //el documento "doc id" en userdata comparte las preferencias del usuario
    ));

    useEffect(()=>{
        usersLiked.map(user => {
            if(curUser===user.id){
                setMyUsersLiked(user.myUsersLiked)
            }
        })

    }, [usersLiked])



    function reject(rejectedPerson){
        if(rejectedPerson!==null){
            setLastRejected(rejectedPerson);
            //persona.shift();
            //persona.pop(); si esta atras
        }

    }

    function undo(){
        if(lastRejected!=null){
            //persona.push(lastRejected) si va de atras para adelante
            //persona.unshift(lastRejected)
        }
    }


    function like(likedPerson){

        if(likedPerson!==null){
            setLastRejected(null);
            //console.log("MI PERSONA", persona)
            myUsersLiked.push(likedPerson.id)
            const usersILiked = myUsersLiked.map((obj)=> {return Object.assign({}, obj)});

            database.collection("usersLiked").doc(curUser.email).set({
                myUsersLiked: usersILiked

            })
                .then(() => {
                    console.log("Document successfully written!");
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });

            //persona.shift();
            //persona.pop(); si esta atras
        }



    }
    return (
        <div className="botonesSwipe">
            <IconButton className={"botonesSwipe__replay"} onClick={undo()}>
                <ReplayIcon style={{ fontSize: 40 }}/>
            </IconButton>

            <IconButton className={"botonesSwipe__close"} >
                <CloseIcon style={{ fontSize: 40 }}/>
            </IconButton>

            {/*<IconButton className="botonesSwipe__star">
                <StarIcon style={{ fontSize: 40 }}/>
            </IconButton>*/}

            <IconButton className={"botonesSwipe__fav"} >
                <FavoriteIcon style={{ fontSize: 40 }}/>
            </IconButton>

            {/*<IconButton className="botonesSwipe__flash">
                <FlashOnIcon style={{ fontSize: 40 }}/>
            </IconButton>*/}


        </div>
    )
}

export default BotonesSwipe;