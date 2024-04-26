import { DashboardResponseSuccess } from "@redux/slices/dashboard/index";
import { fetch } from "src/libs/helpers";

export const getDashboardListAPI = (): Promise<DashboardResponseSuccess> => {
    return fetch({
        url: "/properties/",
        method: "GET",
    });
};

export const getPropertyDetails = async ({ id }: any): Promise<any> => {
    return fetch({
        url: `/properties/${id}`,
        method: "GET",
    });
};
