import { MainLayoutComponent } from "@components/layout/mainLayout/mainLayoutComponent";
import React from "react";
import LocationsSchema from "./locationsSchema";

export const LocationsContainer = () => {
    const onSubmit = (values: any) => {
        console.log(values);
    };

    return <LocationsSchema onSubmit={onSubmit} />;
};

LocationsContainer.Layout = MainLayoutComponent;
export default LocationsContainer;

LocationsContainer.MetaData = {
    title: "Locations",
    description: "Locations",
};
