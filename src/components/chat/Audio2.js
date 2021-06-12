import React, {useEffect, useState} from "react";
import {Recorder} from "react-voice-recorder";
import firebaseApp, {auth} from '../../firebase'
import {svSE} from "@material-ui/core/locale";



const Audio2  = () => {

    const MicRecorder = require('mic-recorder-to-mp3');
    const database = firebaseApp.firestore();
    const curUser = auth.currentUser;
    const storage = firebaseApp.storage();
    const li = document.createElement('li');




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
                    li.appendChild(playr);
                    document.querySelector('#playlist').appendChild(li);
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
    const recorder = new MicRecorder({
        bitRate: 128
    });


    const startRecording= () =>{
        recorder.start().then(() => {
            // something else
        }).catch((e) => {
            console.error(e);
        });
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
            li.appendChild(player);

            document.querySelector('#playlist').appendChild(li);
            console.log(player)

            //guardar a base de datos
            save(file)

            //player.play();

        }).catch((e) => {
            alert('We could not retrieve your message');
            console.log(e);
        });
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


    return (
        <div className="container text-center">
            <h1>Mic Recorder to Mp3 Example</h1>
            <p>Check your web developer tool console.</p>

            <hr/>

            <button className="btn btn-primary" onClick={startRecording}>Start recording</button>
            <button className="btn btn-primary" onClick={stopRecording}>Stop recording</button>

            <br/>
            <br/>
            <br/>

            <ul id="playlist"></ul>
        </div>
    )
}

export default Audio2;