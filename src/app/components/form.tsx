"use client"
import {useRole} from "@/app/contexts/RoleContext";
import {Features, Roles} from "@/app/models/permission";
import React from "react";
import BasicClientForm from "@/app/components/basic-client-form";
import BasicSystemForm from "@/app/components/basic-system-form";

const SampleForm = () => {
    const {setRole} = useRole();

    return (
        <div>
            <h1>RBAC with TypeScript</h1>
            <div>
                <button onClick={() => setRole(Roles.CLIENT)}>Set Role: Client</button>
                <button onClick={() => setRole(Roles.PJM)}>Set Role: PJM</button>
                <button onClick={() => setRole(Roles.WORKER)}>Set Role: Worker</button>
                <button onClick={() => setRole(Roles.DIRECTOR)}>Set Role: Director</button>
            </div>

            {/*<h2>Features:</h2>*/}
            {/*<FeatureAccess feature={Features.CREATE_FORM}>*/}
            {/*    <button>Create form</button>*/}
            {/*</FeatureAccess>*/}
            {/*<FeatureAccess feature={Features.VIEW_FORM}>*/}
            {/*    <button>View form</button>*/}
            {/*</FeatureAccess>*/}
            {/*<FeatureAccess feature={Features.UPDATE_FORM}>*/}
            {/*    <button>Update form</button>*/}
            {/*</FeatureAccess>*/}
            {/*<FeatureAccess feature={Features.DELETE_FORM}>*/}
            {/*    <button>Delete form</button>*/}
            {/*</FeatureAccess>*/}
            <BasicClientForm/>
        </div>
    );
};
export default SampleForm;
