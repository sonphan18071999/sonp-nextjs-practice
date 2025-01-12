"use client";
import {Button, Table} from "@mui/material";
import React, {useEffect} from "react";
import {Provider, useDispatch, useSelector} from "react-redux";
import {RootState, store} from "@/state/store";
import LoadingSpinner from "@/components/LoadingSpinner";
import {fetchStudents, selectStudent} from "@/state/studentsSlice";
import DataTable from "@/components/table-component";
import {Student} from "@/models/student";
import {selectSelectedItem} from "@/state/selectors";

const ReduxToolkitExamplePage = () => {
    const dispatch = useDispatch();
    const selectedItem = useSelector(selectSelectedItem);

    const {students, selectedStudent, status, error} = useSelector((state: RootState) => state.students);
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchStudents());
        }
    }, [dispatch, status]);
    if (status === 'loading') {
        return <LoadingSpinner/>;
    }
    if (status === 'failed') {
        return <p>Error: {error}</p>;
    }
    const onStudentSelectChange = (student: Student): void => {
        dispatch(selectStudent(student));

        setTimeout(() => {
            console.log('Updated Selected Student:', selectedItem);
        }, 2000);

    };

    return <>
        <h4>Redux toolkit work</h4>
        <Button variant={"outlined"}>Get list student</Button>
        <DataTable rows={students} onSelect={onStudentSelectChange}/>
    </>
}
export default ReduxToolkitExamplePage;
