import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/state/store';
import { EventData } from './eventData';
import { EventInviteUsersModel, EventModel, EventNewFormModel, EventUploadModel, GetCompanyEventsModel } from './eventModel';


export type EventState = {
    event?: EventModel;
    eventsByUser?: EventModel[];
    eventsCompany?: GetCompanyEventsModel;
    eventNew: EventNewFormModel;
    isLoading: boolean;
};

const initialState: EventState = {
    event: undefined,
    eventsByUser: undefined,
    eventsCompany: undefined,
    eventNew: {
        eventModel: {
            name: "",
            createDate: "",
            holdingDate: "",
            type: 1,
            userId: 0,
            companyId: 0,
        },
        errors: new Map,
        isLoading: false,
    },
    isLoading: false,
};

export const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        getAllEventsByUserRequested: (state, action: PayloadAction<URLSearchParams>) => {
        },
        getAllEventsByUserSucceed: (state, action: PayloadAction<EventModel[]>) => {
            return { ...state, eventsByUser: action.payload }
        },
        getAllEventsByUserFailed: (state, action: PayloadAction<unknown>) => {
        },
        getCompanyEventsRequested: (state, action: PayloadAction<URLSearchParams>) => {
            state.isLoading = true;
        },
        getCompanyEventsSucceed: (state, action: PayloadAction<GetCompanyEventsModel>) => {
            return {
                ...state,
                eventsCompany: action.payload,
                isLoading: false,
            }
        },
        getCompanyEventsFailed: (state, action: PayloadAction<unknown>) => {
            state.isLoading = false;
        },
        createEventRequested: (state, action: PayloadAction<EventNewFormModel>) => {
            state.eventNew.eventModel = { ...action.payload.eventModel };
            state.eventNew.isLoading = true;
        },
        createEventSucceed: (state, action: PayloadAction<EventModel>) => {
            state.eventNew.eventModel = { ...initialState.eventNew.eventModel };
            state.eventNew.eventUploadPhotoModel = undefined;
            state.eventNew.eventInviteUsersModel = undefined;
            state.eventNew.eventAddUsersCSVModel = undefined;
            state.eventNew.isLoading = false;
            state.eventNew.errors = new Map;
            state.event = { ...action.payload };
        },
        createEventFailed: (state, action: PayloadAction<unknown>) => {
            state.eventNew.isLoading = false;
        },
        uploadPhotoRequested: (state, action: PayloadAction<EventUploadModel>) => {
        },
        uploadPhotoSucceed: (state, action: PayloadAction<EventModel>) => {
            if (state.event) {
                state.event.originalFileName = action.payload.originalFileName;
                state.event.fotoUrl = action.payload.fotoUrl;
            }
        },
        uploadPhotoFailed: (state, action: PayloadAction<unknown>) => {
        },
        addUsersCSVRequested: (state, action: PayloadAction<EventUploadModel>) => {
        },
        addUsersCSVSucceed: (state) => {
        },
        addUsersCSVFailed: (state, action: PayloadAction<unknown>) => {
        },
        inviteUsersRequested: (state, action: PayloadAction<EventInviteUsersModel>) => {
        },
        inviteUsersSucceed: (state) => {
        },
        inviteUsersFailed: (state, action: PayloadAction<unknown>) => {
        },
    },
});

export const { getAllEventsByUserRequested, getAllEventsByUserSucceed, getAllEventsByUserFailed,
    getCompanyEventsRequested, getCompanyEventsSucceed, getCompanyEventsFailed,
    createEventRequested, createEventSucceed, createEventFailed,
    uploadPhotoRequested, uploadPhotoSucceed, uploadPhotoFailed,
    addUsersCSVRequested, addUsersCSVSucceed, addUsersCSVFailed,
    inviteUsersRequested, inviteUsersSucceed, inviteUsersFailed } = eventSlice.actions;

export const selectEventsByUser = (state: RootState) => state.eventState.eventsByUser;
export const selectEventsCompany = (state: RootState) => state.eventState.eventsCompany;
export const selectEventNew = (state: RootState) => state.eventState.eventNew;

export const selectEventIsLoading = (state: RootState) => state.eventState.isLoading;

export default eventSlice.reducer;
