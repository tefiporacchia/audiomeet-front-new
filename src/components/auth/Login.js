import React, {useEffect, useRef, useState} from 'react';
import {Input, InputGroup, Button} from 'reactstrap';

import {isValidPassword} from "../../utils/signUpUtils";
import {connect} from 'react-redux'
import '../../style/auth/Auth.scss';
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

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [emailInputError, setEmailInputError] = useState(false);
    const [passwordInputError, setPasswordInputError] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [listenSignInRequest, setListenSignInRequest ] = useState(false);

    const location = useLocation();

    /*if (listenSignInRequest){
        if (!session.loginStatus.loading){
            setListenSignInRequest(false);

            if (session.loginStatus.error){
                setLoginError(true);
            }else{
                return  <Redirect to={{ pathname: "/signin", state: { from: location } }} />;
            }
        }
    }*/

    /*if (session.loginStatus.success)
        return  <Redirect to={{ pathname: location.state?.from.pathname || `/signin`, state: { from: location } }} />;*/

    const submitSignIn = event => {
        event.preventDefault();
        if(!email || !password) {
            setError(true)
            if(!email)
                setEmailInputError(true)
            if(!password)
                setPasswordInputError(true)
            return;
        }
        const userData = {
            email: email,
            password: password
        }



        /*signInRequest(userData);*/
        setListenSignInRequest(true);
        setLoginError(false);
    }

    const handleChangeEmail = event => {
        if (error) {
            setError(false)
            setEmailInputError(false)
        }
        setEmail(event.target.value)

    }

    const handleChangePassword = event => {
        if (error) {
            setError(false)
            setPasswordInputError(false)
        }
        setPassword(event.target.value)

    }

    const signInWhenPressingEnter = event => {
        if(event.key === 'Enter')
            submitSignIn(event);
    }

    return (
        <div id={'container'}>
            <div id={'left-container'}>
                <div id={'logo-container'}>
                    <img src={'./../../../public/assets/audioMeetLogoBlanco.png'} id={'brand-logo'} alt={'brand-logo'} height={'150'} width={'180'}/>
                </div>
            </div>
            <div id={'right-container'}>
                <div id={'data-container'}>
                    <div id={'top-bar'}>
                        <span id={'sing-in-p'}>Don't have an account? <a href={'/signup'} id={'sign-in-a'}>Sign
                            up</a></span>
                    </div>
                    <div id={'form-container'}>
                        <div id={'centered-container'}>
                            <span id={'header'}>SIGN IN</span>
                            <InputGroup>
                                <div id={'input-container'}>
                                    {(loginError) ? <Alert severity="error">Invalid credentials!</Alert> : null}
                                    {emailInputError ? <Alert severity="error">Please add your email!</Alert> : null}
                                    {passwordInputError ? <Alert severity="error">Please add your password!</Alert> : null}
                                    <Input className={emailInputError ? 'input error' : 'input'} type={'text'}
                                           placeholder={'Email Address'} name={'email'} id={'email-input'}
                                           onChange={(event) => handleChangeEmail(event)}
                                           onKeyPress={signInWhenPressingEnter}/>
                                    <Input className={passwordInputError ? 'input error' : 'input'} type={'password'}
                                           placeholder={'Password'} name={'password'} id={'password-input'}
                                           onChange={(event) => handleChangePassword(event)}
                                           onKeyPress={signInWhenPressingEnter}/>
                                </div>
                            </InputGroup>
                        </div>
                        <div id={'sign-in-button-container'}>
                            <button type={'button'} className={'audiomeet-button'} onClick={submitSignIn}>
                                SIGN IN
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default Login;



