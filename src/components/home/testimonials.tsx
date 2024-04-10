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
            client_name: "Rekha Ben Parekh",
            position: "Property Investor",
            client_img: "/images/maria-kate.jpg",
            comment:
                "Real Property Solution Estate Agency's dedication to my long-term success surpassed mere financial gains. Their strategic guidance and personalized approach ensured every investment decision was emotionally fulfilling and financially rewarding.",
        },
        {
            client_name: "Ramesh Bhai Bhuva",
            position: "Property Owner",
            client_img: "/images/john-doe.jpg",
            comment:
                "Real Property solutions Estate Agency made me feel like family, prioritizing my emotional attachment over just making money. Their focus on ensuring my satisfaction ensured a seamless selling process where I felt valued and supported throughout.",
        },
        {
            client_name: "Chandresh Bhai Parekh",
            position: "Property Buyer",
            client_img: "/images/anna-deynah.jpg",
            comment:
                "With Ahmedabad Real Estate Agency, it wasn't just about closing a deal; it was about finding a home where my heart belonged. Their genuine care and commitment to my needs ensured I found not just a property, but a place where memories are made and dreams are realized.",
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
