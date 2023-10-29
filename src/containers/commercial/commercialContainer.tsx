import { MainLayoutComponent } from "@components/layout/mainLayout/mainLayoutComponent";
import React from "react";
import CommercialSchema from "./commercialSchema";

export const CommercialContainer = () => {
    return <CommercialSchema />;
};

CommercialContainer.Layout = MainLayoutComponent;
export default CommercialContainer;

CommercialContainer.MetaData = {
    title: "Commercial",
    description: "Commercial",
};
