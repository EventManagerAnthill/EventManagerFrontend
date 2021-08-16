import { put, call, takeLatest } from "redux-saga/effects";
import { ActionType, getType } from "typesafe-actions";
import { TokenData } from "./signInData2";
import { TokenModel } from "./signInModel2";
import { signInSlice} from "./signInSlice";
import * as Api from "./signInAPI"; 

export function* signInSaga() {
    yield takeLatest(getType(signInSlice.actions.signInRequested), signInRequested);
}

function* signInRequested(action: ActionType<typeof signInSlice.actions.signInRequested>) {
    try {
        const data: TokenData = yield call(Api.postLogin, action.payload);
        const model: TokenModel = { ...data }
        
        localStorage.setItem('token', JSON.stringify(model));

        yield put(signInSlice.actions.signInSucceed());
    } catch (e) {
        yield put(signInSlice.actions.signInFailed(e))
    }
}