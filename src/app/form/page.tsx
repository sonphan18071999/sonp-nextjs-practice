"use client";
import SampleForm from "@/app/components/form";
import {RoleProvider} from "@/app/contexts/RoleContext";
import FormMange from "@/app/components/form-mange";

const Page = () => {
    return (<>
        <RoleProvider>
            <SampleForm/>
        </RoleProvider>
    </>)
}
export default Page;
