import React from "react";
import './UserProfile.scss';
import User from '../../../../assets/images/User.png'
import { UserFormModel, UserModel } from "../../../../features/user/userModel";
import { useAppDispatch, useAppSelector } from "../../../../app/state/store";
import { deletePhotoRequested, selectUserForm, updateUserRequested, uploadPhotoRequested } from "../../../../features/user/userSlice";
import moment from "moment";
import { selectLeftBarOpen } from "../../../../features/leftBar/leftBarSlice";
import { Spinner } from "../../../spinner/Spinner";

type Avatar = {
    file: File | null;
    imagePreviewUrl: string | ArrayBuffer | null;
}

export const UserProfile = () => {
    const dispatch = useAppDispatch();
    const isLeftBarOpen = useAppSelector(selectLeftBarOpen);
    const user = useAppSelector(selectUserForm);
    const [state, setState] = React.useState<UserFormModel>(user);
    const [file, setfile] = React.useState<Avatar>({ file: null, imagePreviewUrl: null });
    const input = React.useRef<HTMLInputElement>(null);

    const setModel = (model: UserModel) => {
        setState({
            ...state,
            userModel: model,
        });
    }

    const onClickPhoto = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        if (null !== input.current) {
            input.current.click();
        }
    }

    const onClickDeletePhoto = () => {
        setfile({ file: null, imagePreviewUrl: null });
        let param = new URLSearchParams();
        param.append("email", user.userModel.email);
        dispatch(deletePhotoRequested(param))
    }

    const onChangePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            let reader = new FileReader();
            let file = e.target.files[0];

            reader.onloadend = () => {
                setfile({
                    file: file,
                    imagePreviewUrl: reader.result
                });
            }

            reader.readAsDataURL(file);
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(updateUserRequested(state.userModel));
        if (file.file !== null) {
            let param = new URLSearchParams();
            param.append("email", user.userModel.email);
            let formData = new FormData();
            formData.append("file", file.file);
            dispatch(uploadPhotoRequested({ param: param, formData: formData }));
        }
    }

    return (
        <>
            {user.isLoading && <Spinner />}
            <form className={isLeftBarOpen ? "profileWithLeftBar" : "profile"} onSubmit={e => handleSubmit(e)}>
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
                        <div className="PhotoBlock">
                            <img className="profilePhoto"
                                src={(file.imagePreviewUrl && String(file.imagePreviewUrl)) ?? user.userModel.fotoUrl ?? "https://brilliant24.ru/files/cat/template_01.png"}
                            />
                            <div className="TextBlock" onClick={(e) => onClickPhoto(e)}>
                                Change image
                            </div>
                        </div>
                        <span className="profilePhotoButton" onClick={() => onClickDeletePhoto()} >
                            Delete image
                        </span>
                        <input id="inputFile" ref={input} className="profilePhotoInput" type="file" accept=".jpg, .jpeg, .png" onChange={(e) => onChangePhoto(e)} />
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
        </>
    );
}