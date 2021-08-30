import React from "react";
import { useAppDispatch } from "../../../../app/state/store";
import './UserPassword.scss';

export const UserPassword = () => {
    const dispatch = useAppDispatch();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <form className="userPassword" onSubmit={e => handleSubmit(e)}>
            <div className="blockInputAndLabel">
                <label
                    className="blockLabel">
                    New password
                    <input
                        // className={state.errors.get('newpassword') ? "blockInputError" : "blockInput"}
                        className="blockInput"
                        required
                        id="newpassword"
                        name="newpassword"
                        type="password"
                        pattern="(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])[0-9a-zA-Z]{8,}"
                    // onChange={(e) => setModel({ ...state.resetPasswordModel, newPassword: e.currentTarget.value })}
                    />
                    {/* <span className="Errors" >{state.errors.get('newpassword')}</span> */}
                </label>
            </div>
            <div className="blockInputAndLabel">
                <label
                    className="blockLabel">
                    Confirm new password
                    <input
                        // className={state.errors.get('confirmnewpassword') ? "blockInputError" : "blockInput"}
                        className="blockInput"
                        required
                        name="confirmnewpassword"
                        type="password"
                        id="confirmnewpassword"
                    // onChange={(e) => setModel({ ...state.resetPasswordModel, confirmNewPassword: e.currentTarget.value })}
                    />
                    {/* <span className="Errors" >{state.errors.get('confirmnewpassword')}</span> */}
                </label>
            </div>
            <div className="userPasswordButtonBlock">
                <button
                    type="submit"
                    className="userPasswordButton"
                // disabled={resetPassword.isLoading}
                >
                    Save
                </button>
            </div>
        </form>
    )
}