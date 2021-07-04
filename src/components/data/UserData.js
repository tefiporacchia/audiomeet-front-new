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

    const database = firebaseApp.firestore();

    const [username, setUsername] = useState("");
    const [bday, setBday] = useState("");
    const [smokes, setSmokes] = useState(false);
    const [drinks, setDrinks] = useState(false);
    const [gender, setGender] = useState(false);
    const [description, setDescription] = useState("");
    const [cameFromHome, setCameFromHome] = useState(false);
    const [valid, setValidInfo] = useState(true);

    const history = useHistory()

    function get_age(time){
        const MILLISECONDS_IN_A_YEAR = 1000*60*60*24*365;
        const date_array = time.split('-')
        const years_elapsed = (new Date() - new Date(date_array[0],date_array[1],date_array[2]))/(MILLISECONDS_IN_A_YEAR);
        return Math.trunc(years_elapsed);
    }

    useEffect(()=>{
        const curUser = auth.currentUser;
        const docRef = database.collection("userData").doc(curUser.email);
        docRef.get().then((doc) => {
            if (doc.exists) {
                setCameFromHome(true)
                setUsername(doc.data().username);
                setBday(doc.data().bday);
                setSmokes(doc.data().smokes);
                setDrinks(doc.data().drinks);
                setDescription(doc.data().description);
                setGender(doc.data().gender);
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

        if(get_age(bday)>=18){
            setValidInfo(true)
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
                    if(cameFromHome){
                        history.push("/");
                    }else{
                        history.push("/preferences");
                    }
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
        }else{
            setValidInfo(false)
        }

    }


    const classes = useStyles();

    return (

        <div id={'container'}>
            <div id={'left-container'}>
                <div id={'logo-container'}>
                    <img src={'/assets/couple.png'} id={'brand-logo'} alt={'brand-logo'} height={'350'} width={'350'}/>
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
                            {cameFromHome ? <span id={'header'}>Change your data</span>:<span id={'header'}>User data</span>}
                            <InputGroup>
                                <div id={'input-container'}>
                                    {/*{(loginError) ? <Alert severity="error">Invalid credentials!</Alert> : null}
                                    {emailInputError ? <Alert severity="error">Please add your email!</Alert> : null}
                                    {passwordInputError ? <Alert severity="error">Please add your password!</Alert> : null}*/}
                                    <Input className={'name-input'} type={'text'}
                                           placeholder={cameFromHome ? username:'Your name'} name={'email'} id={'email-input'}
                                           onChange={(event) => handleChangeName(event)}
                                           />
                                    <div className={'rowed-elements'}>
                                        <form className={classes.container} noValidate>
                                            <TextField
                                                id="date"
                                                label=""
                                                type="date"
                                                defaultValue="Birth date"
                                                value={cameFromHome?bday:bday}
                                                onChange={(event) => handleChangeDate(event)}
                                                className={classes.textField}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </form>

                                        <div className={'checkboxes'}>
                                        <FormControlLabel
                                            control={<GreenCheckbox checked={smokes} onChange={(event) => handleChangeSmokes(event)} name="checkedSmokes" />}
                                            label="Smokes"
                                            //onChange={(event) => handleChangeSmokes(event)}
                                        />
                                        <FormControlLabel
                                            control={<GreenCheckbox checked={drinks} onChange={(event) => handleChangeDrinks(event)} name="checkedDrinks" />}
                                            label="Drinks alcohol"
                                            //onChange={(event) => handleChangeDrinks(event)}
                                        />
                                        </div>
                                    </div>
                                    <div className="noValidInfo">
                                        {valid ? <p> </p> : <p>Age must be at least 18!</p>}
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
                                            <MenuItem value={true}>Female</MenuItem>
                                            <MenuItem value={false}>Male</MenuItem>
                                        </Select>
                                    </FormControl>

                                    <span>Description</span>

                                    <TextField
                                        id="outlined-textarea"
                                        //label="Type your description.."
                                        placeholder={cameFromHome?description:"Type your description.."}
                                        multiline
                                        variant="outlined"
                                        onChange={(event) => handleChangeDescription(event)}
                                    />
                                </div>
                            </InputGroup>
                        </div>
                        <div id={'user-data-button-container'}>
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
export default UserData;