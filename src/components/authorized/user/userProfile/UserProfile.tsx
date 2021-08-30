import React from "react";
import './UserProfile.scss';

export const UserProfile = () => {

    return (
        <form className="profile">
            <div className="profileMain">
                <div className="profileForm">
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
                            // onChange={(e) => setModel({ ...state.signUpModel, firstName: e.currentTarget.value })}
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
                            // onChange={(e) => setModel({ ...state.signUpModel, lastName: e.currentTarget.value })}
                            />
                        </label>
                    </div>
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
                            // onChange={(e) => setModel({ ...state.signUpModel, email: e.currentTarget.value })}
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
                            // onChange={(e) => setModel({ ...state.signUpModel, dateOfBirth: e.currentTarget.value })}
                            />
                        </label>
                    </div>
                </div>
                <div className="profilePhotoBlock">
                    <img className="profilePhoto" src="https://icdn.lenta.ru/images/2021/04/27/16/20210427163138131/square_320_c09ebae17387b7d6eeb9fa0d42afe5ee.jpg" />
                </div>
            </div>

            <div className="profileButtonBlock">
                <button
                    type="submit"
                    className="profileButton"
                >
                    Save
                </button>
            </div>
        </form>
    );
}