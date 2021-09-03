import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/state/store';
import { EventData } from './eventData';
import { EventModel } from './eventModel';


export type EventState = {
    event?: EventModel;
    eventsByUser?: EventModel[];
    eventsCompany?: EventModel[];
};

const initialState: EventState = {
    event: undefined,
    eventsByUser: undefined,
    eventsCompany: undefined,
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
        getAllEventsByUserFailed: (state, action: PayloadAction<Error>) => {
        },
        getCompanyEventsRequested: (state, action: PayloadAction<URLSearchParams>) => {
        },
        getCompanyEventsSucceed: (state, action: PayloadAction<EventModel[]>) => {
            state.eventsCompany = action.payload.map(x => { return x });
        },
        getCompanyEventsFailed: (state, action: PayloadAction<Error>) => {
        },
    },
});

export const { getAllEventsByUserRequested, getAllEventsByUserSucceed, getAllEventsByUserFailed,
    getCompanyEventsRequested, getCompanyEventsSucceed, getCompanyEventsFailed } = eventSlice.actions;

export const selectEventsByUser = (state: RootState) => state.eventState.eventsByUser;
export const selectEventsCompany = (state: RootState) => state.eventState.eventsCompany;

export default eventSlice.reducer;
