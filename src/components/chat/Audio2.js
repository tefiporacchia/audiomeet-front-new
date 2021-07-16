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
import '../../style/chat/Chat.scss';
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import {Link} from "react-router-dom";
import ImageIcon from '@material-ui/icons/Image';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import ImageUploading from "react-images-uploading";

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
    div.setAttribute("style","display: flex;flex-direction: column;marginTop:1rem;");
    const [micOn, setMicOn] = useState(false);
    const [recorder, setRecorder] = useState(new MicRecorder({
        bitRate: 128
    }))
    const [messages2, setMessages2] = useState([]);

    const [messages, setMessages]= useState([]);
    const [nombreDelUsuario, setNombre] = useState(null);
    const today = new Date();


    useEffect(()=> {

        const docRef = database.collection("userData").doc(curUser.email);
        docRef.get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                setNombre(doc.data().username);
                console.log(nombreDelUsuario);
            } else {

                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    },[])

    //---------Funciones Auxiliares-------------------------------------------------------------------------------

    //Busco el codigo del chat porque ese es el id del documento en la base de datos
    const url= window.location.href
    const url_array = url.split('/')
    const code=url_array[4]
    console.log("CODE",url_array[4])

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

    useEffect(()=>{
        if(messages.length>0){
            console.log(messages)
            //messages.forEach(myFunction)
        }
    },[messages])

    function myFunction(item, index) {

        console.log("AAAAAAAAAAAA")


        const playr = new Audio(url);
        console.log(playr)
        playr.controls = true;

        const conjunto = document.createElement('div');
        const span = document.createElement('span');
        span.innerText = item[2];

        conjunto.appendChild(span);
        conjunto.appendChild(playr);

        conjunto.setAttribute("style", `display: flex;flex-direction: column;margin-top:2rem; align-items:${item[2] === nombreDelUsuario ? "flex-end" : "flex-start"}`);
        document.querySelector('#playlist').appendChild(conjunto);


    }

    useEffect(()=> {
        if(nombreDelUsuario!=null) {
            const docRef = database.collection("audiosProbando").doc(code);
            let initialArray = []
            docRef.onSnapshot((doc) => {
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                    initialArray = doc.data().messages
                    setMessages2(initialArray)
                    let a = initialArray.map(item => item.split(","))
                    setMessages(a)



                } else {

                    console.log("No such document!");
                }
            })
        }

    },[nombreDelUsuario])

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
            /*div.appendChild(player);

            document.querySelector('#playlist').appendChild(div);
            console.log(player)*/

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
            saveToDatabase(ref,"audio")
        });

    }

    const saveToDatabase = (ref, type) =>{
        const date = today.getDate()+ '/' +(today.getMonth() + 1)+ '/' +today.getFullYear() + '  ' + today.getHours() + ":" + today.getMinutes()  ;
        console.log("DATE",date)

        storage.ref(ref).getDownloadURL().then(function(url){
            console.log("URL",url)
            const array= [...messages2,curUser.email+","+ url+ "," +nombreDelUsuario+ "," +date + "," +`${type}`]
            console.log(messages)
            console.log(array)
            //setMessages(array)


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

    const uploadImage = () =>{

    }

    const uploadVideo = () =>{

    }
    const [file, setFile] = React.useState("");
    function handleUpload(event) {
        setFile(event.target.files[0]);

        // Add code here to upload file to server
        // ...
    }


    return (<div>
        <div className="header">
            <Link to="/home">
            <IconButton className="botonHome" >
                {/*<PersonIcon className="header__icon" fontSize="large" />*/}
                <ArrowBackIosIcon fontSize="medium" className="header__botonRetroceder" />
                <span className={'home-span'}>Home</span>
            </IconButton>

        </Link>
        </div>
        <div className="container text-center">

            <div id="playlist">
                {
                    messages.map(item=><div style={{display: "flex",flexDirection: "column",marginTop:"2rem",alignItems:item[2] === nombreDelUsuario ? "flex-end" : "flex-start"}}>
                        <span>{item[2]}</span>
                        {(item[4]=='img')&&<img preload="auto" src={item[1]} controls></img>}
                        {(item[4]=='audio')&&<audio preload="auto" src={item[1]} controls></audio>}
                        {(item[4]=='video')&&<video preload="auto" src={item[1]} controls></video>}
                        <span style={{fontSize:'small'}}>{item[3]}</span>
                    </div>)

                }

            </div>

            <div className={'botones'}>
                {/*boton de imagen*/}
                <IconButton id={'botoncinho'} classes={{
                    root: classes.iconContainer
                }}>
                     <ImageIcon fontSize="large" className={classes.icon} onClick={uploadImage}/>
                </IconButton>

                <IconButton id={'botoncinho'} classes={{
                    root: classes.iconContainer
                }}>
                    {micOn ? <MicIcon fontSize="large" className={classes.icon} onClick={stopRecording}/>
                        : <MicOffIcon fontSize="large" className={classes.icon} onClick={startRecording}/>}
                </IconButton>

                {/*boton de videos*/}
                <IconButton id={'botoncinho'} classes={{
                    root: classes.iconContainer
                }}>

                    <VideoLibraryIcon fontSize="large" className={classes.icon} onClick={uploadVideo}>
                        <input  type="file" onChange={handleUpload} hidden/>
                    </VideoLibraryIcon>


                </IconButton>
            </div>

        </div>
        </div>
    )
}

export default Audio2;