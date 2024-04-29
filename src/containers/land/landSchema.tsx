import { DoubleRightOutlined, LoadingOutlined } from "@ant-design/icons";
import { BannerSection } from "@components/common/bannerSection";
import { FilterForm } from "@components/common/filterForm";
import { PropertyBox } from "@components/property/propertyBox";
import React from "react";

interface PropertyProps {
    onSubmit: (d: any) => void;
    setPage: (d: any) => void;
    propertyListData: any;
    isLoading: any;
    title: string | any;
}

const LandSchema = (props: PropertyProps) => {
    const { onSubmit, propertyListData, setPage, isLoading, title } = props;
    return (
        <>
            <BannerSection title={title ?? "Property"} />
            <FilterForm onSubmit={onSubmit} isLoading={isLoading} />
            <section className="container mx-auto px-6 lg:px-10 2xl:px-32 mt-5 mb-20">
                <div className="grid gap-x-6 lg:grid-cols-3">
                    <PropertyBox data={propertyListData.properties} />
                </div>
                {propertyListData?.properties?.length === 0 && (
                    <div className="w-full py-5 text-center text-primary">
                        No property found...
                    </div>
                )}
                {propertyListData.totalPages !== propertyListData.currentPage &&
                    propertyListData?.properties?.length !== 0 && (
                        <button
                            type="button"
                            className="btn btn-primary flex items-center justify-center mx-auto w-40"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                            onClick={() => setPage((p: number) => p + 1)}
                        >
                            {isLoading.isLoadMore ? (
                                <LoadingOutlined
                                    onPointerEnterCapture={undefined}
                                    onPointerLeaveCapture={undefined}
                                />
                            ) : (
                                <>
                                    Load More
                                    <DoubleRightOutlined
                                        className="ml-2"
                                        onPointerEnterCapture={undefined}
                                        onPointerLeaveCapture={undefined}
                                    />
                                </>
                            )}
                        </button>
                    )}
            </section>
        </>
    );
};

export default LandSchema;
