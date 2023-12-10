import { BannerSection } from "@components/common/bannerSection";
import { ContactForm } from "@components/common/contactForm";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";
import { BedsIcon } from "@components/theme/icons/BedsIcon";
import { BathIcon } from "@components/theme/icons/BathIcon";
import { LevelsIcon } from "@components/theme/icons/LevelsIcon";
import { SqtIcon } from "@components/theme/icons/SqtIcon";
import { LocationIcon } from "@components/theme/icons/Location";
import { PhoneIcon } from "@components/theme/icons/Phone";
import { PropertyBox } from "@components/property/propertyBox";
import { RELATED_PROPERTY } from "src/libs/constants";
import { EmailIcon } from "@components/theme/icons/Email";

const PropertyDetailSchema = () => {
    const [thumbsSwiper, setThumbsSwiper]: any = useState(null);

    return (
        <>
            <BannerSection title="Lorem Ipsum is dummy" />
            <section className="container mx-auto px-6 lg:px-10 2xl:px-32 mt-5 mb-20">
                <div className="mb-16 flex flex-wrap lg:flex-row-reverse">
                    <div className="mb-6 w-full shrink-0 grow-0 basis-auto lg:mb-0 lg:w-1/4 lg:pl-6">
                        <div className="rounded-3xl border border-white-100/5 bg-white-200 p-6 text-center sticky top-[115px]">
                            <ContactForm />
                        </div>
                    </div>

                    <div className="w-full shrink-0 grow-0 basis-auto lg:w-9/12 lg:pr-6">
                        <div className="mb-10">
                            <Swiper
                                loop={true}
                                spaceBetween={5}
                                navigation={true}
                                autoplay={{
                                    delay: 2500,
                                    disableOnInteraction: false,
                                }}
                                thumbs={{ swiper: thumbsSwiper }}
                                modules={[
                                    Autoplay,
                                    FreeMode,
                                    Navigation,
                                    Thumbs,
                                ]}
                                className="mySwiper2"
                            >
                                <SwiperSlide>
                                    <img src="/images/pic-1.jpg" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src="/images/pic-2.jpg" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src="/images/pic-3.jpg" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src="/images/pic-4.jpg" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src="/images/pic-3.jpg" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src="/images/pic-3.jpg" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src="/images/pic-4.jpg" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src="/images/pic-3.jpg" />
                                </SwiperSlide>
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
                            >
                                <SwiperSlide>
                                    <img src="/images/pic-1.jpg" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src="/images/pic-2.jpg" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src="/images/pic-3.jpg" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src="/images/pic-4.jpg" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src="/images/pic-3.jpg" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src="/images/pic-3.jpg" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src="/images/pic-4.jpg" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src="/images/pic-3.jpg" />
                                </SwiperSlide>
                            </Swiper>
                        </div>
                        <h3 className="mb-4 text-2xl font-bold">
                            Property Description
                        </h3>
                        <div className="mb-4 flex items-center text-lg font-medium text-primary dark:text-primary-400">
                            1.35 CR
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
                            <div>
                                <BedsIcon className="w-[48px] h-[48px]" />
                                <p className="grid text-center mt-1">
                                    <span className=" text-lg font-semibold">
                                        Beds
                                    </span>
                                    <span className="text-base font-medium">
                                        5
                                    </span>
                                </p>
                            </div>
                            <div>
                                <BathIcon className="w-[48px] h-[48px]" />
                                <p className="grid text-center mt-1">
                                    <span className=" text-lg font-semibold">
                                        Baths
                                    </span>
                                    <span className="text-base font-medium">
                                        3
                                    </span>
                                </p>
                            </div>
                            <div>
                                <LevelsIcon className="w-[48px] h-[48px]" />
                                <p className="grid text-center mt-1">
                                    <span className=" text-lg font-semibold">
                                        Levels
                                    </span>
                                    <span className="text-base font-medium">
                                        56
                                    </span>
                                </p>
                            </div>
                            <div>
                                <SqtIcon className="w-[48px] h-[48px]" />
                                <p className="grid text-center mt-1">
                                    <span className=" text-lg font-semibold">
                                        Sqft
                                    </span>
                                    <span className="text-base font-medium">
                                        1500
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="mt-6">
                            <h3 className="mb-4 text-2xl font-bold">
                                Contact Details
                            </h3>
                            <div className="flex items-center mb-3">
                                <LocationIcon />
                                <span className="ml-2 md:w-auto w-4/5">
                                    402, Dwarkesh business hub, opp. Home Town,
                                    Ahmedabad, Gujarat, India 380005
                                </span>
                            </div>
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    <PhoneIcon />
                                    <span className="ml-2">+917016799899</span>
                                </div>
                                <div className="flex items-center ml-5">
                                    <EmailIcon />
                                    <span className="ml-2">user@gmail.com</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8">
                            <h3 className="mb-4 text-2xl font-bold">
                                Related property
                            </h3>
                            <div className="grid gap-x-6 lg:grid-cols-3">
                                <PropertyBox data={RELATED_PROPERTY} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default PropertyDetailSchema;
