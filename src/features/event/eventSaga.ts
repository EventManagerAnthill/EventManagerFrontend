import { put, call, takeLatest } from "redux-saga/effects";
import { eventSlice } from "./eventSlicer";
import { routerSlice } from "../routerSlice";
import * as Api from "./eventAPI";
import { PayloadAction } from "@reduxjs/toolkit";
import { EventData, GetCompanyEventsData } from "./eventData";
import { mapToEventData, mapToEventModel, mapToEventModelArray } from "./eventMapper";
import { EventGetModel, EventInviteUsersModel, EventModel, EventNewFormModel, EventUploadModel, GetCompanyEventsModel } from "./eventModel";
import { BadRequestError } from "../../api/exceptions";
import { snackbarSlice } from "../snackbar/snackbarSlice";

export function* eventSaga() {
    yield takeLatest(eventSlice.actions.getAllEventsByUserRequested, getAllEventsByUserRequested);
    yield takeLatest(eventSlice.actions.getCompanyEventsRequested, getCompanyEventsRequested);
    yield takeLatest(eventSlice.actions.createEventRequested, createEventRequested);
    yield takeLatest(eventSlice.actions.uploadPhotoRequested, uploadPhotoRequested);
    yield takeLatest(eventSlice.actions.addUsersCSVRequested, addUsersCSVRequested);
    yield takeLatest(eventSlice.actions.inviteUsersRequested, inviteUsersRequested);
    yield takeLatest(eventSlice.actions.getEventRequested, getEventRequested);
    yield takeLatest(eventSlice.actions.makeEventDelRequested, makeEventDelRequested);
    yield takeLatest(eventSlice.actions.cancelEventRequested, cancelEventRequested);
    yield takeLatest(eventSlice.actions.editEventRequested, editEventRequested);
    yield takeLatest(eventSlice.actions.deletePhotoRequested, deletePhotoRequested);
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

function* getCompanyEventsRequested(action: PayloadAction<URLSearchParams>) {
    try {
        const data: GetCompanyEventsData = yield call(Api.getCompanyEvents, action.payload);
        const model: GetCompanyEventsModel = { ...data, events: mapToEventModelArray(data.events!) }

        yield put(eventSlice.actions.getCompanyEventsSucceed(model));
    } catch (e) {
        yield put(eventSlice.actions.getCompanyEventsFailed(e))
    }
}

function* createEventRequested(action: PayloadAction<EventNewFormModel>) {
    try {
        const data: EventData = yield call(Api.createEvent, mapToEventData(action.payload.eventModel));
        const model: EventModel = mapToEventModel(data);

        let param = new URLSearchParams();
        param.append("eventId", String(model.id));

        if (action.payload.eventUploadPhotoModel) {
            yield put(eventSlice.actions.uploadPhotoRequested({ ...action.payload.eventUploadPhotoModel, param: param }));
        }

        if (action.payload.eventAddUsersCSVModel) {
            yield put(eventSlice.actions.addUsersCSVRequested({ ...action.payload.eventAddUsersCSVModel, param: param }));
        }

        if (action.payload.eventInviteUsersModel) {
            yield put(eventSlice.actions.inviteUsersRequested({ ...action.payload.eventInviteUsersModel, eventId: model.id }));
        }

        yield put(routerSlice.actions.routerRedirect(`/event/${model.id}`));

        yield put(eventSlice.actions.createEventSucceed(model));
    } catch (e) {
        yield put(eventSlice.actions.createEventFailed(e))
        if (e instanceof BadRequestError) {
            yield put(snackbarSlice.actions.snackbarOpen({ message: e.message, severity: 'error' }))
        }
    }
}

function* uploadPhotoRequested(action: PayloadAction<EventUploadModel>) {
    try {
        const data: EventData = yield call(Api.uploadPhoto, action.payload);
        const model: EventModel = mapToEventModel(data);

        yield put(eventSlice.actions.uploadPhotoSucceed(model));
    } catch (e) {
        yield put(eventSlice.actions.uploadPhotoFailed(e))
        if (e instanceof BadRequestError) {
            yield put(snackbarSlice.actions.snackbarOpen({ message: e.message, severity: 'error' }))
        }
    }
}

function* addUsersCSVRequested(action: PayloadAction<EventUploadModel>) {
    try {
        const result:string = yield call(Api.addUsersCSV, action.payload);

        // yield put(snackbarSlice.actions.snackbarOpen({ message: result, severity: 'error' }));
        yield put(eventSlice.actions.addUsersCSVSucceed());
    } catch (e) {
        yield put(eventSlice.actions.addUsersCSVFailed(e))
        if (e instanceof BadRequestError) {
            yield put(snackbarSlice.actions.snackbarOpen({ message: e.message, severity: 'error' }));
        }
    }
}

function* inviteUsersRequested(action: PayloadAction<EventInviteUsersModel>) {
    try {
        const result:string = yield call(Api.inviteUsers, action.payload);

        yield put(snackbarSlice.actions.snackbarOpen({ message: result, severity: 'success' }));
        yield put(eventSlice.actions.inviteUsersSucceed());
    } catch (e) {
        yield put(eventSlice.actions.inviteUsersFailed(e))
        if (e instanceof BadRequestError) {
            yield put(snackbarSlice.actions.snackbarOpen({ message: e.message, severity: 'error' }));
        }
    }
}

function* getEventRequested(action: PayloadAction<EventGetModel>) {
    try {
        const data: EventData = yield call(Api.getEvent, action.payload);
        const model: EventModel = mapToEventModel(data);

        yield put(eventSlice.actions.getEventSucceed(model));
    } catch (e) {
        yield put(eventSlice.actions.getEventFailed(e))
        if (e instanceof BadRequestError) {
            yield put(snackbarSlice.actions.snackbarOpen({ message: e.message, severity: 'error' }))
        }
    }
}

function* makeEventDelRequested(action: PayloadAction<number>) {
    try {
        const data: EventData = yield call(Api.makeEventDel, action.payload);
        const model: EventModel = mapToEventModel(data);

        yield put(routerSlice.actions.routerRedirect(`/event/list`));

        yield put(eventSlice.actions.makeEventDelSucceed());
    } catch (e) {
        yield put(eventSlice.actions.makeEventDelFailed(e))
        if (e instanceof BadRequestError) {
            yield put(snackbarSlice.actions.snackbarOpen({ message: e.message, severity: 'error' }))
        }
    }
}

function* cancelEventRequested(action: PayloadAction<number>) {
    try {
        const data: EventData = yield call(Api.cancelEvent, action.payload);
        const model: EventModel = mapToEventModel(data);

        yield put(routerSlice.actions.routerRedirect(`/event/list`));

        yield put(eventSlice.actions.makeEventDelSucceed());
    } catch (e) {
        yield put(eventSlice.actions.makeEventDelFailed(e))
        if (e instanceof BadRequestError) {
            yield put(snackbarSlice.actions.snackbarOpen({ message: e.message, severity: 'error' }))
        }
    }
}

function* editEventRequested(action: PayloadAction<EventModel>) {
    try {
        const data: EventData = yield call(Api.editEvent, mapToEventData(action.payload));
        const model: EventModel = mapToEventModel(data);

        yield put(routerSlice.actions.routerRedirect(`/event/${model.id}`));

        yield put(eventSlice.actions.editEventSucceed(model));
    } catch (e) {
        yield put(eventSlice.actions.editEventFailed(e))
        if (e instanceof BadRequestError) {
            yield put(snackbarSlice.actions.snackbarOpen({ message: e.message, severity: 'error' }))
        }
    }
}

function* deletePhotoRequested(action: PayloadAction<URLSearchParams>) {
    try {
        const data: EventData = yield call(Api.deletePhoto, action.payload);
        const model: EventModel = mapToEventModel(data);

        yield put(eventSlice.actions.deletePhotoSucceed(model));
    } catch (e) {
        yield put(eventSlice.actions.deletePhotoFailed(e))
        if (e instanceof BadRequestError) {
            yield put(snackbarSlice.actions.snackbarOpen({ message: e.message, severity: 'error' }))
        }
    }
}