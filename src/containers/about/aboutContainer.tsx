import { MainLayoutComponent } from "@components/layout/mainLayout/mainLayoutComponent";
import React from "react";
import AboutSchema from "./aboutSchema";

const AboutContainer = () => {
    return <AboutSchema />;
};

AboutContainer.Layout = MainLayoutComponent;
export default AboutContainer;

AboutContainer.MetaData = {
    title: "About",
    description: "About",
};
