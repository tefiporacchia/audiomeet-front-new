import React, {Component, useState} from 'react';
import '../../style/auth/Auth.scss';
import {Input, InputGroup} from 'reactstrap';

import {isValidPassword} from "../../utils/signUpUtils";

import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import {Redirect, useLocation} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

const Register = () =>{

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [error, setError] = useState(false);
    const [emailInputError, setEmailInputError] = useState(false);
    const [passwordInputError, setPasswordInputError] = useState(false);
    const [confirmedPasswordInputError, setConfirmedPasswordInputError] = useState(false);
    const [signUpError, setSignUpError] = useState(false);
    const [emailAlreadyUsed, setEmailAlreadyUsed] = useState(false);
    const [listenSignUpRequest, setListenSignUpRequest ] = useState(false);
    const location = useLocation();



    const submitSignUp = event => {
        event.preventDefault();
        if(!email || !password || !confirmedPassword) {
            setError(true)
            if(!email)
                setEmailInputError(true)
            if(!password)
                setPasswordInputError(true)
            if(!confirmedPassword)
                setConfirmedPasswordInputError(true)
            return;
        }

        if(confirmedPassword    !== password){
            setError(true)
            setConfirmedPasswordInputError(true);
            return;
        }else if (!isValidPassword(password)) {
            setError(true)
            setPasswordInputError(true)
            return;
        }

        const userData = {
            email: email,
            password: password
        }


        setListenSignUpRequest(true);
    }

    const handleChangeEmail = event =>{
        if(error){
            setError(false)
            setEmailInputError(false)
            setEmailAlreadyUsed(false)
        }
        setEmail(event.target.value)

    }

    const handleChangePassword = event =>{
        if(error){
            setError(false)
            setPasswordInputError(false)
        }
        setPassword(event.target.value)

    }

    const handleChangeConfirmedPassword = event =>{
        if(error){
            setError(false)
            setConfirmedPasswordInputError(false)
        }
        setConfirmedPassword(event.target.value)

    }

    const signUpWhenPressingEnter = event => {
        if(event.key === 'Enter')
            submitSignUp(event);
    }


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
                            <span id={'header'}>SIGN UP</span>
                            <InputGroup>
                                <div id={'input-container'}>
                                    {(signUpError) ? <Alert severity="error">An error ocurred!</Alert> : null}
                                    {(emailAlreadyUsed) ? <Alert severity="error">Email already used.</Alert> : null}
                                    {emailInputError ? <Alert severity="error">Please enter a valid email!</Alert> : null}
                                    {passwordInputError ? <Alert severity="error">Please enter a valid password!</Alert> : null}
                                    {confirmedPasswordInputError ? <Alert severity="error">Please confirm the same password!</Alert> : null}
                                    <Input className={emailInputError ? 'input error' : 'input'} id={'email-input'} type={'email'} placeholder={'Email Address'} name={'email'} onChange={(event) => handleChangeEmail(event)} onKeyPress={signUpWhenPressingEnter}/>
                                    <label htmlFor={'password'} id={'password-label'}>**Password must contain: 8 characters, including a lowercase letter, an uppercase letter and one special character.</label>
                                    <Input className={passwordInputError ? 'input error' : 'input'} id={'password-input'} type={'password'} placeholder={'Password'} name={'password'} onChange={(event) => handleChangePassword(event)} onKeyPress={signUpWhenPressingEnter}/>
                                    <Input className={confirmedPasswordInputError ? 'input error' : 'input'} id={'confirmPassword-input'} type={'password'} placeholder={'Confirm Password'} name={'confirmPassword'} onChange={(event) => handleChangeConfirmedPassword(event)} onKeyPress={signUpWhenPressingEnter}/>
                                </div>
                            </InputGroup>
                        </div>
                        <div id={'sign-up-button-container'}>
                            <button type={'button'} className={'audiomeet-button'} onClick={submitSignUp}>
                                  SIGN UP
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}



export default Register;
