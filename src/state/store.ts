import { configureStore } from '@reduxjs/toolkit';
import studentsReducer from './studentsSlice';

export const store = configureStore({
    reducer: {
        students: studentsReducer,
    },
});

// Root state type
export type RootState = ReturnType<typeof store.getState>;

// Dispatch type
export type AppDispatch = typeof store.dispatch;
