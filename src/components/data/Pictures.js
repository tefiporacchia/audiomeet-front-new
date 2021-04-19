import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import ImageUploading from "react-images-uploading";
import '../../style/data/Pictures.scss';
import Preferences from "./Preferences";

const Pictures = () => {
    const [images, setImages] = React.useState([]);
    const maxNumber = 9;
    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);

    };

    useEffect(()=>{
        console.log(images)
    },[images])

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
