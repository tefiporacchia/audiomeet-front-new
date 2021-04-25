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

    const [check, setCheck] = React.useState({
        yesSmokes: true,
        noSmokes: true,
        yesAlcohol: true,
        noAlcohol: true,
        serious: true,
        notSerious: true,
        friendship: true,
    });

    const handleChangeCheck = (event) => {
        setCheck({ ...check, [event.target.name]: event.target.checked });
    };

    const handleChangeRange = (event, newValue) => {
        setValue(newValue);
    };

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
    const history = useHistory()


    const handleChangeYesSmokes = event => {
        console.log("se toco")
        setYesSmokes(event.target.value)
    }

    useEffect(()=>{
        console.log("cambio smokes")
    },[yesSmokes,noSmokes])




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
            youngerThn: value[1]

        })
            .then(() => {
                console.log("Document successfully written!");
                history.push("/");
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
                        <span id={'sing-in-p'}>Already have an account? <a href={'/signin'} id={'sign-in-a'}>Sign
                            in</a></span>
                    </div>
                    <div id={'form-container'}>
                        <div id={'centered-container'}>
                            <span id={'header'}>Preferencias</span>
                            <InputGroup>
                                <div id={'input-container'}>

                                        <div className={'three-checkboxes'}>
                                            <span>Quiero conocer usuarios que fumen (chequear todas las que apliquen)</span>

                                            <div className={'checkboxes-pref'}>
                                                <FormControlLabel
                                                    control={<GreenCheckbox checked={yesSmokes} onChange={()=>setYesSmokes(!yesSmokes)} name="yesSmokes" />}
                                                    label="Si"

                                                />
                                                <FormControlLabel
                                                    control={<GreenCheckbox checked={noSmokes} onChange={()=>setNoSmokes(!noSmokes)} name="noSmokes" />}
                                                    label="No"
                                                />
                                            </div>
                                        </div>
                                    <div className={'three-checkboxes'}>
                                        <span>Quiero conocer usuarios que consuman alcohol (chequear todas las que apliquen)</span>

                                        <div className={'checkboxes-pref'}>
                                            <FormControlLabel
                                                control={<GreenCheckbox checked={yesDrinks} onChange={()=>setYesDrinks(!yesDrinks)} name="yesDrinks" />}
                                                label="Si"


                                            />
                                            <FormControlLabel
                                                control={<GreenCheckbox checked={noDrinks} onChange={()=>setNoDrinks(!noDrinks)} name="noDrinks" />}
                                                label="No"

                                            />
                                        </div>
                                    </div>
                                    <div className={'three-checkboxes'}>
                                        <span>Busco: (chequear todas las que apliquen)</span>
                                        <div className={'checkboxes-pref'}>
                                            <FormControlLabel
                                                control={<GreenCheckbox checked={serious} onChange={()=>setSerious(!serious)} name="serious" />}
                                                label="Algo serio"


                                            />
                                            <FormControlLabel
                                                control={<GreenCheckbox checked={notSerious} onChange={()=>setNotSerious(!notSerious)} name="notSerious" />}
                                                label="Algo no muy serio"

                                            />
                                            <FormControlLabel
                                                control={<GreenCheckbox checked={friendship} onChange={()=>setFriendship(!friendship)} name="friendship" />}
                                                label="Amistad"

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
                        </div>
                        <div id={'preferences-button-container'}>
                            <button type={'button'} className={'audiomeet-button'} onClick={submitData}>
                                {'SIGUIENTE >'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Preferences;