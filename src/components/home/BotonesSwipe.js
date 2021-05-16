import React, {useEffect, useRef, useState} from 'react';
import '../../style/home/BotonesSwipe.scss';
import ReplayIcon from '@material-ui/icons/Replay';
import CloseIcon from '@material-ui/icons/Close';
import StarIcon from '@material-ui/icons/Star';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import { IconButton } from '@material-ui/core';
import firebaseApp, {auth} from "../../firebase";

    const BotonesSwipe = ({undo, reject,like}) => {

        return (
            <div className="botonesSwipe">
                <IconButton className={"botonesSwipe__replay"} onClick={undo}>
                    <ReplayIcon style={{ fontSize: 40 }}/>
                </IconButton>

                <IconButton className={"botonesSwipe__close"} onClick={reject}>
                    <CloseIcon style={{ fontSize: 40 }}/>
                </IconButton>

                <IconButton className={"botonesSwipe__fav"} onClick={like}>
                    <FavoriteIcon style={{ fontSize: 40 }}/>
                </IconButton>

            </div>
        )
    }

export default BotonesSwipe;