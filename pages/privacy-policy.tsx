import type { NextPage } from "next";
import React from "react";
import { SITE } from "src/config/site";
import { LegalPage } from "@components/layout/LegalPage";

const Privacy: NextPage = () => (
    <LegalPage
        title="Privacy policy"
        seoTitle="Privacy Policy | Real Property Solution"
        description="How Real Property Solution, Ahmedabad collects, uses and protects your personal information."
        path="/privacy-policy"
        updated="November 2026"
    >
        <p>
            Real Property Solution is committed to protecting the privacy and
            security of your personal information. This privacy policy outlines
            how we collect, use, and safeguard your information when you use our
            services.
        </p>

        <h2>1. Information we collect</h2>
        <p>
            We may collect personal information such as your name, email
            address, phone number, and other contact details when you interact
            with our website or utilize our services. Additionally, we may
            collect information related to your property preferences, inquiries,
            and transactions. When you submit an enquiry form we also record the
            page you submitted it from and, if you arrived through an
            advertisement, the campaign details in the link, so we can
            understand which of our efforts reach you.
        </p>

        <h2>2. Use of information</h2>
        <p>
            We use the information collected to provide and improve our
            services, communicate with you regarding your inquiries and
            transactions, customize your experience, and comply with legal
            obligations. We contact you by phone, WhatsApp or email about your
            enquiry only.
        </p>

        <h2>3. Data security</h2>
        <p>
            We implement appropriate security measures to protect your personal
            information from unauthorized access, alteration, disclosure, or
            destruction. However, no method of transmission over the internet or
            electronic storage is 100% secure, and we cannot guarantee absolute
            security.
        </p>

        <h2>4. Data sharing</h2>
        <p>
            We may share your personal information with third-party service
            providers, such as real estate agents, lenders, legal professionals,
            and advertising partners, as necessary to facilitate your
            transactions or provide requested services. We do not sell or rent
            your personal information to third parties for their marketing
            purposes.
        </p>

        <h2>5. Cookies and tracking technologies</h2>
        <p>
            Our website may use cookies and similar technologies to analyse
            website traffic and measure advertising. Analytics and advertising
            cookies (such as Google Analytics and the Meta Pixel) are loaded
            only after you choose Accept on our cookie notice. If you choose
            Decline, they are not loaded. You can also control cookies through
            your browser settings, but disabling cookies may affect the
            functionality of our website.
        </p>

        <h2>6. Third-party links</h2>
        <p>
            Our website may contain links to third-party websites or services
            not operated or controlled by Real Property Solution, including
            Google Maps, WhatsApp, Instagram and Facebook. We are not
            responsible for the privacy practices or content of these
            third-party sites. We encourage you to review the privacy policies
            of any third-party sites you visit.
        </p>

        <h2>7. Children's privacy</h2>
        <p>
            Our services are not directed at individuals under the age of 18. We
            do not knowingly collect personal information from children. If you
            believe that we have inadvertently collected personal information
            from a child, please contact us immediately to request deletion.
        </p>

        <h2>8. Changes to this privacy policy</h2>
        <p>
            We reserve the right to update or modify this privacy policy at any
            time without prior notice. Changes will be effective immediately
            upon posting on our website. We encourage you to review this policy
            periodically for updates.
        </p>

        <h2>Contact us</h2>
        <p>
            If you have any questions or concerns regarding our privacy policy
            or the handling of your personal information, please contact us at{" "}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>
    </LegalPage>
);

export default Privacy;
