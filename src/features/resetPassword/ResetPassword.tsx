import React from 'react';
import './ResetPassword.scss';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/state/store';
import { BaseInformation } from '../../components/block/baseInformation/BaseInformation';
import { resetPasswordRequested, selectResetPassword } from './resetPasswordSlice';
import { ResetPasswordFormModel, ResetPasswordModel, ResetPasswordRequestModel } from './resetPasswordModel';
import { Spinner } from '../../components/spinner/Spinner';


export const ResetPassword = () => {
    const dispatch = useAppDispatch();
    const resetPassword = useAppSelector(selectResetPassword)
    const [state, setState] = React.useState<ResetPasswordFormModel>(resetPassword);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (state.errors.size == 0) {
            let params = new URLSearchParams(window.location.search);

            let req: ResetPasswordRequestModel = {
                password: state.resetPasswordModel.confirmNewPassword,
                code: params.get("code") ?? undefined,
                email: params.get("email") ?? undefined,
                validTo: params.get("validTo") ?? undefined,
            }

            dispatch(resetPasswordRequested(req));
        }
    }

    const setModel = (model: ResetPasswordModel) => {
        const errors = validateModel(model);

        setState({
            ...state,
            resetPasswordModel: model,
            errors: errors,
        });
    }

    const validateModel = (model: ResetPasswordModel): Map<string, string> => {
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
        <>
        {resetPassword.isLoading && <Spinner />}
            <div className="ResetPassword">
                <BaseInformation />
                <div className="ResetPasswordMain">
                    <div className="FormResetPasswordMain">
                        <div>
                            <span className="FormResetPasswordMain-Span">Reset Password</span>
                        </div>
                        <form onSubmit={e => handleSubmit(e)}>
                            <div className="inputformBlockRightSignUpBlock">
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
                                            onChange={(e) => setModel({ ...state.resetPasswordModel, newPassword: e.currentTarget.value })}
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
                                            onChange={(e) => setModel({ ...state.resetPasswordModel, confirmNewPassword: e.currentTarget.value })}
                                        />
                                        <span className="Errors" >{state.errors.get('confirmnewpassword')}</span>
                                    </label>
                                </div>
                            </div>
                            <div className="buttonformBlockRightSignUpBlock">
                                <button
                                    type="submit"
                                    className="AccauntformBlockRightSignUpBlock"
                                    disabled={resetPassword.isLoading}
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

