export enum Roles {
    CLIENT = "Client",
    PJM = "Pjm",
    WORKER = "Worker",
    DIRECTOR = "Director",
}

export enum Features {
    CREATE_FORM = "Create form",
    UPDATE_FORM = "Update form",
    DELETE_FORM = "Delete form",
    VIEW_FORM = "View form",
    DOWNLOAD = "Download"
}

export const RoleFeatures: Record<Roles, Features[]> = {
    [Roles.CLIENT]: [Features.CREATE_FORM, Features.UPDATE_FORM, Features.DELETE_FORM, Features.VIEW_FORM],
    [Roles.PJM]: [Features.VIEW_FORM, Features.DOWNLOAD],
    [Roles.WORKER]: [Features.VIEW_FORM, Features.DOWNLOAD],
    [Roles.DIRECTOR]: [Features.DELETE_FORM, Features.VIEW_FORM, Features.DOWNLOAD],
};
