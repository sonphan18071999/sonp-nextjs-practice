"use client"
import React, { ReactNode } from "react";
import {Features} from "@/models/permission";
import {useRole} from "@/contexts/RoleContext";
import {hasAccessToFeature} from "@/ultilies/permissionUtils";


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
