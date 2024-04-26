import * as Yup from "yup";

export interface ContactFormInputs {
    name: string;
    email: string;
    phone: string;
    message: string;
}

export const ContactFormValidateSchema = Yup.object({
    name: Yup.string()
        .required("Name is a required field")
        .matches(/^\s*\S[\s\S]*$/, "name cannot contain only blankspaces"),
    email: Yup.string()
        .email("Email must be a valid email")
        .required("Email is a required field"),
    phone: Yup.string()
        .required("Phone number is a required field")
        .matches(/^[0-9]+$/, "Phone number must contain only numbers"),
    message: Yup.string()
        .required("Message is a required field")
        .matches(/^\s*\S[\s\S]*$/, "message cannot contain only blankspaces"),
}).required();
