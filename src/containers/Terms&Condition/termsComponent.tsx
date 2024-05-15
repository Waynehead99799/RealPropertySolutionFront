import Head from "next/head";
import React from "react";
import termsStyle from "./termsStyle.module.scss";

const TermsAndCondition = () => {
    return (
        <>
            <Head>
                <title>Terms & Conditions | Real Property Solutions</title>
            </Head>
            <div className={termsStyle.container}>
                <h2 className={termsStyle.title}>
                    Terms & Conditions | Real Property Solutions
                </h2>
                <div className={termsStyle.content}>
                    Welcome to RealProperty Solution! These terms and conditions
                    outline the rules and regulations for the use of our
                    services. By accessing our services, we assume you accept
                    these terms and conditions. Do not continue to use
                    RealProperty Solution's services if you do not agree to all
                    of the terms and conditions stated on this page.
                    <h2 className={termsStyle.sectionTitle}>1. Services</h2>
                    Our agency provides real estate services including but not
                    limited to property buying, selling, renting, and property
                    management. We aim to deliver the highest standards of
                    professionalism, integrity, and customer satisfaction in all
                    our transactions.
                    <h2 className={termsStyle.sectionTitle}>
                        2. Client Responsibilities
                    </h2>
                    Clients utilizing our services are responsible for providing
                    accurate and up-to-date information regarding their real
                    estate needs. They must also comply with all applicable laws
                    and regulations related to property transactions.
                    <h2 className={termsStyle.sectionTitle}>
                        3. Property Listings
                    </h2>
                    While we strive to ensure the accuracy of property listings
                    and information provided on our platform, we cannot
                    guarantee the accuracy, completeness, or reliability of any
                    information posted. Clients are encouraged to verify the
                    details of properties independently.
                    <h2 className={termsStyle.sectionTitle}>
                        4. Fees and Payments
                    </h2>
                    Our agency may charge fees for certain services rendered,
                    such as brokerage fees, advertising fees, or property
                    management fees. Clients will be informed of any applicable
                    fees upfront, and payment terms will be clearly
                    communicated.
                    <h2 className={termsStyle.sectionTitle}>
                        5. Confidentiality
                    </h2>
                    RealProperty Solution values the confidentiality of client
                    information and will not disclose personal or sensitive
                    information without prior consent, except as required by
                    law.
                    <h2 className={termsStyle.sectionTitle}>
                        6. Limitation of Liability
                    </h2>
                    In no event shall RealProperty Solution be liable for any
                    indirect, incidental, special, consequential, or punitive
                    damages, including but not limited to lost profits or
                    revenue, arising out of or related to the use of our
                    services.
                    <h2 className={termsStyle.sectionTitle}>
                        7. Modification of Terms
                    </h2>
                    We reserve the right to modify these terms and conditions at
                    any time without prior notice. Changes will be effective
                    immediately upon posting on our website. Clients are
                    encouraged to review these terms regularly for updates.
                    <h2 className={termsStyle.sectionTitle}>
                        8. Governing Law
                    </h2>
                    These terms and conditions are governed by and construed in
                    accordance with the laws of Republic of India. Any disputes
                    arising from these terms shall be subject to the exclusive
                    jurisdiction of the courts in Republic of India. Contact Us
                    If you have any questions or concerns regarding these terms
                    and conditions, please contact us at
                    realpropertysolution31@gmail.com.
                </div>
            </div>
        </>
    );
};

export default TermsAndCondition;
