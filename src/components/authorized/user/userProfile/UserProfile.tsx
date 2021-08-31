import React from "react";
import './UserProfile.scss';
import User from '../../../../assets/images/User.png'
import { UserFormModel, UserModel } from "../../../../features/user/userModel";
import { useAppDispatch, useAppSelector } from "../../../../app/state/store";
import { selectUser, updateUserRequested } from "../../../../features/user/userSlice";
import moment from "moment";
import { selectLeftBarOpen } from "../../../../features/leftBar/leftBarSlice";

export const UserProfile = () => {
    const dispatch = useAppDispatch();
    const isLeftBarOpen = useAppSelector(selectLeftBarOpen);
    const user = useAppSelector(selectUser);
    const [state, setState] = React.useState<UserFormModel>(user);

    const setModel = (model: UserModel) => {
        setState({
            ...state,
            userModel: model,
        });
    }

    const onClickPhoto = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(updateUserRequested(state.userModel));
    }

    return (
        <form className={isLeftBarOpen ? "profileWithLeftBar" :"profile"} onSubmit={e => handleSubmit(e)}>
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
                                defaultValue={user.userModel.firstName}
                                onChange={(e) => setModel({ ...state.userModel, firstName: e.currentTarget.value })}
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
                                defaultValue={user.userModel.lastName}
                                onChange={(e) => setModel({ ...state.userModel, lastName: e.currentTarget.value })}
                            />
                        </label>
                    </div>
                    <div className="blockInputAndLabel">
                        <label
                            className="blockLabel">
                            Middle name
                            <input
                                className="blockInput"
                                id="middleName"
                                name="middleName"
                                defaultValue={user.userModel.middleName ?? undefined}
                                onChange={(e) => setModel({ ...state.userModel, middleName: e.currentTarget.value })}
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
                                defaultValue={user.userModel.birthDate ?? undefined}
                                onChange={(e) => setModel({ ...state.userModel, birthDate: e.currentTarget.value })}
                            />
                        </label>
                    </div>
                </div>
                <div className="profilePhotoBlock">
                    <img className="profilePhoto" src={user.userModel.fotoUrl ?? User} />
                    <span className="profilePhotoButton" onClick={(e) => onClickPhoto(e)}>
                        Add photo for your account
                        <input className="profilePhotoInput" type="file" accept=".jpg, .jpeg, .png" onClick={(e) => onClickPhoto(e)} />
                    </span>

                </div>
            </div>

            <div className="profileButtonBlock">
                <button
                    type="submit"
                    className="profileButton"
                    disabled={user.isLoading}
                >
                    Save
                </button>
            </div>
        </form>
    );
}