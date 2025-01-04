"use client";
import Image from "next/image";
import styles from "./page.module.css";
import React, {useEffect} from "react";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {Box, Button, MenuItem, TextField} from "@mui/material";

const WorkerComponent = () => {
    useEffect(() => {
        // Dynamically load the workers as a module
        const worker = new Worker(new URL("./workers/worker.ts", import.meta.url));

        // Listen for messages from the workers
        worker.onmessage = (event: MessageEvent): void => {
            console.log("Result from workers:", event.data);
        };

        worker.postMessage(42);

        // Cleanup the workers when the component is unmounted
        return (): void => {
            worker.terminate();
        };
    }, []);

    return <div>Check the console for worker results.</div>;
};

interface FormData {
    name: string;
    age: string;
    gender: string;
    bio: string;
}

const MaterialUIForm = () => {
    const { control, handleSubmit, formState: { errors },watch } = useForm<FormData>();
    const watchAllFields = watch(); // when pass nothing as argument, you are watching everything
    console.log(watchAllFields);
    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log("Form Data:", data);
    };

    console.log(watch("name"))

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 400, mx: 'auto', mt: 5 }}
        >
            {/* Text Field for Name */}
            <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Name"
                        variant="outlined"
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        fullWidth
                    />
                )}
            />

            {/* Text Field for Age */}
            <Controller
                name="age"
                control={control}
                defaultValue=""
                rules={{
                    required: "Age is required",
                    pattern: { value: /^[0-9]+$/, message: "Age must be a number" }
                }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Age"
                        variant="outlined"
                        error={!!errors.age}
                        helperText={errors.age?.message}
                        fullWidth
                    />
                )}
            />

            {/* Dropdown for Gender */}
            <Controller
                name="gender"
                control={control}
                defaultValue=""
                rules={{ required: "Gender is required" }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Gender"
                        select
                        variant="outlined"
                        error={!!errors.gender}
                        helperText={errors.gender?.message}
                        fullWidth
                    >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                    </TextField>
                )}
            />

            {/* Textarea for Bio */}
            <Controller
                name="bio"
                control={control}
                defaultValue=""
                rules={{ required: "Bio is required" }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Bio"
                        variant="outlined"
                        multiline
                        rows={4}
                        error={!!errors.bio}
                        helperText={errors.bio?.message}
                        fullWidth
                    />
                )}
            />

            {/* Submit Button */}
            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
        </Box>
    );
};


export default function Home() {

    return (
        <>
            {/*Files upload testing*/}
            {/*  <WorkerComponent/>*/}

            React Form Hook Testing
            <MaterialUIForm/>
        </>
    );
}
