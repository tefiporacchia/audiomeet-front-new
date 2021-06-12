import React, {useEffect, useState} from "react";
import {Recorder} from "react-voice-recorder";
import firebaseApp, {auth} from '../../firebase'
import {svSE} from "@material-ui/core/locale";
import '../../style/home/Header.scss';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import NotificationsIcon from "@material-ui/icons/Notifications";
import Alert from "@material-ui/lab/Alert";
import {IconButton, makeStyles} from "@material-ui/core";

const useClasses = makeStyles(theme => ({
    iconContainer: {
        "&:hover $icon": {
            color: 'black',
        }
    },
    icon: {
        color: '#E43D44',
    },
}))

const Audio2  = () => {
    const classes = useClasses()

    const MicRecorder = require('mic-recorder-to-mp3');
    const database = firebaseApp.firestore();
    const curUser = auth.currentUser;
    const storage = firebaseApp.storage();
    const div = document.createElement('div');
    div.setAttribute("className", "playlistCompleta");
    const [micOn, setMicOn] = useState(false);
    const [recorder, setRecorder] = useState(new MicRecorder({
        bitRate: 128
    }))


    const [messages, setMessages]= useState([]);

    //---------Funciones Auxiliares-------------------------------------------------------------------------------

    //Busco el codigo del chat porque ese es el id del documento en la base de datos
    const url= window.location.href
    const url_array = url.split('/')
    const code=url_array[3]
    console.log("CODE",url_array[3])

    //make id
    function makeid() {
        const result           = [];
        const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for ( var i = 0; i < 10; i++ ) {
            result.push(characters.charAt(Math.floor(Math.random() *
                charactersLength)));
        }
        return result.join('')
    }

    //---------Cargo datos-------------------------------------------------------------------------------

    useEffect(()=> {
        const docRef = database.collection("audiosProbando").doc(code);
        let initialArray=[]
        docRef.get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                initialArray=doc.data().messages
                setMessages(initialArray)

                initialArray.forEach(myFunction);


                function myFunction(item, index) {

                    console.log("AAAAAAAAAAAA")

                    const items = item.split(',')
                    const url=items[1]
                    const playr = new Audio(url);
                    console.log(playr)
                    playr.controls = true;
                    div.appendChild(playr);
                    document.querySelector('#playlist').appendChild(div);
                }

            } else {

                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });



    },[])

    //---------Botones audio-------------------------------------------------------------------------------


// New instance
    /*const recorder = new MicRecorder({
        bitRate: 128
    });*/


    const startRecording= () =>{
        recorder.start().then(() => {
            // something else

        }).catch((e) => {
            console.error(e);
        });
        setMicOn(true)
    };



    const stopRecording= () =>{
        recorder
            .stop()
            .getMp3().then(([buffer, blob]) => {
            // do what ever you want with buffer and blob
            // Example: Create a mp3 file and play
            const file = new File(buffer, 'me-at-thevoice.mp3', {
                type: blob.type,
                lastModified: Date.now()
            });

            //lo copie al principio
            //const li = document.createElement('li');

            const player = new Audio(URL.createObjectURL(file));
            player.controls = true;
            div.appendChild(player);

            document.querySelector('#playlist').appendChild(div);
            console.log(player)

            //guardar a base de datos
            save(file)

            //player.play();

        }).catch((e) => {
            alert('We could not retrieve your message');
            console.log(e);
        });
        setMicOn(false)
    };
// Start recording. Browser will request permission to use your microphone.

// Once you are done singing your best song, stop and get the mp3.

    //---------Guardar datos-------------------------------------------------------------------------------

    const save = (file) =>{

        const audioId= makeid()
        const ref= code+"/"+audioId

        console.log("REFERENCIA",ref)

        storage.ref(ref).put(file).then(function(snapshot) {
            console.log('Uploaded a blob or file!');
            saveToDatabase(ref)
        });

    }

    const saveToDatabase = (ref) =>{

        storage.ref(ref).getDownloadURL().then(function(url){
            console.log("URL",url)
            const array= [...messages,curUser.email+","+ url]
            setMessages(array)
            console.log(messages)

            database.collection("audiosProbando").doc(code).set({
                messages: array

            })
                .then(() => {
                    console.log("Document successfully written!");
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });

        })




    }


    return (<div>
        <div className="header"><span className={'audiomeet-span'}>Chat</span></div>
        <div className="container text-center">

            <div id="playlist"></div>

            <IconButton classes={{
                root: classes.iconContainer
            }}>
            {micOn ? <MicIcon fontSize="large" className={classes.icon} onClick={stopRecording}/>
            : <MicOffIcon fontSize="large" className={classes.icon} onClick={startRecording}/>}
            </IconButton>

        </div>
        </div>
    )
}

export default Audio2;