import { MainLayoutComponent } from "@components/layout/mainLayout/mainLayoutComponent";
import React, { useEffect } from "react";
import { HomeScene } from "./homeScene";
import { useDispatch, useSelector } from "react-redux";
import { DashboardListState, fetchDashboard } from "@redux/slices/dashboard";
import { RootState } from "@redux/reducers";

const HomeContainer = () => {
    const { data, isLoading }: DashboardListState = useSelector(
        (state: RootState) => state.dashboard,
    );

    const dispatch = useDispatch();

    useEffect(() => {
        // fetchDashboard()
        dispatch(fetchDashboard());

        // eslint-disable-next-line prettier/prettier, @typescript-eslint/no-empty-function
        return () => {};
    }, []);

    return <HomeScene propertyData={data} isLoading={isLoading} />;
};

HomeContainer.Layout = MainLayoutComponent;
export default HomeContainer;

HomeContainer.MetaData = {
    title: "Home",
    description: "Home",
};
