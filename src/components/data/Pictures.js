import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import ImageUploading from "react-images-uploading";
import '../../style/data/Pictures.scss';
import Preferences from "./Preferences";
import firebaseApp, {auth} from "../../firebase";

const Pictures = () => {

    const storage = firebaseApp.storage();
    const database = firebaseApp.firestore();
    const [images, setImages] = React.useState([]);
    const maxNumber = 9;

    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log("imagenes",imageList, addUpdateIndex);
        setImages(imageList);
    };

    useEffect(()=>{
        console.log(images)
    },[images])


    const [userImages, setUserImages] = React.useState([]);
    const curUser = auth.currentUser;
    const storageRef = storage.ref();

    const submitData = event => {
        //add images to storage
        uploadToStorage()
        //Add images url to database
        addToDatabase()
    }

    function uploadToStorage(){

        for (let i = 0; i < images.length; i++) {
            const message = images[i].data_url
            storage.ref(curUser.email+'/'+i).putString(message, 'data_url').then(function(snapshot) {
                console.log('Uploaded a data_url string!');
            });
        }
    }

    function addToDatabase(){

        //const userImages=[]
        // Find all the images for user and add then to array.
        storageRef.child(curUser.email).listAll().then(function(res) {
            res.items.forEach(function(itemRef) {
                itemRef.getDownloadURL().then(function(url){
                    console.log("added "+ url)
                    userImages.push(url)
                })
            });
        }).catch(function(error) {
            console.log('Error!');
        });

        console.log("userImages="+ userImages)

        //copy array to database
        database.collection("userImages").doc(curUser.email).set({
            userImages: userImages,

        })
            .then(() => {
                console.log("Document successfully written!");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
    }

    return (
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
                            <button className="chooseordropbutton"
                                style={isDragging ? { color: "red" } : null}
                                onClick={onImageUpload}
                                {...dragProps}
                            >
                                Choose or drop here !
                            </button>
                            &nbsp;
                            <button className="chooseordropbutton" onClick={onImageRemoveAll}>Remove all</button>

                            <button type={'button'} className={'audiomeet-button'} onClick={submitData}>
                                {'SIGUIENTE'}
                            </button>
                        </div>

                        <div className="allimages">
                            {imageList.map((image, index) => (
                                <div key={index} className="image-item">
                                    <img src={image.data_url} alt="" width="100" />
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
    );
}
export default Pictures;
