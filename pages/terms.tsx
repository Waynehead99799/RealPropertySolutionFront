import type { NextPage } from "next";
import React from "react";
import { SITE } from "src/config/site";
import { LegalPage } from "@components/layout/LegalPage";

const Terms: NextPage = () => (
    <LegalPage
        title="Terms and conditions"
        seoTitle="Terms and Conditions | Real Property Solution"
        description="The terms that apply when you use the services and website of Real Property Solution, Ahmedabad."
        path="/terms"
        updated="November 2026"
    >
        <p>
            Welcome to Real Property Solution. These terms and conditions
            outline the rules and regulations for the use of our services. By
            accessing our services, we assume you accept these terms and
            conditions. Do not continue to use Real Property Solution's services
            if you do not agree to all of the terms and conditions stated on
            this page.
        </p>

        <h2>1. Services</h2>
        <p>
            Our agency provides real estate services including but not limited
            to property buying, selling, renting, and property management. We
            aim to deliver the highest standards of professionalism, integrity,
            and customer satisfaction in all our transactions.
        </p>

        <h2>2. Client responsibilities</h2>
        <p>
            Clients utilizing our services are responsible for providing
            accurate and up-to-date information regarding their real estate
            needs. They must also comply with all applicable laws and
            regulations related to property transactions.
        </p>

        <h2>3. Property listings</h2>
        <p>
            While we strive to ensure the accuracy of property listings and
            information provided on our platform, we cannot guarantee the
            accuracy, completeness, or reliability of any information posted.
            Prices shown are asking prices at the time of listing and may
            change. Clients are encouraged to verify the details of properties
            independently.
        </p>

        <h2>4. Fees and payments</h2>
        <p>
            Our agency may charge fees for certain services rendered, such as
            brokerage fees, advertising fees, or property management fees.
            Clients will be informed of any applicable fees upfront, and payment
            terms will be clearly communicated.
        </p>

        <h2>5. Confidentiality</h2>
        <p>
            Real Property Solution values the confidentiality of client
            information and will not disclose personal or sensitive information
            without prior consent, except as required by law.
        </p>

        <h2>6. Limitation of liability</h2>
        <p>
            In no event shall Real Property Solution be liable for any indirect,
            incidental, special, consequential, or punitive damages, including
            but not limited to lost profits or revenue, arising out of or
            related to the use of our services.
        </p>

        <h2>7. Modification of terms</h2>
        <p>
            We reserve the right to modify these terms and conditions at any
            time without prior notice. Changes will be effective immediately
            upon posting on our website. Clients are encouraged to review these
            terms regularly for updates.
        </p>

        <h2>8. Governing law</h2>
        <p>
            These terms and conditions are governed by and construed in
            accordance with the laws of the Republic of India. Any disputes
            arising from these terms shall be subject to the exclusive
            jurisdiction of the courts in the Republic of India.
        </p>

        <h2>Contact us</h2>
        <p>
            If you have any questions or concerns regarding these terms and
            conditions, please contact us at{" "}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>
    </LegalPage>
);

export default Terms;
