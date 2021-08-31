import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/state/store";
import { UserFormModel, UserPasswordModel } from "../../../../features/user/userModel";
import { selectUser, updateUserPasswordRequested } from "../../../../features/user/userSlice";
import './UserPassword.scss';

export const UserPassword = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const [state, setState] = React.useState<UserFormModel>(user);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (state.errors.size == 0) {
            dispatch(updateUserPasswordRequested(state));
        }
    }

    const setModel = (model: UserPasswordModel) => {
        const errors = validateModel(model);

        setState({
            ...state,
            userPasswordModel: model,
            errors: errors,
        });
    }

    const validateModel = (model: UserPasswordModel): Map<string, string> => {
        let errors: Map<string, string> = new Map;
        let error: string = '';
        const reNumber = /(?=.*[0-9])/;
        const reUpper = /(?=.*[A-Z])/;
        const reLower = /(?=.*[a-z])/;
        const reCount = /[0-9a-zA-Z]{8,}/;
        const reFull = /(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])[0-9a-zA-Z]{8,}/;

        if (model.confirmNewPassword == '') {
            errors.set('confirmnewpassword', 'Password is required')
        }

        if (model.newPassword !== '' && model.confirmNewPassword !== '') {
            if (model.newPassword !== model.confirmNewPassword) {
                errors.set('newpassword', 'Password mismatch')
                errors.set('confirmnewpassword', 'Password mismatch')
            }
        }

        if (!reCount.test(model.newPassword)) {
            error += 'At least 8 symbols;\n\r ';
        }

        if (!reLower.test(model.newPassword)) {
            error += 'lowercase letters (a-z);\n\r ';
        }

        if (!reUpper.test(model.newPassword)) {
            error += 'uppercase letters (A-Z);\n\r ';
        }

        if (!reNumber.test(model.newPassword)) {
            error += `numbers (i.e. 0-9);\n\r `;
        }

        if (!reFull.test(model.newPassword)) {
            errors.set('newpassword', error)
        }

        return errors;
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