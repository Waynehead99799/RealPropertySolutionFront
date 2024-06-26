import "antd/dist/antd.less";
import "@styles/global.scss";
import App, { AppProps } from "next/app";
import Head from "next/head";
import { Router } from "next/router";
import { useState } from "react";
import { Provider, useStore } from "react-redux";
import { LayoutContextProvider } from "src/contexts/layoutContext";
import ErrorComponent from "src/containers/error/errorComponent";
import { wrapper } from "@redux/store";
import { AppContextType } from "next/dist/shared/lib/utils";
import { DefaultSkeleton } from "@components/theme";

const Noop = ({ children }: { children: JSX.Element }) => children;

const MyApp = ({
    Component, // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Component: { Layout = Noop, ...restLayoutProps },
    pageProps,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any, prettier/prettier
AppProps | any): JSX.Element => {
    const { statusCode = 200 } = pageProps || {};
    const [isLoading, setIsLoading] = useState(false);
    const store = useStore();

    Router.events.on("routeChangeStart", (/*url*/) => {
        setIsLoading(true);
    });
    Router.events.on("routeChangeComplete", () => {
        setIsLoading(false);
    });
    Router.events.on("routeChangeError", () => {
        setIsLoading(false);
    });
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
                />
                <title>
                    {restLayoutProps?.MetaData?.title
                        ? `${restLayoutProps?.MetaData?.title}`
                        : "Real Property Solution"}
                </title>
                <meta name="description" content="Real Property Solutions" />
                <meta name="keywords" content="Real Property Solutions" />
                <meta name="theme-color" content="#ffffff" />
                <meta name="msapplication-TileColor" content="#ffffff" />
                <meta
                    name="apple-mobile-web-app-status-bar-style"
                    content="default"
                />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta
                    name="application-name"
                    content="Real Property Solutions"
                />
                <meta
                    name="apple-mobile-web-app-title"
                    content="Real Property Solutions"
                />
                <link rel="manifest" href="/manifest.json" />
                <link
                    rel="apple-touch-icon"
                    href="/icons/apple-touch-icon.png"
                />
                <link href="/icons/favicon.ico" rel="icon" />
                <link rel="shortcut icon" href="/icons/favicon.ico" />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/icons/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/icons/favicon-16x16.png"
                />
                <link
                    rel="mask-icon"
                    href="/icons/apple-touch-icon.png"
                    color="#fff"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/icons/apple-touch-icon.png"
                />

                <link
                    href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
                    rel="stylesheet"
                />
                {process.env.NEXT_ENV !== "production" && (
                    <meta name="robots" content="noindex,nofollow" />
                )}
                <style>
                    {typeof window === "undefined" &&
                        `
                        svg {
                            width: 32px;
                            height: 32px;
                        }
                    `}
                </style>
            </Head>
            <Provider store={store}>
                <LayoutContextProvider>
                    {statusCode === 200 && (
                        <>
                            <Layout {...restLayoutProps}>
                                {isLoading && (
                                    <>
                                        <div className="h-96">
                                            <DefaultSkeleton isContent={true} />
                                        </div>
                                    </>
                                )}
                                {!isLoading && <Component {...pageProps} />}
                            </Layout>
                        </>
                    )}
                    {!isLoading && statusCode !== 200 && (
                        <ErrorComponent {...pageProps} />
                    )}
                </LayoutContextProvider>
            </Provider>
        </>
    );
};

MyApp.getInitialProps = wrapper.getInitialPageProps(
    () => async (appContext: AppContextType | any) => {
        const ctx = appContext.ctx;
        let appProps: any = {};

        if (ctx.req) {
            // This Line will trigger component level getInitialProps
            appProps = await App.getInitialProps(appContext);
        } else {
            appProps = await App.getInitialProps(appContext);
        }

        return { ...appProps };
    },
);

export default wrapper.withRedux(MyApp);
