import { fork } from "redux-saga/effects";
import { identifySaga } from "../../features/identify/identifySaga";
import { resetPasswordSaga } from "../../features/resetPassword/resetPasswordSaga";
import { signInSaga } from "../../features/signIn/signInSaga";
import { signUpSaga } from "../../features/signUp/signUpSaga";
import { userSaga } from "../../features/user/userSaga";
import { companySaga } from "../../features/company/companySaga";
import { eventSaga } from "../../features/event/eventSaga";

export function* rootSaga() {
    yield fork(signInSaga);
    yield fork(signUpSaga);
    yield fork(identifySaga);
    yield fork(resetPasswordSaga);
    yield fork(userSaga);
    yield fork(companySaga);
    yield fork(eventSaga);
}