import { fork } from "redux-saga/effects";
import { signInSaga } from "../../features/signIn/signInSaga";
import { signUpSaga } from "../../features/signUp/signUpSaga";

export function* rootSaga() {
    yield fork(signInSaga);
    yield fork(signUpSaga);
}