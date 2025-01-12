import {RootState, store} from "@/state/store";

export const selectAllItems = (state:RootState) => state.data.students;

// Selector to get the selected item
export const selectSelectedItem = (state:RootState) => state.data.selectedStudent;
export const selectCourses = (state:RootState) => state.data.courses;
