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

export const getAgents = async (): Promise<any> => {
    return fetch({
        url: `/agent`,
        method: "GET",
    });
};

export const getPropertySearch = async ({ queryParams }: any): Promise<any> => {
    return fetch({
        url: `/properties/search`,
        method: "POST",
        params: queryParams,
    });
};
