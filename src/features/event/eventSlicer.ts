import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/state/store';
import { EventData } from './eventData';
import { EventModel } from './eventModel';


export type EventState = {
    event?: EventModel;
    eventsByUser?: EventModel[];
};

const initialState: EventState = {
    event: undefined,
    eventsByUser: undefined,
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
    },
});

export const { getAllEventsByUserRequested, getAllEventsByUserSucceed, getAllEventsByUserFailed } = eventSlice.actions;

export const selectEventsByUser = (state: RootState) => state.eventState.eventsByUser;

export default eventSlice.reducer;
