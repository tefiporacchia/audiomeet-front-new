import React, {useEffect, useRef, useState} from 'react';
import {Input, InputGroup, Button} from 'reactstrap';
import firebaseApp from '../../firebase'
import { auth } from "../../firebase"

import {isValidPassword} from "../../utils/signUpUtils";
import {connect} from 'react-redux'

import '../../style/auth/Auth.scss';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import {Redirect, useHistory, useLocation} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { red,green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

import '../../style/data/Data.scss';
import MapSquare from "./MapSquare";

const useStyles2 = makeStyles({
    root: {
        width: 300,
        marginTop:20,
    },
});
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },

    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,

    },
    formControl: {
        marginBottom: theme.spacing(2),
        minWidth: '100%',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const GreenCheckbox = withStyles({
    root: {
        color: '#B62A8A',
        '&$checked': {
            color: '#B62A8A',
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

function valuetext(value) {
    return `${value} años`;
}

const Preferences = () => {

    const database = firebaseApp.firestore();

    const [value, setValue] = React.useState([20, 37]);
    const [valueS, setValueS] = React.useState(20);
    const [submit, setSubmit] = React.useState(false);

    const [check, setCheck] = React.useState({
        yesSmokes: true,
        noSmokes: true,
        yesAlcohol: true,
        noAlcohol: true,
        serious: true,
        notSerious: true,
        friendship: true,
        wantsMale: true,
        wantsFemale: true,
    });

    const handleChangeCheck = (event) => {
        setCheck({ ...check, [event.target.name]: event.target.checked });
    };

    const handleChangeRange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeS = (event, newValue) => {
        setValueS(newValue);
        setChosenRadix(newValue*1000);
    }

    const [state, setState] = React.useState({
        age: '',
        name: 'hai',
    });

    const handleChange = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        });
    };



    const [yesSmokes, setYesSmokes] = useState(false);
    const [noSmokes, setNoSmokes] = useState(false);
    const [yesDrinks, setYesDrinks] = useState(false);
    const [noDrinks, setNoDrinks] = useState(false);
    const [serious, setSerious] = useState(false);
    const [notSerious, setNotSerious] = useState(false);
    const [friendship, setFriendship] = useState(false);
    const [wantsMale,setWantsMale]= useState(false);
    const [wantsFemale,setWantsFemale]= useState(false);
    const [cameFromHome, setCameFromHome] = useState(false);
    const [longitud, setLongitud] = useState(0);
    const [latitud, setLatitud] = useState(0);
    const [chosenRadix, setChosenRadix] = useState(20000);

    const history = useHistory()

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                setLongitud(position.coords.longitude)
                setLatitud(position.coords.latitude)
            },
            function (error) {
                console.error("Error Code = " + error.code + " - " + error.message);
            },
            {
                enableHighAccuracy: true,
            }
        );
    }, []);


    useEffect(()=>{
        const curUser = auth.currentUser;
        const docRef = database.collection("userPreferences").doc(curUser.email);
        docRef.get().then((doc) => {
            if (doc.exists) {
                setCameFromHome(true)
                setYesSmokes(doc.data().yesSmokes);
                setNoSmokes(doc.data().noSmokes);
                setYesDrinks(doc.data().yesDrinks);
                setNoDrinks(doc.data().noDrinks);
                setSerious(doc.data().serious);
                setNotSerious(doc.data().notSerious);
                setFriendship(doc.data().friendship);
                setWantsMale(doc.data().wantsMale);
                setWantsFemale(doc.data().wantsFemale);
                setValue([doc.data().olderThan,doc.data().youngerThn])
                if(doc.data().chosenRadix){setChosenRadix(doc.data().chosenRadix)};
                if(doc.data().chosenRadix){setValueS((doc.data().chosenRadix)/1000)};
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });

    },[])

    const backToHome = event =>{
        history.push("/");
    }


    const handleChangeYesSmokes = event => {
        console.log("se toco")
        setYesSmokes(event.target.value)
    }


    const submitData = event => {

        const curUser = auth.currentUser;
        database.collection("userPreferences").doc(curUser.email).set({
            yesSmokes: yesSmokes,
            noSmokes: noSmokes,
            yesDrinks: yesDrinks,
            noDrinks: noDrinks,
            serious: serious,
            notSerious: notSerious,
            friendship: friendship,
            olderThan: value[0],
            youngerThn: value[1],
            wantsMale: wantsMale,
            wantsFemale: wantsFemale,
            chosenRadix: chosenRadix,
            latitude: latitud,
            longitude:longitud

        })

            .then(() => {
                console.log("Document successfully written!");

                if(cameFromHome){
                    history.push("/");
                }else{
                    history.push("/pictures");
                }
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });


    }

    const classes = useStyles();
    const classes2 = useStyles2();

    return (

        <div id={'container'}>
            <div id={'left-container'}>
                <div id={'logo-container'}>
                    <img src={'/assets/vector-creator.png'} id={'brand-logo'} alt={'brand-logo'} height={'350'} width={'350'}/>
                </div>
            </div>
            <div id={'right-container'}>
                <div id={'data-container'}>
                    <div id={'top-bar'}>
                        {!cameFromHome ? <span id={'sing-in-p'}>Already have an account? <a href={'/signin'} id={'sign-in-a'}>Sign
                            in</a></span> : <span id={'sing-in-p'}>Don't want to save? <a href={'/'} id={'sign-in-a'}>Back
                            home</a></span>}
                    </div>
                    <div id={'form-container'}>
                        <div id={'centered-container'}>
                            {cameFromHome ? <span id={'header'}>Change preferences</span>:<span id={'header'}>Preferences</span>}
                            <InputGroup>
                                <div id={'input-container'}>

                                        <div className={'three-checkboxes'}>
                                            <span>I am looking for someone who smokes: (check all that apply)</span>

                                            <div className={'checkboxes-pref'}>
                                                <FormControlLabel
                                                    control={<GreenCheckbox checked={yesSmokes} onChange={()=>setYesSmokes(!yesSmokes)} name="yesSmokes" />}
                                                    label="Yes"

                                                />
                                                <FormControlLabel
                                                    control={<GreenCheckbox checked={noSmokes} onChange={()=>setNoSmokes(!noSmokes)} name="noSmokes" />}
                                                    label="No"
                                                />
                                            </div>
                                        </div>
                                    <div className={'three-checkboxes'}>
                                        <span>I am looking for someone who drinks alcohol: (check all that apply)</span>

                                        <div className={'checkboxes-pref'}>
                                            <FormControlLabel
                                                control={<GreenCheckbox checked={yesDrinks} onChange={()=>setYesDrinks(!yesDrinks)} name="yesDrinks" />}
                                                label="Yes"


                                            />
                                            <FormControlLabel
                                                control={<GreenCheckbox checked={noDrinks} onChange={()=>setNoDrinks(!noDrinks)} name="noDrinks" />}
                                                label="No"

                                            />
                                        </div>
                                    </div>
                                    <div className={'three-checkboxes'}>
                                        <span>I am looking for: (check all that apply)</span>
                                        <div className={'checkboxes-pref'}>
                                            <FormControlLabel
                                                control={<GreenCheckbox checked={serious} onChange={()=>setSerious(!serious)} name="serious" />}
                                                label="Something serious"


                                            />
                                            <FormControlLabel
                                                control={<GreenCheckbox checked={notSerious} onChange={()=>setNotSerious(!notSerious)} name="notSerious" />}
                                                label="Something casual"

                                            />
                                            <FormControlLabel
                                                control={<GreenCheckbox checked={friendship} onChange={()=>setFriendship(!friendship)} name="friendship" />}
                                                label="Friendship"

                                            />
                                        </div>
                                    </div>
                                    <div className={'three-checkboxes'}>
                                        <span>I am looking for: (check all that apply)</span>
                                        <div className={'checkboxes-pref'}>
                                            <FormControlLabel
                                                control={<GreenCheckbox checked={wantsMale} onChange={()=>setWantsMale(!wantsMale)} name="wantsMale" />}
                                                label="Male"


                                            />
                                            <FormControlLabel
                                                control={<GreenCheckbox checked={wantsFemale} onChange={()=>setWantsFemale(!wantsFemale)} name="wantsFemale" />}
                                                label="Female"


                                            />
                                        </div>
                                    </div>
                                    <div width={30}>
                                    <div className={classes2.root}>
                                        <Typography id="range-slider" gutterBottom>
                                            Age range
                                        </Typography>
                                        <Slider
                                            value={value}
                                            onChange={handleChangeRange}
                                            valueLabelDisplay="auto"
                                            aria-labelledby="range-slider"
                                            getAriaValueText={valuetext}
                                        />
                                    </div>
                                    </div>

                                </div>
                            </InputGroup>
                            <div className={'map-stuff'}>
                            <MapSquare longitud={longitud} latitud={latitud} chosenRadix={chosenRadix}/>
                                <div className={classes2.root}>
                                <Typography id="discrete-slider-custom" gutterBottom>
                                    Choose your distance in kms!
                                </Typography>
                                <Slider
                                    value={valueS} onChange={handleChangeS}
                                    defaultValue={chosenRadix}
                                    getAriaValueText={valuetext}
                                    aria-labelledby="discrete-slider-custom"
                                    valueLabelDisplay="auto"

                                />
                                </div>

                            </div>
                        </div>
                        <div id={'preferences-button-container'}>
                            <button type={'button'} className={'audiomeet-button'} onClick={submitData}>
                                {cameFromHome ? 'CONFIRM!':'NEXT >'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Preferences;