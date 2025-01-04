import {Features, RoleFeatures, Roles} from "@/app/models/permission";

export const hasAccessToFeature = (role: Roles, feature: Features): boolean => {
    return RoleFeatures[role]?.includes(feature) ?? false;
};

export const hasReadOnlyRight = (role: Roles): boolean => {
    return !RoleFeatures[role].includes(Features.CREATE_FORM) || !RoleFeatures[role].includes(Features.UPDATE_FORM) ||!RoleFeatures[role].includes(Features.DELETE_FORM);
}


export const hasDownloadRight = (role: Roles): boolean => {
    return RoleFeatures[role].includes(Features.DOWNLOAD);
}
