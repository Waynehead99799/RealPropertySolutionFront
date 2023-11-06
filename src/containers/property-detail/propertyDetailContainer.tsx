import React from "react";
import PropertyDetailSchema from "./propertyDetailSchema";
import { MainLayoutComponent } from "@components/layout/mainLayout/mainLayoutComponent";

export const PropertyDetailContainer = () => {
    return <PropertyDetailSchema />;
};

PropertyDetailContainer.Layout = MainLayoutComponent;
export default PropertyDetailContainer;

PropertyDetailContainer.MetaData = {
    title: "Property Detail",
    description: "Property Detail",
};
