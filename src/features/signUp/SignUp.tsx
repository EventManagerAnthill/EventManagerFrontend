import React from 'react';
import './SignUp.scss';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/state/store';
import { SignUpFormModel, SignUpModel } from './signUpModel';
import { selectSignUp, signUpRequested } from './signUpSlice';
import { Copyright } from '../../components/copyright/Copyright';
import { Spinner } from '../../components/spinner/Spinner';

export const SignUp = () => {
    const dispatch = useAppDispatch();
    const signUp = useAppSelector(selectSignUp)
    const [state, setState] = React.useState<SignUpFormModel>(signUp);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (state.errors.size === 0) {
            dispatch(signUpRequested(state.signUpModel));
        }
    }

    const setModel = (model: SignUpModel) => {
        setState({
            ...state,
            signUpModel: model,
        });
    }

    const setPassword = (model: SignUpModel) => {
        const errors = validatePassword(model);

        setState({
            ...state,
            signUpModel: model,
            errors: errors,
        });
    }

    React.useEffect(() => {
        if (sessionStorage.getItem('emailVerification')) {
            setModel({ ...state.signUpModel, emailVerification: Boolean(sessionStorage.getItem('emailVerification')) })
        }
    }, []);

    const validatePassword = (model: SignUpModel): Map<string, string> => {
        let errors: Map<string, string> = new Map;
        let error: string = '';
        const reNumber = /(?=.*[0-9])/;
        const reUpper = /(?=.*[A-Z])/;
        const reLower = /(?=.*[a-z])/;
        const reCount = /[0-9a-zA-Z]{8,}/;
        const reFull = /(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])[0-9a-zA-Z]{8,}/;

        if (model.repeatPassword === '') {
            errors.set('repeatpassword', 'Password is required')
        }

        if (model.password !== '' && model.repeatPassword !== '') {
            if (model.password !== model.repeatPassword) {
                errors.set('password', 'Password mismatch')
                errors.set('repeatpassword', 'Password mismatch')
            }
        }

        if (!reCount.test(model.password)) {
            error += 'At least 8 symbols;\n\r ';
        }

        if (!reLower.test(model.password)) {
            error += 'lowercase letters (a-z);\n\r ';
        }

        if (!reUpper.test(model.password)) {
            error += 'uppercase letters (A-Z);\n\r ';
        }

        if (!reNumber.test(model.password)) {
            error += `numbers (i.e. 0-9);\n\r `;
        }

        if (!reFull.test(model.password)) {
            errors.set('password', error)
        }

        return errors;
    }

    return (
        <>
            {signUp.isLoading && <Spinner />}
            <div className="SignUpPage">
                <div className="LeftBlock">
                    <div className="LeftBlock-TopBlock">
                        <div>
                            <span className="LeftBlock-Span">Already a member?</span>
                        </div>
                        <div >
                            <Link className="LeftBlock-Link" to="/signin">Sign in</Link>
                        </div>
                    </div>
                    <div className="formBlockRightSignUpBlock">
                        <div>
                            <span className="titleformBlockRightSignUpBlock">Sign up to service</span>
                        </div>
                        <form onSubmit={e => handleSubmit(e)}>
                            <div className="inputformBlockRightSignUpBlock">
                                <div className="blockInputAndLabel">
                                    <label
                                        className="blockLabel">
                                        First Name
                                        <input
                                            className="blockInput"
                                            required
                                            id="firstName"
                                            name="firstName"
                                            autoComplete="fname"
                                            onChange={(e) => setModel({ ...state.signUpModel, firstName: e.currentTarget.value })}
                                        />
                                    </label>
                                </div>
                                <div className="blockInputAndLabel">
                                    <label
                                        className="blockLabel">
                                        Last Name
                                        <input
                                            className="blockInput"
                                            required
                                            id="lastName"
                                            name="lastName"
                                            autoComplete="lname"
                                            onChange={(e) => setModel({ ...state.signUpModel, lastName: e.currentTarget.value })}
                                        />
                                    </label>
                                </div>
                            </div>
                            <div className="inputformBlockRightSignUpBlock">
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
                                            onChange={(e) => setModel({ ...state.signUpModel, email: e.currentTarget.value })}
                                        />
                                    </label>
                                </div>
                                <div className="blockInputAndLabel">
                                    <label
                                        className="blockLabel">
                                        Date of birth
                                        <input
                                            className="blockInput"
                                            required
                                            name="dateofbirth"
                                            type="date"
                                            id="dateofbirth"
                                            autoComplete="bday"
                                            onChange={(e) => setModel({ ...state.signUpModel, birthDate: e.currentTarget.value })}
                                        />
                                    </label>
                                </div>
                            </div>
                            <div className="inputformBlockRightSignUpBlock">
                                <div className="blockInputAndLabel">
                                    <label
                                        className="blockLabel">
                                        Password
                                        <input
                                            className={state.errors.get('password') ? "blockInputError" : "blockInput"}
                                            required
                                            id="password"
                                            name="password"
                                            type="password"
                                            pattern="(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])[0-9a-zA-Z]{8,}"
                                            onChange={(e) => setPassword({ ...state.signUpModel, password: e.currentTarget.value })}
                                        />
                                        <span className="Errors" >{state.errors.get('password')}</span>
                                    </label>
                                </div>
                                <div className="blockInputAndLabel">
                                    <label
                                        className="blockLabel">
                                        Repeat password
                                        <input
                                            className={state.errors.get('repeatpassword') ? "blockInputError" : "blockInput"}
                                            required
                                            name="repeatpassword"
                                            type="password"
                                            id="repeatpassword"
                                            onChange={(e) => setPassword({ ...state.signUpModel, repeatPassword: e.currentTarget.value })}
                                        />
                                        <span className="Errors" >{state.errors.get('repeatpassword')}</span>
                                    </label>
                                </div>
                            </div>
                            <div className="blockPolicy">
                                {/* <a className="blockPolicy" href="/identify">Forgot password?</a> */}
                                <span className="blockPolicy">By signing up, you agree to our terms of service and privacy policy.</span>
                            </div>
                            <div className="buttonformBlockRightSignUpBlock">
                                <button
                                    type="submit"
                                    className="AccauntformBlockRightSignUpBlock"
                                    disabled={signUp.isLoading}
                                >
                                    Sign up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="RightSignUpBlock">
                    {/* <div className="blockTileAndImage"> */}
                    <div>
                        <div className="circle">
                            <span className="circle-content">
                                Create company
                            </span>
                        </div>
                    </div>
                    <div className="arrow-hover">
                        <div className="arrow-hover-div"></div>
                    </div>
                    <div className="RightCircle">
                        <div className="circle">
                            <span className="circle-content">
                                Add events
                            </span>
                        </div>
                    </div>
                    <div className="arrow-hover">
                        <div className="arrow-hover-div-left"></div>
                    </div>
                    <div>
                        <div className="circle">
                            <span className="circle-content">
                                Invite people
                            </span>
                        </div>
                    </div>
                    <div className="arrow-hover">
                        <div className="arrow-hover-div"></div>
                    </div>
                    <div className="RightCircle">
                        <div className="circle">
                            <span className="circle-content">
                                Have a good time!
                            </span>
                        </div>
                    </div>

                    {/* <div>
                        <span className="titleForRightSignUpBlock">Now you can organize events easier and better</span>
                    </div> */}
                    {/* <div className="blockImageForRightSignUpBlock">
                        <img className="imageForRightSignUpBlock" src={MessyDoodle} alt="SignInImage" />
                    </div> */}
                    {/* </div> */}
                    <div>
                        {/* <span className="copyrightForRightSignUpBlock">?? Copyright: Creative Technologies 2020</span> */}
                        <Copyright />
                    </div>
                </div>
            </div>
        </>
    );
}