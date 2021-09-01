import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/state/store";
import { UserFormModel, UserPasswordModel } from "../../../../features/user/userModel";
import { selectUser, updateUserPasswordRequested } from "../../../../features/user/userSlice";
import './CompanyNew.scss';

export const CompanyNew = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const [state, setState] = React.useState<UserFormModel>(user);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // if (state.errors.size == 0) {
        //     dispatch(updateUserPasswordRequested(state));
        // }
    }

    const setModel = (model: UserPasswordModel) => {
        setState({
            ...state,
            userPasswordModel: model,
        });
    }

    return (
        <form className="userPassword" onSubmit={e => handleSubmit(e)}>
            <div className="blockInputAndLabel">
                <label
                    className="blockLabel">
                    New password
                    <input
                        className={state.errors.get('newpassword') ? "blockInputError" : "blockInput"}
                        required
                        id="newpassword"
                        name="newpassword"
                        type="password"
                        pattern="(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])[0-9a-zA-Z]{8,}"
                        onChange={(e) => setModel({ ...state.userPasswordModel, newPassword: e.currentTarget.value })}
                    />
                    <span className="Errors" >{state.errors.get('newpassword')}</span>
                </label>
            </div>
            <div className="blockInputAndLabel">
                <label
                    className="blockLabel">
                    Confirm new password
                    <input
                        className={state.errors.get('confirmnewpassword') ? "blockInputError" : "blockInput"}
                        required
                        name="confirmnewpassword"
                        type="password"
                        id="confirmnewpassword"
                        onChange={(e) => setModel({ ...state.userPasswordModel, confirmNewPassword: e.currentTarget.value })}
                    />
                    <span className="Errors" >{state.errors.get('confirmnewpassword')}</span>
                </label>
            </div>
            <div className="userPasswordButtonBlock">
                <button
                    type="submit"
                    className="userPasswordButton"
                    disabled={user.isLoading}
                >
                    Save
                </button>
            </div>
        </form>
    )
}