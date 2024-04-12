import React from "react";
import HomeStyle from "./homeStyle.module.scss";
import { DoubleRightOutlined } from "@ant-design/icons";
import { PropertyBox } from "@components/property/propertyBox";
import { GALLERY } from "src/libs/constants";
import { PropertyGallery } from "@components/property/propertyGallery";
import { Testimonials } from "@components/home/testimonials";
import { PropertyStatus } from "@components/home/propertyStatus";
import { ContactSection } from "@components/home/contact";
import { OurClients } from "@components/home/ourClients";

interface HomeSceneProps {
    propertyData: any;
    isLoading: boolean | any;
}

export const HomeScene = (props: HomeSceneProps) => {
    const { propertyData } = props;

    return (
        <>
            <section
                className={`relative overflow-hidden bg-cover bg-no-repeat ${HomeStyle.heroSection} h-[460px] md:h-[650px]`}
            >
                <img src="/images/pic-4.jpg" />
                <div className="flex h-full items-center justify-center bg-[hsla(0,0%,0%,0.7)] absolute top-0 w-full">
                    <div className="container mx-auto px-6 lg:px-10 2xl:px-32 text-center md:px-12">
                        <h1 className="mt-2 mb-6 text-2xl font-semibold md:text-6xl xl:text-7xl text-white">
                            Where Vision Meets Value <br /> Real Property
                            Solution.
                        </h1>
                        <p className="text-white md:w-1/2 mx-auto mb-12">
                            "At Real Property Solutions, we don't just sell
                            houses, we forge lasting relationships built on
                            trust and understanding. Your goals become our
                            goals, and your success is our deepest
                            satisfaction."
                        </p>
                        <button
                            type="button"
                            className="btn btn-primary flex items-center justify-center mx-auto"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                        >
                            Get Properties{" "}
                            <DoubleRightOutlined
                                className="ml-2"
                                onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}
                            />
                        </button>
                    </div>
                </div>
            </section>
            <section className="container mx-auto px-6 lg:px-10 2xl:px-32">
                <div className="gap-16 items-center py-8 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16">
                    <div className="font-light text-gray-500 sm:text-lg">
                        <h2 className="mb-4  text-3xl md:text-4xl tracking-tight font-extrabold text-gray-900">
                            Focused on personalized approach
                        </h2>
                        <p className="mb-4">
                            Let our passion for real estate ignite yours. We're
                            not just agents; we're your trusted allies,
                            tailoring every step of your journey to your unique
                            needs and dreams. We'll exceed your expectations,
                            ensuring your real estate experience is smooth,
                            stress-free, and ultimately, fulfilling.
                        </p>
                        <p>
                            Our passion for real estate runs deep, rooted in the
                            vibrant Ahmadabad market we know like the back of
                            our hand. Let us guide you with local expertise,
                            fierce negotiation skills, and unwavering
                            dedication. You'll experience a smooth journey,
                            surpassing expectations at every turn.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-8">
                        <img
                            className="w-[291px] h-[232px] md:h-[405px] rounded-lg shadow-md shadow-secondary"
                            src="/images/pic-6.jpg"
                            alt="office content 1"
                        />
                        <img
                            className="mt-4 w-[291px] h-[232px] md:h-[405px] lg:mt-10 rounded-lg shadow-md shadow-secondary"
                            src="/images/pic-7.jpg"
                            alt="office content 2"
                        />
                    </div>
                </div>
            </section>
            <OurClients />
            <section className="container mx-auto px-6 lg:px-10 2xl:px-32 mt-5">
                <h2 className=" text-3xl md:text-4xl tracking-tight font-extrabold text-center text-gray-900">
                    Properties
                </h2>
                <p className="mb-10 text-center mt-3 md:w-1/2 mx-auto">
                    Invest in your future. Find lucrative opportunities in our
                    diverse portfolio of properties, meticulously chosen for
                    their growth potential and market stability.
                </p>
                <div className="grid gap-x-6 lg:grid-cols-3">
                    <PropertyBox data={propertyData} />
                </div>
            </section>
            <section className="container mx-auto px-6 lg:px-10 2xl:px-32 mt-14">
                <h2 className=" text-3xl md:text-4xl tracking-tight font-extrabold text-center text-gray-900">
                    Properties Gallery
                </h2>
                <p className="mb-10 text-center mt-3 md:w-1/2 mx-auto">
                    Immerse yourself in possibilities. Explore our stunning
                    gallery of properties, each one a canvas for your dreams and
                    aspirations."
                </p>
                <div className="grid gap-x-0 lg:grid-cols-3">
                    <PropertyGallery data={GALLERY} />
                </div>
            </section>
            <PropertyStatus />
            <section className="container mx-auto px-6 lg:px-10 2xl:px-32 mt-20">
                <h2 className=" text-3xl md:text-4xl tracking-tight font-extrabold text-center text-gray-900">
                    Testimonials
                </h2>
                <div className="mt-10">
                    <Testimonials />
                </div>
            </section>
            <ContactSection />
        </>
    );
};
