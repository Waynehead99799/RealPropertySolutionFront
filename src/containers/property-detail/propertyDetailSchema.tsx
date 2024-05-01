import { BannerSection } from "@components/common/bannerSection";
import { ContactForm } from "@components/common/contactForm";
import React, { useState } from "react";
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { BedsIcon } from "@components/theme/icons/BedsIcon";
import { BathIcon } from "@components/theme/icons/BathIcon";
import { LevelsIcon } from "@components/theme/icons/LevelsIcon";
import { SqtIcon } from "@components/theme/icons/SqtIcon";
import { LocationIcon } from "@components/theme/icons/Location";
import { PhoneIcon } from "@components/theme/icons/Phone";
import { PropertyBox } from "@components/property/propertyBox";
import { EmailIcon } from "@components/theme/icons/Email";

interface PropertyDetailSchemaProps {
    propertyData: any;
}

const PropertyDetailSchema = (props: PropertyDetailSchemaProps) => {
    const {
        propertyData: { property, relatedProperties },
    } = props;

    const [thumbsSwiper, setThumbsSwiper]: any = useState(null);

    return (
        <>
            <BannerSection title={property?.title ?? "Title"} />
            <section className="container mx-auto px-6 lg:px-10 2xl:px-32 mt-5 mb-20">
                <div className="mb-16 flex flex-wrap lg:flex-row-reverse">
                    <div className="md:mb-6 md:mt-0 mt-10 w-full shrink-0 grow-0 basis-auto lg:mb-0 lg:w-1/4 lg:pl-6 order-2 md:order-1">
                        <div className="rounded-3xl border border-white-100/5 bg-white-200 p-6 text-center sticky top-[115px]">
                            <ContactForm />
                        </div>
                    </div>

                    <div className="w-full shrink-0 grow-0 basis-auto lg:w-9/12 lg:pr-6 md:order-2 order-1">
                        {property?.images && property?.images?.length > 0 && (
                            <div className="mb-10">
                                <Swiper
                                    loop={true}
                                    spaceBetween={5}
                                    navigation={false}
                                    autoplay={{
                                        delay: 2500,
                                        disableOnInteraction: false,
                                    }}
                                    /* eslint-disable */
                                    thumbs={{
                                        swiper:
                                            thumbsSwiper &&
                                            !thumbsSwiper.destroyed
                                                ? thumbsSwiper
                                                : null,
                                    }}
                                    /* eslint-disable */
                                    modules={[
                                        Autoplay,
                                        FreeMode,
                                        Navigation,
                                        Thumbs,
                                    ]}
                                    className="mySwiper2"
                                    style={{ height: "560px" }}
                                >
                                    {property.images.map(
                                        (i: string, index: number) => (
                                            <SwiperSlide key={index}>
                                                <img src={i} />
                                            </SwiperSlide>
                                        ),
                                    )}
                                </Swiper>
                                <Swiper
                                    onSwiper={setThumbsSwiper}
                                    loop={true}
                                    spaceBetween={1}
                                    slidesPerView={6}
                                    freeMode={true}
                                    autoplay={{
                                        delay: 2500,
                                        disableOnInteraction: false,
                                    }}
                                    watchSlidesProgress={true}
                                    modules={[
                                        Autoplay,
                                        FreeMode,
                                        Navigation,
                                        Thumbs,
                                    ]}
                                    className="mySwiper"
                                    style={{ height: "95px" }}
                                >
                                    {property?.images.map(
                                        (i: string, index: number) => (
                                            <SwiperSlide key={index}>
                                                <img src={i} />
                                            </SwiperSlide>
                                        ),
                                    )}
                                </Swiper>
                            </div>
                        )}
                        <h3 className="mb-4 text-2xl font-bold">
                            {property?.description}
                        </h3>
                        <div className="mb-4 flex items-center text-lg font-medium text-primary dark:text-primary-400">
                            {property?.price} Rs
                        </div>
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

                        <div className="flex items-center justify-around py-4 border-t border-b mt-5 border-b-grey-500 border-t-grey-500">
                            {property?.detail?.bed && (
                                <div>
                                    <BedsIcon className="w-[48px] h-[48px]" />
                                    <p className="grid text-center mt-1">
                                        <span className=" text-lg font-semibold">
                                            Beds
                                        </span>
                                        <span className="text-base font-medium">
                                            {property?.detail?.bed ?? "N/A"}
                                        </span>
                                    </p>
                                </div>
                            )}
                            {property?.detail?.bath && (
                                <div>
                                    <BathIcon className="w-[48px] h-[48px]" />
                                    <p className="grid text-center mt-1">
                                        <span className=" text-lg font-semibold">
                                            Baths
                                        </span>
                                        <span className="text-base font-medium">
                                            {property?.detail?.bath ?? "N/A"}
                                        </span>
                                    </p>
                                </div>
                            )}
                            {property?.detail?.levels && (
                                <div>
                                    <LevelsIcon className="w-[48px] h-[48px]" />
                                    <p className="grid text-center mt-1">
                                        <span className=" text-lg font-semibold">
                                            Levels
                                        </span>
                                        <span className="text-base font-medium">
                                            {property?.detail?.levels ?? "N/A"}
                                        </span>
                                    </p>
                                </div>
                            )}
                            {property?.detail?.sqft && (
                                <div>
                                    <SqtIcon className="w-[48px] h-[48px]" />
                                    <p className="grid text-center mt-1">
                                        <span className=" text-lg font-semibold">
                                            Sqft
                                        </span>
                                        <span className="text-base font-medium">
                                            {property?.detail?.sqft ?? "N/A"}
                                        </span>
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className="mt-6">
                            <h3 className="mb-4 text-2xl font-bold">
                                Contact Details
                            </h3>
                            <div className="flex md:items-center mb-3">
                                <LocationIcon />
                                <span className="ml-2 md:w-auto w-4/5">
                                    {property?.address ?? "N/A"}
                                </span>
                            </div>
                            <div className="flex items-center">
                                {property?.phone && (
                                    <div className="flex items-center">
                                        <PhoneIcon />
                                        <span className="ml-2">
                                            {property?.phone}
                                        </span>
                                    </div>
                                )}
                                {property?.email && (
                                    <div className="flex items-center ml-5">
                                        <EmailIcon />
                                        <span className="ml-2">
                                            {property?.email}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mt-8">
                            <h3 className="mb-4 text-2xl font-bold">
                                Related property
                            </h3>
                            <div className="grid gap-x-6 lg:grid-cols-3">
                                <PropertyBox data={relatedProperties} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default PropertyDetailSchema;
