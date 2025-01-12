import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import {Student} from "@/models/student";


interface AppState {
    students: Student[];
    selectedStudent: Student | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: AppState = {
    students: [],
    selectedStudent:{} as Student,
    status: 'idle',
    error: null,
};

export const fetchStudents = createAsyncThunk<Student[]>(
    'students/fetchStudents',
    async () => {
        const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
        await delay(3000);
        const response = await axios.get(`${process.env.API_FAKE_SERVER}/students`);
        return response.data;
    }
);

const studentsSlice = createSlice({
    name: 'appState',
    initialState,
    reducers: {
        selectStudent(state, action: PayloadAction<Student>) {
            state.selectedStudent = action.payload;
        },
        resetSelectedStudent(state) {
            state.selectedStudent = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStudents.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchStudents.fulfilled, (state, action: PayloadAction<Student[]>) => {
                state.status = 'succeeded';
                state.students = action.payload;
            })
            .addCase(fetchStudents.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Failed to load students';
            });
    },
});

export const { selectStudent, resetSelectedStudent } = studentsSlice.actions;
export default studentsSlice.reducer;
