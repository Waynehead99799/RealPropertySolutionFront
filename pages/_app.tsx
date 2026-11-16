import "@styles/globals.css";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import { Layout, LayoutOptions } from "@components/layout/Layout";

type PageWithLayout = NextPage<any> & { layout?: LayoutOptions };

const MyApp = ({
    Component,
    pageProps,
}: AppProps & { Component: PageWithLayout }) => {
    // Static options on the page, plus per-request overrides from getStaticProps.
    const layout: LayoutOptions = {
        ...(Component.layout || {}),
        ...((pageProps as { layout?: LayoutOptions })?.layout || {}),
    };

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                {/* Zoom stays enabled: no maximum-scale, no user-scalable=no. */}
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta name="theme-color" content="#B4131E" />
                <meta
                    name="application-name"
                    content="Real Property Solution"
                />
                <meta
                    name="apple-mobile-web-app-title"
                    content="Real Property Solution"
                />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="format-detection" content="telephone=yes" />
                <link rel="manifest" href="/manifest.json" />
                <link rel="icon" href="/icons/favicon.ico" sizes="any" />
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
                    rel="apple-touch-icon"
                    href="/icons/apple-touch-icon.png"
                />
                <link
                    rel="preconnect"
                    href="https://res.cloudinary.com"
                    crossOrigin=""
                />
            </Head>
            <Layout {...layout}>
                <Component {...pageProps} />
            </Layout>
        </>
    );
};

export default MyApp;
