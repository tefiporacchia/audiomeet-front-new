import React from "react";
import {Recorder} from "react-voice-recorder";


const Audio2  = () => {

    const MicRecorder = require('mic-recorder-to-mp3');

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
            const li = document.createElement('li');

            const player = new Audio(URL.createObjectURL(file));
            player.controls = true;
            li.appendChild(player);
            document.querySelector('#playlist').appendChild(li);
            console.log(player);
            //player.play();

        }).catch((e) => {
            alert('We could not retrieve your message');
            console.log(e);
        });
    };
// Start recording. Browser will request permission to use your microphone.


// Once you are done singing your best song, stop and get the mp3.


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