import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {Student} from "@/models/student";
import {Course} from "@/models/course";


interface AppState {
    students: Student[];
    selectedStudent: Student | null;
    courses: Course[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: AppState = {
    students: [],
    courses: [],
    selectedStudent: {} as Student,
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

export const fetchCourses = createAsyncThunk<Course>(
    'abc',
    async () => {
        const response = await axios.get(`${process.env.API_FAKE_SERVER}/courses`);
        return response.data;
    }
)

const appSlice = createSlice({
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
            })
            .addCase(fetchCourses.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchCourses.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Failed to load students';
            })
            .addCase(fetchCourses.fulfilled, (state, action: PayloadAction<Course[]>) => {
                state.status = 'succeeded';
                state.courses = action.payload;
            })
    },
});

export const {selectStudent, resetSelectedStudent} = appSlice.actions;
export default appSlice.reducer;
