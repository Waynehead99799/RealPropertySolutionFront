import { MainLayoutComponent } from "@components/layout/mainLayout/mainLayoutComponent";
import React from "react";
import LandSchema from "./landSchema";

export const LandContainer = () => {
    const onSubmit = (values: any) => {
        console.log(values);
    };

    return <LandSchema onSubmit={onSubmit} />;
};

LandContainer.Layout = MainLayoutComponent;
export default LandContainer;

LandContainer.MetaData = {
    title: "Land",
    description: "Land",
};
