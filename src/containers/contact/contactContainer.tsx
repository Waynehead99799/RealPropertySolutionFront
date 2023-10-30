import React from "react";
import { MainLayoutComponent } from "@components/layout/mainLayout/mainLayoutComponent";
import ContactSchema from "./contactSchema";

const ContactContainer = () => {
    return <ContactSchema />;
};

ContactContainer.Layout = MainLayoutComponent;
export default ContactContainer;

ContactContainer.MetaData = {
    title: "Contact",
    description: "Contact",
};
