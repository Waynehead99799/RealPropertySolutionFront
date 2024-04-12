import { DoubleRightOutlined } from "@ant-design/icons";
import { BannerSection } from "@components/common/bannerSection";
import { FilterForm } from "@components/common/filterForm";
import { PropertyBox } from "@components/property/propertyBox";
import React from "react";
import { PROPERTY_DATA } from "src/libs/constants";

const CommercialSchema = ({ onSubmit }: any) => {
    return (
        <>
            <BannerSection title="Commercial" />
            <FilterForm onSubmit={onSubmit} />
            <section className="container mx-auto px-6 lg:px-10 2xl:px-32 mt-5 mb-20">
                <div className="grid gap-x-6 lg:grid-cols-3">
                    <PropertyBox data={PROPERTY_DATA} />
                </div>
                <button
                    type="button"
                    className="btn btn-primary flex items-center justify-center mx-auto"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                >
                    View More{" "}
                    <DoubleRightOutlined
                        className="ml-2"
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                    />
                </button>
            </section>
        </>
    );
};

export default CommercialSchema;
