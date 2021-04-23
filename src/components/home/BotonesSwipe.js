import React, {useEffect, useRef, useState} from 'react';
import '../../style/home/BotonesSwipe.scss';
import ReplayIcon from '@material-ui/icons/Replay';
import CloseIcon from '@material-ui/icons/Close';
import StarIcon from '@material-ui/icons/Star';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import { IconButton } from '@material-ui/core';

const BotonesSwipe = () => {

    return (
        <div className="botonesSwipe">
            <IconButton className="botonesSwipe__replay">
                <ReplayIcon style={{ fontSize: 40 }}/>
            </IconButton>

            <IconButton className="botonesSwipe__close">
                <CloseIcon style={{ fontSize: 40 }}/>
            </IconButton>

            {/*<IconButton className="botonesSwipe__star">
                <StarIcon style={{ fontSize: 40 }}/>
            </IconButton>*/}

            <IconButton className="botonesSwipe__fav">
                <FavoriteIcon style={{ fontSize: 40 }}/>
            </IconButton>

            {/*<IconButton className="botonesSwipe__flash">
                <FlashOnIcon style={{ fontSize: 40 }}/>
            </IconButton>*/}


        </div>
    )
}

export default BotonesSwipe;