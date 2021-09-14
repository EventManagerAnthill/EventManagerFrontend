import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/state/store';
import { EventData } from './eventData';
import { EventModel, GetCompanyEventsModel } from './eventModel';


export type EventState = {
    event?: EventModel;
    eventsByUser?: EventModel[];
    eventsCompany?: GetCompanyEventsModel;
    isLoading: boolean;
};

const initialState: EventState = {
    event: undefined,
    eventsByUser: undefined,
    eventsCompany: undefined,
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
    },
});

export const { getAllEventsByUserRequested, getAllEventsByUserSucceed, getAllEventsByUserFailed,
    getCompanyEventsRequested, getCompanyEventsSucceed, getCompanyEventsFailed } = eventSlice.actions;

export const selectEventsByUser = (state: RootState) => state.eventState.eventsByUser;
export const selectEventsCompany = (state: RootState) => state.eventState.eventsCompany;
export const selectEventIsLoading = (state: RootState) => state.eventState.isLoading;

export default eventSlice.reducer;
