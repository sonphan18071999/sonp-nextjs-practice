"use client";
import {Box, Button} from "@mui/material";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/state/store";
import LoadingSpinner from "@/components/LoadingSpinner";
import {fetchCourses, fetchStudents, selectStudent} from "@/state/appSlice";
import DataTable from "@/components/table-component";
import {Student} from "@/models/student";
import {selectCourses, selectSelectedItem} from "@/state/selectors";
import ReusableTable from "@/components/common/reusable-table-component";
import {Course} from "@/models/course";

const ReduxToolkitExamplePage = () => {
    const dispatch = useDispatch();
    const selectedItem = useSelector(selectSelectedItem);
    const courses:Course[] = useSelector(selectCourses);

    const {students, selectedStudent, status, error} = useSelector((state: RootState) => state.data);
    useEffect(() => {
        if (status === 'idle') dispatch(fetchStudents());
    }, [dispatch, status]);
    if (status === 'loading') return <LoadingSpinner/>;
    if (status === 'failed') return <p>Error: {error}</p>;

    const onStudentSelectChange = (student: Student): void => {
        dispatch(selectStudent(student));
        setTimeout(() => {
            console.log('Updated Selected Student:', selectedItem);
        }, 2000);
    };

    const retrieveCourses = async ():Promise<void>=>{
        dispatch(fetchCourses());
        console.log('courses',courses);
    }

    return <>
        <h4>Redux toolkit work</h4>
        <Box display={'flex'} columnGap={'1rem'}>
            <Box width={'100%'}>
                <Button variant={"outlined"}>Get list Student</Button>
                <DataTable rows={students} onSelect={onStudentSelectChange}/>
            </Box>
            <Box width={'100%'}>
                <Button variant={"outlined"} onClick={()=>retrieveCourses()}>Get list Course</Button>
                <ReusableTable columns={[{key: 'id',label:'ID'},{key:'title',label:'Title'},{key:'instructor',label:'Instructor'},{key:'duration',label:'Duration'},{key:'category',label:'Category'}]} data={courses}/>
            </Box>
        </Box>

    </>
}
export default ReduxToolkitExamplePage;
