import React, {useEffect, useRef, useState} from 'react';
import {Input, InputGroup, Button} from 'reactstrap';

import {isValidPassword} from "../../utils/signUpUtils";
import {connect} from 'react-redux'

import '../../style/auth/Auth.scss';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import {Redirect, useLocation} from 'react-router-dom';
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
    const [value, setValue] = React.useState([20, 37]);

    const [check, setCheck] = React.useState({
        yesSmokes: false,
        noSmokes: false,
        yesAlcohol: false,
        noAlcohol: false,
        serious: false,
        notSerious: false,
        friendship: false,
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


    const [name, setName] = useState("");
    const [bday, setBday] = useState("");
    const [loc, setLoc] = useState("");
    const [smokes, setSmokes] = useState(false);
    const [drinks, setDrinks] = useState(false);
    const [gender, setGender] = useState("");
    const [description, setDescription] = useState("");

    const handleChangeName = event => {
        setName(event.target.value)

    }
    const classes = useStyles();
    const classes2 = useStyles2();

    return (

        <div id={'container'}>
            <div id={'left-container'}>
                <div id={'logo-container'}>
                    <img src={'/assets/audioMeetLogoBlanco.png'} id={'brand-logo'} alt={'brand-logo'} height={'150'} width={'180'}/>
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
                                                    control={<GreenCheckbox checked={check.yesSmokes} onChange={handleChangeCheck} name="yesSmokes" />}
                                                    label="Si"
                                                />
                                                <FormControlLabel
                                                    control={<GreenCheckbox checked={check.noSmokes} onChange={handleChangeCheck} name="noSmokes" />}
                                                    label="No"
                                                />
                                            </div>
                                        </div>
                                    <div className={'three-checkboxes'}>
                                        <span>Quiero conocer usuarios que consuman alcohol (chequear todas las que apliquen)</span>

                                        <div className={'checkboxes-pref'}>
                                            <FormControlLabel
                                                control={<GreenCheckbox checked={check.yesAlcohol} onChange={handleChangeCheck} name="yesAlcohol" />}
                                                label="Si"
                                            />
                                            <FormControlLabel
                                                control={<GreenCheckbox checked={check.noAlcohol} onChange={handleChangeCheck} name="noAlcohol" />}
                                                label="No"
                                            />
                                        </div>
                                    </div>
                                    <div className={'three-checkboxes'}>
                                        <span>Busco: (chequear todas las que apliquen)</span>
                                        <div className={'checkboxes-pref'}>
                                            <FormControlLabel
                                                control={<GreenCheckbox checked={check.serious} onChange={handleChangeCheck} name="serious" />}
                                                label="Algo serio"
                                            />
                                            <FormControlLabel
                                                control={<GreenCheckbox checked={check.notSerious} onChange={handleChangeCheck} name="notSerious" />}
                                                label="Algo no muy serio"
                                            />
                                            <FormControlLabel
                                                control={<GreenCheckbox checked={check.friendship} onChange={handleChangeCheck} name="friendship" />}
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
                            <button type={'button'} className={'audiomeet-button'} >
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