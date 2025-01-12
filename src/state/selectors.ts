import {RootState, store} from "@/state/store";

export const selectAllItems = (state:RootState) => state.students.students;

// Selector to get the selected item
export const selectSelectedItem = (state:RootState) => state.students.selectedStudent;
