import { MainLayoutComponent } from "@components/layout/mainLayout/mainLayoutComponent";
import React from "react";
import ResidentialSchema from "./residentialSchema";

export const ResidentialContainer = () => {
    return <ResidentialSchema />;
};

ResidentialContainer.Layout = MainLayoutComponent;
export default ResidentialContainer;

ResidentialContainer.MetaData = {
    title: "Residential",
    description: "Residential",
};
