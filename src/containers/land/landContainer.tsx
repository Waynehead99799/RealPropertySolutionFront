import { MainLayoutComponent } from "@components/layout/mainLayout/mainLayoutComponent";
import React, { useEffect, useState } from "react";
import LandSchema from "./landSchema";
import { wrapper } from "@redux/store";
import { AppContextType } from "next/dist/shared/lib/utils";
import { getPropertySearch } from "@redux/services/dashboard.api";
import { useRouter } from "next/router";

interface LandContainerProps {
    propertyList: any;
}

export const LandContainer = (props: LandContainerProps) => {
    const [propertyListData, setPropertyListData] = useState(
        props.propertyList,
    );
    const [filter, setFilter] = useState({});
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState({
        isFilter: false,
        isLoadMore: false,
    });

    const router = useRouter();

    const onSubmit = async (values: any, type?: string) => {
        if (type === "loadMore") {
            setIsLoading({
                isFilter: false,
                isLoadMore: true,
            });
        } else {
            setIsLoading({
                isFilter: true,
                isLoadMore: false,
            });
        }
        const payload: any = {};
        if (values?.locations?.value) {
            payload.location = values?.locations?.value;
        }
        if (values?.range && values?.range[0]) {
            payload.minPrice = values?.range[0];
        }
        if (values?.range && values?.range[1]) {
            payload.maxPrice = values?.range[1];
        }
        if (values?.propertyName) {
            payload.title = values?.propertyName;
        }
        setFilter(values);
        try {
            const resData = await getPropertySearch({
                queryParams: {
                    propertyType: router?.query?.type,
                    page: page,
                    ...payload,
                },
            });
            if (resData && resData.statusCode === 200) {
                setPropertyListData(resData.result);
                setIsLoading({
                    isFilter: false,
                    isLoadMore: false,
                });
            }
        } catch (error) {
            setIsLoading({
                isFilter: false,
                isLoadMore: false,
            });
            console.log(error);
        }
    };

    useEffect(() => {
        if (page !== 1) {
            const type = "loadMore";
            onSubmit(filter, type);
        }
    }, [page]);

    return (
        <LandSchema
            onSubmit={onSubmit}
            propertyListData={propertyListData}
            setPage={setPage}
            isLoading={isLoading}
            title={router?.query?.type}
        />
    );
};

LandContainer.getInitialProps = wrapper.getInitialPageProps(
    () => async (ctx: AppContextType | any) => {
        let propertyList;
        const { res } = ctx;
        // Fill data of loginUser in redux from Serverside.
        if (ctx?.query?.type) {
            try {
                const resData = await getPropertySearch({
                    queryParams: { propertyType: ctx?.query?.type, page: 1 },
                });
                if (resData && resData.statusCode === 200) {
                    propertyList = resData.result;
                }
            } catch (e: any) {
                console.log(e);
            }
        }
        if (!propertyList) {
            if (res) {
                res.statusCode = 404;
            }
            return {
                statusCode: 404,
            };
        }
        return { propertyList };
    },
);

LandContainer.Layout = MainLayoutComponent;

LandContainer.MetaData = {
    title: "Property",
    description: "Property",
};

export default LandContainer;
