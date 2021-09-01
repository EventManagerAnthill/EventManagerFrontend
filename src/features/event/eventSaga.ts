import { put, call, takeLatest } from "redux-saga/effects";
import { eventSlice } from "./eventSlicer";
import { routerSlice } from "../routerSlice";
import * as Api from "./eventAPI";
import { PayloadAction } from "@reduxjs/toolkit";
import { EventData } from "./eventData";
import { mapToEventModel } from "./eventMapper";

export function* eventSaga() {
    yield takeLatest(eventSlice.actions.getAllEventsByUserRequested, getAllEventsByUserRequested);
}

function* getAllEventsByUserRequested(action: PayloadAction<URLSearchParams>) {
    try {
        const data: EventData[] = yield call(Api.getAllEventsByUser, action.payload);
        const model = data.map(x => { return mapToEventModel(x) });

        yield put(eventSlice.actions.getAllEventsByUserSucceed(model));
    } catch (e) {
        yield put(eventSlice.actions.getAllEventsByUserFailed(e))
    }
}