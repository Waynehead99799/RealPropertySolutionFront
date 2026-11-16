import Link from "next/link";
import { useRouter } from "next/router";
import Script from "next/script";
import React, { useEffect, useState } from "react";
import { SITE } from "src/config/site";
import {
    Consent,
    captureAttribution,
    getConsent,
    setConsent,
    trackingConfigured,
} from "src/lib/analytics";

/** Loads GTM / GA4 / Meta Pixel only after consent, and shows the cookie notice. */
export const Analytics = () => {
    const router = useRouter();
    const [consent, setConsentState] = useState<Consent>(null);
    const [ready, setReady] = useState(false);
    const configured = trackingConfigured();

    useEffect(() => {
        captureAttribution();
        setConsentState(getConsent());
        setReady(true);
        const onConsent = () => setConsentState(getConsent());
        window.addEventListener("rps-consent", onConsent);
        return () => window.removeEventListener("rps-consent", onConsent);
    }, []);

    useEffect(() => {
        if (consent !== "granted") return;
        const onRoute = (url: string) => {
            const { gtmId, metaPixelId } = SITE.tracking;
            if (gtmId) {
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({ event: "page_view", page_path: url });
            } else {
                window.gtag?.("event", "page_view", { page_path: url });
                if (metaPixelId) window.fbq?.("track", "PageView");
            }
        };
        router.events.on("routeChangeComplete", onRoute);
        return () => router.events.off("routeChangeComplete", onRoute);
    }, [consent, router.events]);

    if (!configured || !ready) return null;
    const { gtmId, ga4Id, metaPixelId } = SITE.tracking;

    return (
        <>
            {consent === "granted" && (
                <>
                    {gtmId ? (
                        <Script id="gtm" strategy="afterInteractive">
                            {`window.dataLayer=window.dataLayer||[];window.dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});(function(w,d,s,l,i){var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
                        </Script>
                    ) : (
                        <>
                            {ga4Id && (
                                <>
                                    <Script
                                        src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
                                        strategy="afterInteractive"
                                    />
                                    <Script
                                        id="ga4"
                                        strategy="afterInteractive"
                                    >
                                        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${ga4Id}');`}
                                    </Script>
                                </>
                            )}
                            {metaPixelId && (
                                <Script
                                    id="meta-pixel"
                                    strategy="afterInteractive"
                                >
                                    {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src='https://connect.facebook.net/en_US/fbevents.js';s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script');fbq('init','${metaPixelId}');fbq('track','PageView');`}
                                </Script>
                            )}
                        </>
                    )}
                </>
            )}

            {consent === null && (
                <div
                    role="dialog"
                    aria-label="Cookie preferences"
                    className="pop-in fixed bottom-[88px] left-3 right-3 z-[45] border-2 border-ink bg-white p-5 shadow-lift sm:left-auto sm:max-w-[440px] lg:bottom-6 lg:left-6 lg:right-auto"
                >
                    <p className="text-[15px] leading-relaxed text-slate-600">
                        We use cookies to measure visits and improve our ads.
                        Accept to allow analytics and marketing cookies, or
                        decline to keep them off.{" "}
                        <Link href="/privacy-policy">
                            <a className="link-quiet text-ink">
                                Privacy policy
                            </a>
                        </Link>
                    </p>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            className="btn btn-outline btn-sm"
                            onClick={() => setConsent("denied")}
                        >
                            Decline
                        </button>
                        <button
                            type="button"
                            className="btn btn-dark btn-sm"
                            onClick={() => setConsent("granted")}
                        >
                            Accept
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};
