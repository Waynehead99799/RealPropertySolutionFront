import { DashboardResponseSuccess } from "@redux/slices/dashboard/index";
import { fetch } from "src/libs/helpers";

export const getDashboardListAPI = (): Promise<DashboardResponseSuccess> => {
    return fetch({
        url: "/properties/",
        method: "GET",
    });
};
