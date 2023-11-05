import { FilterOutlined } from "@ant-design/icons";
import {
    FormGroup,
    InputField,
    SelectField,
} from "@components/theme/form/formFieldsComponent";
import { Button } from "antd";
import React from "react";
import { useForm } from "react-hook-form";
import { LOCATIONS } from "src/libs/constants";

export const FilterForm = ({ onSubmit }: any) => {
    const { register, handleSubmit, formState, control } = useForm<any>({});

    return (
        <section className="container mx-auto px-6 lg:px-10 2xl:px-32 mt-5 md:mb-20 mb-10">
            <div className="block rounded-lg bg-[hsla(0,0%,100%,0.7)] px-6 py-5 md:pt-8 md:pb-5 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] md:px-12 md:-mt-[100px] -mt-[80px] backdrop-blur-[30px]">
                <form onSubmit={handleSubmit(onSubmit)} className="text-left">
                    <div className="flex flex-wrap">
                        <FormGroup className="mb-4 flex-grow md:mr-2">
                            <InputField
                                {...{
                                    register,
                                    formState,
                                    id: "propertyName",
                                    className: "h-[38px]",
                                    placeholder: "Search Property Name",
                                }}
                            />
                        </FormGroup>
                        <FormGroup className="mb-4 flex-grow md:mr-2">
                            <SelectField
                                {...{
                                    register,
                                    formState,
                                    control,
                                    id: "locations",
                                    name: "locations",
                                    options: LOCATIONS,
                                    placeholder: "Select Locations",
                                }}
                            />
                        </FormGroup>
                        <FormGroup className="mb-4 flex-grow md:mr-2">
                            <InputField
                                {...{
                                    register,
                                    formState,
                                    type: "number",
                                    className: "h-[38px]",
                                    id: "price",
                                    placeholder: "Property Price",
                                }}
                            />
                        </FormGroup>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="btn-primary h-[38px] mx-auto md:mx-0"
                            loading={false}
                            disabled={formState?.isSubmitting}
                        >
                            <FilterOutlined />
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    );
};
