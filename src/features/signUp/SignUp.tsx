import React from 'react';
import './SignUp.scss';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/state/store';
// import { SignInModel } from './signInModel';
// import { selectSignInIsLoading, selectSignInModel, signInRequested } from './signInSlice';


export const SignUp = () => {
    // const isLoading = useAppSelector(selectSignInIsLoading);
    // const signInModel = useAppSelector(selectSignInModel);
    // const dispatch = useAppDispatch();
    // const [state, setState] = React.useState<SignInModel>(signInModel);

    // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     dispatch(signInRequested(state));
    // }

    return (
        <div className="SignUpPage">
            <div className="LeftBlock">
                <div className="LeftBlock-TopBlock">
                    <div>
                        <span className="LeftBlock-Span">Already a member?</span>
                    </div>
                    <div >
                        <Link className="LeftBlock-Link" to="/signIn">Sign in</Link>
                    </div>
                </div>

                <div className="formBlockRightSigInBlock">
                    <div>
                        <span className="titleformBlockRightSigInBlock">Sign up to service</span>
                    </div>
                    <div className="buttomSNformBlockRightSigInBlock">
                        <button className="googleformBlockRightSigInBlock">
                            {/* <img className="imageForButton" src={googleLogo} /> */}
                            Continue with Google
                        </button>
                        <button className="facebookformBlockRightSigInBlock">
                            {/* <img className="imageForButton" src={facebookLogo} /> */}
                            Continue with Facebook
                        </button>
                    </div>
                    <div className="blockForLines">
                        <hr className="HRLine" />
                        <span className="text">Or</span>
                        <hr className="HRLine" />
                    </div>
                    <form>
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
                                        // onChange={(e) => setState({ ...state, email: e.currentTarget.value })}
                                    />
                                </label>
                            </div>
                            <div className="blockInputAndLabel">
                                <div>
                                    <span className="blockLabel">Password</span>
                                </div>
                                <div>
                                    <input
                                        className="blockInput"
                                        required
                                        name="password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        // onChange={(e) => setState({ ...state, password: e.currentTarget.value })}
                                    />
                                </div>
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
                                // disabled={isLoading}
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="leftSignInBlock">
                <div className="blockTileAndImage">
                    <div>
                        <span className="titleForLeftSignInBlock">Now you can organize events easier and better</span>
                    </div>
                    <div className="blockImageForLeftSignInBlock">
                        {/* <img className="imageForLeftSignInBlock" src={MessyDoodle} alt="SignInImage" /> */}
                    </div>
                </div>
                <div>
                    <span className="copyrightForLeftSignInBlock">© Copyright: Creative Technologies 2020</span>
                </div>
            </div>
        </div>
    );
}