import React from 'react';
import './SignIn.scss';
import {
    Avatar,
    Box,
    Container,
    Grid,
    makeStyles,
    TextField,
    Typography,
    Button,
    CssBaseline
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { Link } from 'react-router-dom';
import { Copyright } from '../../components/Copyright';
import { useAppDispatch, useAppSelector } from '../../app/state/store';
import { SignInModel } from './signInModel';
import { selectSignInIsLoading, selectSignInModel, signInRequested } from './signInSlice';
import MessyDoodle from '../../assets/images/MessyDoodle.png';
import facebookLogo from '../../assets/images/facebookLogo.png';
import googleLogo from '../../assets/images/googleLogo.png';

export const SignIn = () => {
    const isLoading = useAppSelector(selectSignInIsLoading);
    const signInModel = useAppSelector(selectSignInModel);
    const dispatch = useAppDispatch();
    const [state, setState] = React.useState<SignInModel>(signInModel);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(signInRequested(state));
    }

    return (
        <div className="generalSignInBlock">
            <div className="leftSignInBlock">
                <div className="blockTileAndImage">
                    <div>
                        <span className="titleForLeftSignInBlock">Work with documents easily</span>
                    </div>
                    <div className="blockImageForLeftSignInBlock">
                        <img className="imageForLeftSignInBlock" src={MessyDoodle} alt="SignInImage" />
                    </div>
                </div>
                <div>
                    <span className="copyrightForLeftSignInBlock">© Copyright: Creative Technologies 2020</span>
                </div>
            </div>
            <div className="rightSignInBlock">
                <div className="topBlockRightSigInBlock">
                    <div>
                        <span className="spanTopBlockRightSigInBlock">Not a member yet?</span>
                    </div>
                    <div >
                        <Link className="linkTopBlockRightSigInBlock" to="/" >Sign up</Link>
                    </div>
                </div>
                <div className="formBlockRightSigInBlock">
                    <div>
                        <span className="titleformBlockRightSigInBlock">Sign in to service</span>
                    </div>
                    <div className="buttomSNformBlockRightSigInBlock">
                        <button className="googleformBlockRightSigInBlock">
                            <img className="imageForButton" src={googleLogo} />
                            Continue with Google
                        </button>
                        <button className="facebookformBlockRightSigInBlock">
                            <img className="imageForButton" src={facebookLogo} />
                            Continue with Facebook
                        </button>
                    </div>
                    <div className="blockForLines">
                        <hr className="HRLine" />
                        <span className="text">Or</span>
                        <hr className="HRLine" />
                    </div>
                    <div className="inputformBlockRightSigInBlock">
                        <div className="blockInputAndLabel">
                            <div>
                                <span className="blockLabel">Email</span>
                            </div>
                            <div>
                                <input className="blockInput" />
                            </div>
                        </div>
                        <div className="blockInputAndLabel">
                            <div>
                                <span className="blockLabel">Password</span>
                            </div>
                            <div>
                                <input className="blockInput" />
                            </div>
                        </div>
                    </div>
                    <div className="blockPolicy">
                        <Link className="blockPolicy" to="/identify" >Forgot password?</Link>
                    </div>
                    <div className="buttonformBlockRightSigInBlock">
                        <button className="AccauntformBlockRightSigInBlock">Sign in</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

