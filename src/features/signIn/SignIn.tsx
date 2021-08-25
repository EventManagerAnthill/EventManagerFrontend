import React from 'react';
import './SignIn.scss';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/state/store';
import { SignInModel } from './signInModel';
import { selectSignInIsLoading, selectSignInModel, signInRequested, signInValidateUser } from './signInSlice';
import MessyDoodle from '../../assets/images/MessyDoodle.png';
import facebookLogo from '../../assets/images/facebookLogo.png';
import googleLogo from '../../assets/images/googleLogo.png';
import { Copyright } from '../../components/copyright/Copyright';
import SignInGoogle from '../../components/button/google/Google';
import SignInFacebook from '../../components/button/facebook/Facebook';

export const SignIn = () => {
    const location = useLocation();
    const isLoading = useAppSelector(selectSignInIsLoading);
    const signInModel = useAppSelector(selectSignInModel);
    const dispatch = useAppDispatch();
    const [state, setState] = React.useState<SignInModel>(signInModel);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(signInRequested(state));
    }

    React.useEffect(() => {
        if (location.search !="") {
            console.log(location.search);
            dispatch(signInValidateUser(location.search));  
        }
    });

    return (
        <div className="generalSignInBlock">
            <div className="leftSignInBlock">
                <div className="blockTileAndImage">
                    <div>
                        <span className="titleForLeftSignInBlock">Now you can organize events easier and better</span>
                    </div>
                    <div className="blockImageForLeftSignInBlock">
                        <img className="imageForLeftSignInBlock" src={MessyDoodle} alt="SignInImage" />
                    </div>
                </div>
                <div>
                    <Copyright />
                </div>
            </div>
            <div className="rightSignInBlock">
                <div className="topBlockRightSigInBlock">
                    <div>
                        <span className="spanTopBlockRightSigInBlock">Not a member yet?</span>
                    </div>
                    <div >
                        <Link className="linkTopBlockRightSigInBlock" to="/signup">Sign up</Link>
                    </div>
                </div>

                <div className="formBlockRightSigInBlock">
                    <div>
                        <span className="titleformBlockRightSigInBlock">Sign in to service</span>
                    </div>
                    <div className="buttomSNformBlockRightSigInBlock">
                        {/* <button className="googleformBlockRightSigInBlock">
                            <img className="imageForButton" src={googleLogo} />
                            Continue with Google
                        </button> */}
                        <SignInGoogle disabled={isLoading} />
                        <SignInFacebook disabled={isLoading} />
                    </div>
                    <div className="blockForLines">
                        <hr className="HRLine" />
                        <span className="text">Or</span>
                        <hr className="HRLine" />
                    </div>
                    <form onSubmit={e => handleSubmit(e)}>
                        <div className="inputformBlockRightSigInBlock">
                            <div className="blockInputAndLabel">
                                <label
                                    className="blockLabel">
                                    Email
                                    <input
                                        className="blockInput"
                                        required
                                        id="email"
                                        name="email"
                                        autoComplete="email"
                                        type="email"
                                        autoFocus
                                        onChange={(e) => setState({ ...state, email: e.currentTarget.value })}
                                    />
                                </label>
                            </div>
                            <div className="blockInputAndLabel">
                                <label
                                    className="blockLabel">
                                    Password
                                    <input
                                        className="blockInput"
                                        required
                                        name="password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        onChange={(e) => setState({ ...state, password: e.currentTarget.value })}
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="blockPolicy">
                            {/* <a className="blockPolicy" href="/identify">Forgot password?</a> */}
                            <Link className="blockPolicy" to="/identify" >Forgot password?</Link>
                        </div>
                        <div className="buttonformBlockRightSigInBlock">
                            <button
                                type="submit"
                                className="AccauntformBlockRightSigInBlock"
                                disabled={isLoading}
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

