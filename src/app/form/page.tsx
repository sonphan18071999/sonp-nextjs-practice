"use client";
import SampleForm from "@/components/form";
import {RoleProvider} from "@/contexts/RoleContext";

const Page = () => {
    return (<>
        <RoleProvider>
            <SampleForm/>
        </RoleProvider>
    </>)
}
export default Page;
