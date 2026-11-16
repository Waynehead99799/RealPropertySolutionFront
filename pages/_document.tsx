import Document, { Head, Html, Main, NextScript } from "next/document";

class CustomDocument extends Document {
    render() {
        return (
            <Html lang="en-IN">
                <Head>
                    <link
                        rel="preload"
                        href="/fonts/big-shoulders-display-latin-800-normal.woff2"
                        as="font"
                        type="font/woff2"
                        crossOrigin=""
                    />
                    <link
                        rel="preload"
                        href="/fonts/hind-latin-400-normal.woff2"
                        as="font"
                        type="font/woff2"
                        crossOrigin=""
                    />
                    {/* Enables the in-view reveal styles only when JS is running. */}
                    <script
                        dangerouslySetInnerHTML={{
                            __html: "document.documentElement.className+=' js'",
                        }}
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default CustomDocument;
