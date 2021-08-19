import { fork } from "redux-saga/effects";
import { signInSaga } from "../../features/signIn/signInSaga";

export function* rootSaga() {
    yield fork(signInSaga);
}