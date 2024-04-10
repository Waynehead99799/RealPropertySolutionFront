import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";

export const Testimonials = () => {
    const userData = [
        {
            client_name: "Maria Kate",
            position: "Property Investor",
            client_img: "/images/maria-kate.jpg",
            comment:
                "In ac turpis justo. Vivamus auctor quam vitae odio feugiat pulvinar. Sed semper ligula sed lorem tincidunt dignissim. Nam sed cursus lectus. Proin non rutrum magna. Proin gravida,justo et imperdiet tristique turpis nisiviverra.",
        },
        {
            client_name: "John Doe",
            position: "property Owner",
            client_img: "/images/john-doe.jpg",
            comment:
                "In ac turpis justo. Vivamus auctor quam vitae odio feugiat pulvinar. Sed semper ligula sed lorem tincidunt dignissim. Nam sed cursus lectus. Proin non rutrum magna. Proin gravida,justo et imperdiet tristique turpis nisiviverra.",
        },
        {
            client_name: "Anna Deynah",
            position: "Proud house Owner",
            client_img: "/images/anna-deynah.jpg",
            comment:
                "In ac turpis justo. Vivamus auctor quam vitae odio feugiat pulvinar. Sed semper ligula sed lorem tincidunt dignissim. Nam sed cursus lectus. Proin non rutrum magna. Proin gravida,justo et imperdiet tristique turpis nisiviverra.",
        },
    ];
    return (
        <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            loop={true}
            navigation={false}
            modules={[Autoplay, Pagination]}
            className="mySwiper"
        >
            {userData.map((u) => (
                <SwiperSlide>
                    <div
                        className="relative w-full"
                        data-te-carousel-active
                        data-te-carousel-item
                    >
                        <Image
                            className="mx-auto mb-6 rounded-full"
                            src={u.client_img}
                            alt="avatar"
                            width={100}
                            height={100}
                        />
                        <div className="flex flex-wrap justify-center">
                            <div className="w-full shrink-0 grow-0 basis-auto px-3 lg:w-8/12">
                                <h5 className="text-2xl font-bold">
                                    {u.client_name}
                                </h5>
                                <p className="mb-4 font-medium text-primary/50 text-sm">
                                    {u.position}
                                </p>
                                <p className="mb-6 text-base">{u.comment}</p>
                                <p>&nbsp;</p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};
