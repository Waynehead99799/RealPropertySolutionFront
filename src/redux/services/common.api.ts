import { fetch } from "src/libs/helpers";

export const submitForm = (data: any): Promise<any> => {
    return fetch({
        url: `/general/sendmail`,
        method: "POST",
        data,
    });
};
