import {Recorder} from 'react-voice-recorder'
//import 'react-voice-recorder/dist/index.css'
import React from "react";

const ToIgnore2  = () => {

    const [url, setUrl] = React.useState(null);
    const [blob, setBlob] = React.useState(null);
    const [chunks, setChunks] = React.useState(null);
    const [duration, setDuration] = React.useState({
        h: 0,
        m: 0,
        s: 0
    });


    const handleAudioStop = (data) =>{
        console.log(data)
        setUrl(data.url)
        setBlob(data.blob)
        setChunks(data.chunks)
        setDuration(data.duration)
    };

    const handleAudioUpload = (file) =>{
        console.log(file);
    };

    const handleReset= () =>{
        setUrl(null)
        setBlob(null)
        setChunks(null)
        setDuration({
            h: 0,
            m: 0,
            s: 0
        })
    };

    return (
        <div className="a">

            <Recorder
                hideHeader={true}
                record={true}
                title={"New recording"}
                audioURL={url}
                showUIAudio
                handleAudioStop={data => handleAudioStop(data)}
                handleAudioUpload={data => handleAudioUpload(data)}
                handleReset={() => handleReset()}
                mimeTypeToUseWhenRecording={`audio/webm`} // For specific mimetype.
            />


        </div>
    )
}

export default ToIgnore2;