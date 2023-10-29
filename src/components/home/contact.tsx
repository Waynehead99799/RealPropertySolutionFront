import React from "react";
import { useForm } from "react-hook-form";
import {
    HomeFormInputs,
    HomeFormValidateSchema,
} from "src/schemas/homeFormSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    FormGroup,
    InputField,
    TextAreaField,
} from "@components/theme/form/formFieldsComponent";
import { Button } from "antd";

export const ContactSection = () => {
    const { register, handleSubmit, formState, setFocus } =
        useForm<HomeFormInputs>({
            resolver: yupResolver(HomeFormValidateSchema),
        });

    const onSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <section className="container mx-auto px-6 lg:px-10 2xl:px-32 mt-20">
            <div className="flex flex-wrap">
                <div className="mb-12 w-full shrink-0 grow-0 basis-auto lg:mb-0 lg:w-5/12">
                    <div className="flex lg:py-16">
                        <img
                            src="/images/contact.jpg"
                            className="w-full rounded-lg shadow-lg dark:shadow-black/20 lg:ml-[50px] z-[1]"
                            alt="image"
                        />
                    </div>
                </div>
                <div className="w-full shrink-0 grow-0 basis-auto lg:w-7/12">
                    <div className="flex h-full items-center rounded-3xl border border-white-100/5 bg-white-200 p-6 text-center lg:pl-12 lg:text-left">
                        <div className="lg:pl-12">
                            <h2 className="text-4xl tracking-tight font-extrabold mb-4 text-gray-900">
                                What are you waiting for?
                            </h2>
                            <p className="mb-6 pb-2 lg:pb-0">
                                Lorem ipsum dolor, sit amet consectetur
                                adipisicing elit. Maxime, sint, repellat vel quo
                                quisquam accusamus in qui at ipsa enim quibusdam
                                illo laboriosam omnis. Labore itaque illum
                                distinctio eum neque!
                            </p>
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="text-left"
                            >
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
                                    <FormGroup className="mb-4 flex-grow md:ml-2">
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
                                            id: "msg",
                                            label: "Message",
                                            placeholder: "Enter Message",
                                        }}
                                    />
                                </FormGroup>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="btn-primary justify-center mx-auto"
                                    loading={formState?.isSubmitting}
                                    disabled={formState?.isSubmitting}
                                >
                                    Sign In{" "}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
