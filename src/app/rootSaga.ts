import { fork } from "redux-saga/effects";
import { signInSaga } from "../features/signIn/signInSaga2";

export function* rootSaga() {
    yield fork(signInSaga);
}