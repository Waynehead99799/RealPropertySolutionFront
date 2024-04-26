import React from "react";
import PropertyDetailSchema from "./propertyDetailSchema";
import { MainLayoutComponent } from "@components/layout/mainLayout/mainLayoutComponent";
import { wrapper } from "@redux/store";
import { getPropertyDetails } from "@redux/services/dashboard.api";

export const PropertyDetailContainer = ({ propertyData }: any) => {
    return propertyData ? (
        <PropertyDetailSchema propertyData={propertyData} />
    ) : null;
};

PropertyDetailContainer.Layout = MainLayoutComponent;

PropertyDetailContainer.MetaData = {
    title: "Property Detail",
    description: "Property Detail",
};

PropertyDetailContainer.getInitialProps = wrapper.getInitialPageProps(
    () => async (ctx: any) => {
        let propertyData = {};
        try {
            if (ctx?.query?.id) {
                const res = await getPropertyDetails({
                    id: ctx?.query?.id,
                });
                if (res && res.statusCode === 200) {
                    propertyData = res.result;
                }
            }
        } catch (e) {
            console.log(e);
        }
        return { propertyData };
    },
);

export default PropertyDetailContainer;
