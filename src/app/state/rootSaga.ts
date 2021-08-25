import { fork } from "redux-saga/effects";
import { identifySaga } from "../../features/identify/identifySaga";
import { resetPasswordSaga } from "../../features/resetPassword/resetPasswordSaga";
import { signInSaga } from "../../features/signIn/signInSaga";
import { signUpSaga } from "../../features/signUp/signUpSaga";

export function* rootSaga() {
    yield fork(signInSaga);
    yield fork(signUpSaga);
    yield fork(identifySaga);
    yield fork(resetPasswordSaga);
}