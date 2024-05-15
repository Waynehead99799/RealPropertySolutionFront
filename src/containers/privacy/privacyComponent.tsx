import Head from "next/head";
import React from "react";
import privacyStyle from "./privacyStyle.module.scss";

const PrivacyPolicy = () => {
    return (
        <>
            <Head>
                <title>Privacy Policy | Real Property Solutions</title>
            </Head>
            <div className={privacyStyle.container}>
                <h2 className={privacyStyle.title}>
                    Privacy Policy | Real Property Solutions
                </h2>
                <div className={privacyStyle.content}>
                    RealProperty Solution is committed to protecting the privacy
                    and security of your personal information. This privacy
                    policy outlines how we collect, use, and safeguard your
                    information when you use our services.
                    <h2 className={privacyStyle.sectionTitle}>
                        1. Information We Collect
                    </h2>
                    We may collect personal information such as your name, email
                    address, phone number, and other contact details when you
                    interact with our website or utilize our services.
                    Additionally, we may collect information related to your
                    property preferences, inquiries, and transactions.
                    <h2 className={privacyStyle.sectionTitle}>
                        2. Use of Information
                    </h2>
                    We use the information collected to provide and improve our
                    services, communicate with you regarding your inquiries and
                    transactions, customize your experience, and comply with
                    legal obligations.
                    <h2 className={privacyStyle.sectionTitle}>
                        3. Data Security
                    </h2>
                    We implement appropriate security measures to protect your
                    personal information from unauthorized access, alteration,
                    disclosure, or destruction. However, no method of
                    transmission over the internet or electronic storage is 100%
                    secure, and we cannot guarantee absolute security.
                    <h2 className={privacyStyle.sectionTitle}>
                        4. Data Sharing
                    </h2>
                    We may share your personal information with third-party
                    service providers, such as real estate agents, lenders,
                    legal professionals, and advertising partners, as necessary
                    to facilitate your transactions or provide requested
                    services. We do not sell or rent your personal information
                    to third parties for their marketing purposes.
                    <h2 className={privacyStyle.sectionTitle}>
                        5. Cookies and Tracking Technologies
                    </h2>
                    Our website may use cookies and similar tracking
                    technologies to enhance your browsing experience, analyze
                    website traffic, and personalize content. You can control
                    cookies through your browser settings, but disabling cookies
                    may affect the functionality of our website.
                    <h2 className={privacyStyle.sectionTitle}>
                        6. Third-Party Links
                    </h2>
                    Our website may contain links to third-party websites or
                    services not operated or controlled by RealProperty
                    Solution. We are not responsible for the privacy practices
                    or content of these third-party sites. We encourage you to
                    review the privacy policies of any third-party sites you
                    visit.
                    <h2 className={privacyStyle.sectionTitle}>
                        7. Children's Privacy
                    </h2>
                    Our services are not directed at individuals under the age
                    of 18. We do not knowingly collect personal information from
                    children. If you believe that we have inadvertently
                    collected personal information from a child, please contact
                    us immediately to request deletion.
                    <h2 className={privacyStyle.sectionTitle}>
                        8. Changes to Privacy Policy
                    </h2>
                    We reserve the right to update or modify this privacy policy
                    at any time without prior notice. Changes will be effective
                    immediately upon posting on our website. We encourage you to
                    review this policy periodically for updates. Contact Us If
                    you have any questions or concerns regarding our privacy
                    policy or the handling of your personal information, please
                    contact us at realpropertysolution31@gmail.com.
                </div>
            </div>
        </>
    );
};

export default PrivacyPolicy;
