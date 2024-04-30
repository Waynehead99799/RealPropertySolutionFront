import { FilterOutlined, LoadingOutlined } from "@ant-design/icons";
import {
    FormGroup,
    InputField,
    SelectField,
} from "@components/theme/form/formFieldsComponent";
import { Button, Slider } from "antd";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
    DEFAULT_MAX_VALUE,
    DEFAULT_MIN_VALUE,
    LOCATIONS,
    MARKS,
    MAX_VALUE,
    MIN_VALUE,
} from "src/libs/constants";

export const FilterForm = ({ onSubmit, isLoading }: any) => {
    const { register, handleSubmit, formState, control } = useForm<any>({});

    return (
        <section className="container mx-auto px-6 lg:px-10 2xl:px-32 mt-5 md:mb-20 mb-10">
            <div className="block rounded-lg bg-[hsla(0,0%,100%,0.7)] px-4 py-5 md:pt-8 md:pb-5 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] md:px-12 md:-mt-[100px] -mt-[80px] backdrop-blur-[30px]">
                <form onSubmit={handleSubmit(onSubmit)} className="text-left">
                    <div className="flex flex-wrap">
                        <FormGroup className="mb-4 md:mb-0 flex-grow md:mr-2 md:w-1/4 w-full">
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
                        <FormGroup className="mb-4 md:mb-0 flex-grow md:mr-2 md:w-1/4 w-full">
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
                        <FormGroup className="mb-0 flex-grow md:mr-2 md:w-2/5">
                            <Controller
                                name="range"
                                control={control}
                                defaultValue={[
                                    DEFAULT_MIN_VALUE,
                                    DEFAULT_MAX_VALUE,
                                ]} // Initial range values
                                render={({ field }) => (
                                    <Slider
                                        range
                                        min={MIN_VALUE}
                                        max={MAX_VALUE}
                                        value={field.value}
                                        onChange={(value) =>
                                            field.onChange(value)
                                        }
                                        {...{
                                            railStyle: {
                                                backgroundColor: "lightblue",
                                            },
                                        }}
                                        marks={MARKS}
                                    />
                                )}
                            />
                        </FormGroup>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="btn-primary h-[38px] mx-auto md:mx-0"
                            loading={false}
                            disabled={formState?.isSubmitting}
                        >
                            {isLoading.isFilter ? (
                                <LoadingOutlined
                                    onPointerEnterCapture={undefined}
                                    onPointerLeaveCapture={undefined}
                                />
                            ) : (
                                <FilterOutlined
                                    onPointerEnterCapture={undefined}
                                    onPointerLeaveCapture={undefined}
                                />
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    );
};
