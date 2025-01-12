import {Features} from "@/models/permission";
import FeatureAccess from "@/components/FeatureAccess";
import React from "react";

const FormMange = ()=>{
    return (
        <>
            <h4>
                Features
            </h4>
            <FeatureAccess feature={Features.CREATE_FORM}>
                <button>Table create</button>
            </FeatureAccess>
            <FeatureAccess feature={Features.UPDATE_FORM}>
                <button>Table update</button>
            </FeatureAccess>
        </>
    )
}

export  default FormMange;
