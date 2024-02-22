// services/listings.api.ts
import { fetch } from "src/libs/helpers";

export const getListingsAPI = (): Promise<any[]> => {
    return fetch({
        url: "/api/properties/", // Adjust the endpoint according to your API
        method: "GET",
    });
};
