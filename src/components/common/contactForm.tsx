import React from "react";
import {
    FormGroup,
    InputField,
    TextAreaField,
} from "@components/theme/form/formFieldsComponent";
import { Button } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";
import {
    ContactFormInputs,
    ContactFormValidateSchema,
} from "src/schemas/contactFormSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { submitForm } from "@redux/services/common.api";

export const ContactForm = () => {
    const { register, handleSubmit, formState, setFocus } =
        useForm<ContactFormInputs>({
            resolver: yupResolver(ContactFormValidateSchema),
        });

    const onSubmit = async (values: any) => {
        try {
            const res = await submitForm(values);
            console.log("res", res);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="text-left">
            <div className="flex flex-wrap">
                <FormGroup className="mb-4 flex-grow md:mr-2">
                    <InputField
                        {...{
                            register,
                            formState,
                            id: "name",
                            label: "Name",
                            placeholder: "Enter Name",
                        }}
                    />
                </FormGroup>
                <FormGroup className="mb-4 flex-grow md:ml-0 ml-2">
                    <InputField
                        {...{
                            register,
                            formState,
                            id: "phone",
                            maxLength: 10,
                            label: "Phone",
                            placeholder: "Enter Phone",
                        }}
                    />
                </FormGroup>
            </div>
            <FormGroup className="mb-4">
                <InputField
                    {...{
                        register,
                        formState,
                        id: "email",
                        label: "Email",
                        placeholder: "Enter Email",
                    }}
                />
            </FormGroup>
            <FormGroup className="mb-4">
                <TextAreaField
                    {...{
                        register,
                        formState,
                        id: "message",
                        label: "Message",
                        placeholder: "Enter Message",
                    }}
                />
            </FormGroup>
            <div className="text-center">
                <Button
                    type="primary"
                    htmlType="submit"
                    className="btn-primary justify-center items-center h-auto py-2.5 px-7 flex mx-auto"
                    loading={formState?.isSubmitting}
                    disabled={formState?.isSubmitting}
                >
                    Send
                    <SendOutlined
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                    />
                </Button>
            </div>
        </form>
    );
};
