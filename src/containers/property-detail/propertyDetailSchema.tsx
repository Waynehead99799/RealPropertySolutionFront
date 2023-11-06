import { BannerSection } from "@components/common/bannerSection";
import { ContactForm } from "@components/common/contactForm";
import React from "react";

const PropertyDetailSchema = () => {
    return (
        <>
            <BannerSection title="Lorem Ipsum is dummy" />
            <section className="container mx-auto px-6 lg:px-10 2xl:px-32 mt-5 mb-20">
                <div className="mb-16 flex flex-wrap lg:flex-row-reverse">
                    <div className="mb-6 w-full shrink-0 grow-0 basis-auto lg:mb-0 lg:w-1/4 lg:pl-6">
                        <div className="rounded-3xl border border-white-100/5 bg-white-200 p-6 text-center">
                            <ContactForm />
                        </div>
                    </div>

                    <div className="w-full shrink-0 grow-0 basis-auto lg:w-9/12 lg:pr-6">
                        <h3 className="mb-4 text-2xl font-bold">
                            Exhibition in Paris
                        </h3>
                        <div className="mb-4 flex items-center text-sm font-medium text-primary dark:text-primary-400">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="2"
                                stroke="currentColor"
                                className="mr-2 h-4 w-4"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
                                />
                            </svg>
                            Art
                        </div>
                        <p className="mb-6 text-sm text-neutral-500 dark:text-neutral-400">
                            Published <u>12.01.2022</u> by
                            <a href="#!">Anna Doe</a>
                        </p>
                        <p className="text-neutral-500 dark:text-neutral-300">
                            Duis sagittis, turpis in ullamcorper venenatis,
                            ligula nibh porta dui, sit amet rutrum enim massa in
                            ante. Curabitur in justo at lorem laoreet ultricies.
                            Nunc ligula felis, sagittis eget nisi vitae, sodales
                            vestibulum purus. Vestibulum nibh ipsum, rhoncus vel
                            sagittis nec, placerat vel justo. Duis faucibus
                            sapien eget tortor finibus, a eleifend lectus
                            dictum. Cras tempor convallis magna id rhoncus.
                            Suspendisse potenti. Nam mattis faucibus imperdiet.
                            Proin tempor lorem at neque tempus aliquet.
                            Phasellus at ex volutpat, varius arcu id, aliquam
                            lectus. Vestibulum mattis felis quis ex pharetra
                            luctus. Etiam luctus sagittis massa, sed iaculis est
                            vehicula ut.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default PropertyDetailSchema;
