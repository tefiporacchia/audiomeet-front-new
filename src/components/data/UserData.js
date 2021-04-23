import React, {useEffect, useRef, useState} from 'react';
import {Input, InputGroup, Button} from 'reactstrap';
import firebaseApp from '../../firebase'
import { auth } from "../../firebase"



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
import '../../style/data/Data.scss';
import MenuItem from '@material-ui/core/MenuItem';


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

const UserData = () => {

    const [check, setCheck] = React.useState({
        checkedDrinks: true,
        checkedSmokes: true,
    });

    const handleChangeCheck = (event) => {
        setCheck({ ...check, [event.target.name]: event.target.checked });
    };


    const database = firebaseApp.firestore();


    const [username, setUsername] = useState("");
    const [bday, setBday] = useState("");
    const [smokes, setSmokes] = useState(false);
    const [drinks, setDrinks] = useState(false);
    const [gender, setGender] = useState(false);
    const [description, setDescription] = useState("");

    const handleChangeName = event => {
        setUsername(event.target.value)

    }
    const handleChangeDate = event => {
        setBday(event.target.value)

    }
    const handleChangeSmokes = event => {
        setSmokes(event.target.checked)
    }
    const handleChangeDrinks = event => {
        setDrinks(event.target.checked)

    }

    const handleChangeGender = (event) => {
        setGender(event.target.value)

    };

    const handleChangeDescription = (event) => {
        setDescription(event.target.value)

    };



    const submitData = event => {

        const curUser = auth.currentUser;
        database.collection("userData").doc(curUser.email).set({
            username: username,
            bday: bday,
            smokes: smokes,
            drinks: drinks,
            gender: gender,
            description: description

        })
            .then(() => {
                console.log("Document successfully written!");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });

    }


    const classes = useStyles();

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
                            <span id={'header'}>DATA</span>
                            <InputGroup>
                                <div id={'input-container'}>
                                    {/*{(loginError) ? <Alert severity="error">Invalid credentials!</Alert> : null}
                                    {emailInputError ? <Alert severity="error">Please add your email!</Alert> : null}
                                    {passwordInputError ? <Alert severity="error">Please add your password!</Alert> : null}*/}
                                    <Input className={'name-input'} type={'text'}
                                           placeholder={'your name'} name={'email'} id={'email-input'}
                                           onChange={(event) => handleChangeName(event)}
                                           />
                                    <div className={'rowed-elements'}>
                                        <form className={classes.container} noValidate>
                                            <TextField
                                                id="date"
                                                label=""
                                                type="date"
                                                defaultValue="Birth date"
                                                onChange={(event) => handleChangeDate(event)}
                                                className={classes.textField}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </form>
                                        <div className={'checkboxes'}>
                                        <FormControlLabel
                                            control={<GreenCheckbox checked={check.checkedSmokes} onChange={handleChangeCheck} name="checkedSmokes" />}
                                            label="Fuma"
                                            onChange={(event) => handleChangeSmokes(event)}
                                        />
                                        <FormControlLabel
                                            control={<GreenCheckbox checked={check.checkedDrinks} onChange={handleChangeCheck} name="checkedDrinks" />}
                                            label="Consume Alcohol"
                                            onChange={(event) => handleChangeDrinks(event)}
                                        />
                                        </div>
                                    </div>
                                    {/*<FormControl variant="outlined" className={classes.formControl}>
                                        <InputLabel htmlFor="outlined-age-native-simple">Sexo</InputLabel>
                                        <Select
                                            native
                                            onChange={(event) => handleChangeGender(event)}
                                            label="Sexo"
                                            inputProps={{
                                                name: 'age',
                                                id: 'outlined-age-native-simple',
                                            }}
                                        >
                                            <option>Mujer</option>
                                            <option>Hombre</option>
                                        </Select>
                                    </FormControl>*/}
                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-outlined-label">gender</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={gender}
                                            onChange={handleChangeGender}
                                            label="gender"
                                        >
                                            <MenuItem value={true}>Mujer</MenuItem>
                                            <MenuItem value={false}>Hombre</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <TextField
                                        id="outlined-textarea"
                                        label="Type your description.."
                                        placeholder="Placeholder"
                                        multiline
                                        variant="outlined"
                                        onChange={(event) => handleChangeDescription(event)}
                                    />
                                </div>
                            </InputGroup>
                        </div>
                        <div id={'user-data-button-container'}>
                            <button type={'button'} className={'audiomeet-button'} onClick={submitData}>
                                {'SIGUIENTE'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default UserData;