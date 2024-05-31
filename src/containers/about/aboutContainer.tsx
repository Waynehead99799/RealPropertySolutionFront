import { MainLayoutComponent } from "@components/layout/mainLayout/mainLayoutComponent";
import React from "react";
import AboutSchema from "./aboutSchema";
import { getAgents } from "@redux/services/dashboard.api";

export const AboutContainer = ({ agentData }: any) => {
    return agentData && <AboutSchema agentData={agentData} />;
};

AboutContainer.getInitialProps = async (ctx: any) => {
    let agentData;
    // Fill data of loginUser in redux from Serverside.
    if (ctx) {
        try {
            const resData = await getAgents();
            if (resData && resData.statusCode === 200) {
                agentData = resData.result;
            }
        } catch (e: any) {
            console.log(e);
        }
    }
    return { agentData };
};

AboutContainer.Layout = MainLayoutComponent;

AboutContainer.MetaData = {
    title: "About",
    description: "About",
};

export default AboutContainer;
