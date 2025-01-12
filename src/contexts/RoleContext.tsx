"use client"
import {Roles} from "@/models/permission";
import {createContext, ReactNode, useContext, useState} from "react";

interface RoleContextProps {
    role: Roles;
    setRole: (role: Roles) => void;
}

const RoleContext = createContext<RoleContextProps | undefined>(undefined);

export const RoleProvider: React.FC<{ children: ReactNode }> = ({ children }: { children:ReactNode }) => {
    const [role, setRole] = useState<Roles>(Roles.CLIENT);

    return (
        <RoleContext.Provider value={{ role, setRole }}>
            {children}
        </RoleContext.Provider>
    );
};

export const useRole = (): RoleContextProps => {
    const context = useContext(RoleContext);
    if (!context) {
        throw new Error("useRole must be used within a RoleProvider");
    }
    return context;
};
