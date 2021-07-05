import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import ImageUploading from "react-images-uploading";
import '../../style/data/Pictures.scss';
import Preferences from "./Preferences";
import firebaseApp, {auth} from "../../firebase";
import {useHistory} from "react-router-dom";

const Pictures = () => {

    const storage = firebaseApp.storage();
    const database = firebaseApp.firestore();
    const [images, setImages] = React.useState([]);
    const maxNumber = 9;
    const history = useHistory()

    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log("imagenes",imageList, addUpdateIndex);
        setImages(imageList);
    };

    useEffect(()=>{
        console.log(images)
    },[images])


    const [userImages, setUserImages] = React.useState([]);
    const [loading, setLoading] = useState(false);
    const curUser = auth.currentUser;
    const storageRef = storage.ref();
    const [username, setUsername] = useState("");
    const [description, setDescription] = useState("");
    const [cameFromHome, setCameFromHome] = useState(false);


    const docRef = database.collection("userData").doc(curUser.email);
    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            setUsername(doc.data().username);
            setDescription(doc.data().description);


        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });

    useEffect(()=>{
        const docRef = database.collection("userImages").doc(curUser.email);
        docRef.get().then((doc) => {
            if (doc.exists) {
                setCameFromHome(true)
                setImages(doc.data().userImages)
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });

    },[])


    const submitData = event => {

        //add images to storage
        uploadToStorage()
        //setTimeout(addToArray,10000)
        setTimeout(addToDatabase,20000)
        //Add images url to database
        history.push("/");

    }

    const backToHome = event =>{
        history.push("/");
    }

    function uploadToStorage(){
        setLoading(true)

        for (let i = 0; i < images.length; i++) {
            if (images[i].data_url) {
            const message = images[i].data_url
            storage.ref(curUser.email + '/' + i).putString(message, 'data_url').then(function (snapshot) {
                snapshot.ref.getDownloadURL().then(function(downloadUrl){
                    console.log("se subió en ",downloadUrl);
                    images[i]=downloadUrl;
                })
            });

            }
        }

        setLoading(true)
    }


    function addToDatabase(){

        //const userImages=[]
        // Find all the images for user and add then to array.
        //console.log("userImages="+ userImages)

        //copy array to database
        database.collection("userImages").doc(curUser.email).set({
            userImages: images,
            username: username,
            description: description

        })
            .then(() => {
                console.log("Document successfully written!");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });

        setLoading(false)

    }

    const deleteFromFirebase = (url) => {
        let pictureRef = storage.refFromURL(url);
        pictureRef.delete()
            .then(() => {

            })
            .catch((err) => {
                console.log(err);
            });
    };



    return (
        <>
        <div className="headerPics">
            {!cameFromHome && <span className={'imgup'}>Image Uploading</span>}
            {cameFromHome && <span className={'imgup'}>Update your pictures!</span>}
            {cameFromHome && <button type={'button'} className={'photos-button'} onClick={backToHome}>
                {<span>Go back</span>}
            </button>}
        </div>
        <div className="Pictures">
            <ImageUploading
                multiple={true}
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
            >
                {({
                      imageList,
                      onImageUpload,
                      onImageRemoveAll,
                      onImageUpdate,
                      onImageRemove,
                      isDragging,
                      dragProps
                  }) => (
                    // write your building UI
                    <div className="upload__image-wrapper">
                        <div className="globalbuttons">
                            <div>
                            <button className="chooseordropbutton"
                                style={isDragging ? { color: "red" } : null}
                                onClick={onImageUpload}
                                {...dragProps}
                            >
                                Choose or drop here !
                            </button>
                            &nbsp;
                            <button className="chooseordropbutton" onClick={onImageRemoveAll}>Remove all</button>
                            </div>
                            <button type={'button'} className={'photos-button'} onClick={submitData}>
                                {loading ? <div className="loader"/>: <span>Save</span>}
                            </button>

                        </div>

                        <div className="allimages">
                            {imageList.map((image, index) => (
                                <div key={index} className="image-item">
                                    <img src={image.data_url? image.data_url: image} alt="" width="100" />
                                    <div className="image-item__btn-wrapper">
                                        <button className="updateButton" onClick={() => onImageUpdate(index)}>↺</button>
                                        <button className="xbutton" onClick={() => onImageRemove(index)}>x</button>

                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                )}
            </ImageUploading>
        </div>
        </>
    );
}
export default Pictures;
