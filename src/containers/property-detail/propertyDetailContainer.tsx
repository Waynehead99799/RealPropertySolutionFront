import React from "react";
import PropertyDetailSchema from "./propertyDetailSchema";
import { MainLayoutComponent } from "@components/layout/mainLayout/mainLayoutComponent";
import { getPropertyDetails } from "@redux/services/dashboard.api";

export const PropertyDetailContainer = ({ propertyData }: any) => {
    return propertyData && <PropertyDetailSchema propertyData={propertyData} />;
};

PropertyDetailContainer.getInitialProps = async (ctx: any) => {
    let propertyData;
    const { res } = ctx;
    try {
        if (ctx?.query?.id) {
            const resData = await getPropertyDetails({
                id: ctx?.query?.id,
            });
            if (resData && resData.statusCode === 200) {
                propertyData = resData.result;
            }
        }
    } catch (e) {
        console.log(e);
    }

    if (!propertyData) {
        if (res) {
            res.statusCode = 404;
        }
        return {
            statusCode: 404,
        };
    }

    return { propertyData };
};

PropertyDetailContainer.MetaData = {
    title: "Property Detail",
    description: "Property Detail",
};

PropertyDetailContainer.Layout = MainLayoutComponent;

export default PropertyDetailContainer;
