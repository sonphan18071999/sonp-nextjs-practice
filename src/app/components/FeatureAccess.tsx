"use client"
import React, { ReactNode } from "react";
import {Features} from "@/app/models/permission";
import {useRole} from "@/app/contexts/RoleContext";
import {hasAccessToFeature} from "@/app/ultilies/permissionUtils";


interface FeatureAccessProps {
    feature: Features;
    children: ReactNode;
}

const FeatureAccess: React.FC<FeatureAccessProps> = ({ feature, children }) => {
    const { role } = useRole();
    if (!hasAccessToFeature(role, feature)) {
        return null; //
    }

    return <>{children}</>;
};

export default FeatureAccess;
