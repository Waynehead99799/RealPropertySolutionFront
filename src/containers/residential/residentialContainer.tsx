import { MainLayoutComponent } from "@components/layout/mainLayout/mainLayoutComponent";
import React from "react";
import ResidentialSchema from "./residentialSchema";

export const ResidentialContainer = () => {
    const onSubmit = (values: any) => {
        console.log(values);
    };

    return <ResidentialSchema onSubmit={onSubmit} />;
};

ResidentialContainer.Layout = MainLayoutComponent;
export default ResidentialContainer;

ResidentialContainer.MetaData = {
    title: "Residential",
    description: "Residential",
};
