import { BannerSection } from "@components/common/bannerSection";
import { InstagramIcon } from "@components/theme/icons/Instagram";
import { TwitterIcon } from "@components/theme/icons/Twitter";
import { FacebookIcon } from "@components/theme/icons/facebook";
import { WhatsappIcon } from "@components/theme/icons/whastapp";
import Link from "next/link";
import React from "react";

const AboutSchema = ({ agentData }: any) => {
    return (
        <>
            <BannerSection title="About Us" />
            <section className="container mx-auto px-6 lg:px-10 2xl:px-32">
                <div className="flex flex-wrap items-center justify-between -mx-4">
                    <div className="w-full px-4 lg:w-6/12">
                        <div className="flex items-center -mx-3 sm:-mx-4">
                            <div className="w-full px-3 sm:px-4 xl:w-1/2">
                                <div className="py-3 sm:py-4">
                                    <img
                                        src="/images/image-1.jpg"
                                        alt=""
                                        className="w-full rounded-2xl"
                                    />
                                </div>
                                <div className="py-3 sm:py-4">
                                    <img
                                        src="/images/team.jpeg"
                                        alt=""
                                        className="w-full rounded-2xl"
                                    />
                                </div>
                            </div>
                            <div className="w-full px-3 sm:px-4 xl:w-1/2">
                                <div className="relative z-1 my-4">
                                    <img
                                        src="/images/mehulleader.jpg"
                                        alt=""
                                        className="w-full rounded-2xl"
                                    />
                                    <span className="absolute md:-right-7 -right-5 -bottom-7 z-[-1]">
                                        <svg
                                            width="134"
                                            height="106"
                                            viewBox="0 0 134 106"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <circle
                                                cx="1.66667"
                                                cy="104"
                                                r="1.66667"
                                                transform="rotate(-90 1.66667 104)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="16.3333"
                                                cy="104"
                                                r="1.66667"
                                                transform="rotate(-90 16.3333 104)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="31"
                                                cy="104"
                                                r="1.66667"
                                                transform="rotate(-90 31 104)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="45.6667"
                                                cy="104"
                                                r="1.66667"
                                                transform="rotate(-90 45.6667 104)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="60.3334"
                                                cy="104"
                                                r="1.66667"
                                                transform="rotate(-90 60.3334 104)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="88.6667"
                                                cy="104"
                                                r="1.66667"
                                                transform="rotate(-90 88.6667 104)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="117.667"
                                                cy="104"
                                                r="1.66667"
                                                transform="rotate(-90 117.667 104)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="74.6667"
                                                cy="104"
                                                r="1.66667"
                                                transform="rotate(-90 74.6667 104)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="103"
                                                cy="104"
                                                r="1.66667"
                                                transform="rotate(-90 103 104)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="132"
                                                cy="104"
                                                r="1.66667"
                                                transform="rotate(-90 132 104)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="1.66667"
                                                cy="89.3333"
                                                r="1.66667"
                                                transform="rotate(-90 1.66667 89.3333)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="16.3333"
                                                cy="89.3333"
                                                r="1.66667"
                                                transform="rotate(-90 16.3333 89.3333)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="31"
                                                cy="89.3333"
                                                r="1.66667"
                                                transform="rotate(-90 31 89.3333)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="45.6667"
                                                cy="89.3333"
                                                r="1.66667"
                                                transform="rotate(-90 45.6667 89.3333)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="60.3333"
                                                cy="89.3338"
                                                r="1.66667"
                                                transform="rotate(-90 60.3333 89.3338)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="88.6667"
                                                cy="89.3338"
                                                r="1.66667"
                                                transform="rotate(-90 88.6667 89.3338)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="117.667"
                                                cy="89.3338"
                                                r="1.66667"
                                                transform="rotate(-90 117.667 89.3338)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="74.6667"
                                                cy="89.3338"
                                                r="1.66667"
                                                transform="rotate(-90 74.6667 89.3338)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="103"
                                                cy="89.3338"
                                                r="1.66667"
                                                transform="rotate(-90 103 89.3338)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="132"
                                                cy="89.3338"
                                                r="1.66667"
                                                transform="rotate(-90 132 89.3338)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="1.66667"
                                                cy="74.6673"
                                                r="1.66667"
                                                transform="rotate(-90 1.66667 74.6673)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="1.66667"
                                                cy="31.0003"
                                                r="1.66667"
                                                transform="rotate(-90 1.66667 31.0003)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="16.3333"
                                                cy="74.6668"
                                                r="1.66667"
                                                transform="rotate(-90 16.3333 74.6668)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="16.3333"
                                                cy="31.0003"
                                                r="1.66667"
                                                transform="rotate(-90 16.3333 31.0003)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="31"
                                                cy="74.6668"
                                                r="1.66667"
                                                transform="rotate(-90 31 74.6668)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="31"
                                                cy="31.0003"
                                                r="1.66667"
                                                transform="rotate(-90 31 31.0003)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="45.6667"
                                                cy="74.6668"
                                                r="1.66667"
                                                transform="rotate(-90 45.6667 74.6668)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="45.6667"
                                                cy="31.0003"
                                                r="1.66667"
                                                transform="rotate(-90 45.6667 31.0003)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="60.3333"
                                                cy="74.6668"
                                                r="1.66667"
                                                transform="rotate(-90 60.3333 74.6668)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="60.3333"
                                                cy="30.9998"
                                                r="1.66667"
                                                transform="rotate(-90 60.3333 30.9998)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="88.6667"
                                                cy="74.6668"
                                                r="1.66667"
                                                transform="rotate(-90 88.6667 74.6668)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="88.6667"
                                                cy="30.9998"
                                                r="1.66667"
                                                transform="rotate(-90 88.6667 30.9998)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="117.667"
                                                cy="74.6668"
                                                r="1.66667"
                                                transform="rotate(-90 117.667 74.6668)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="117.667"
                                                cy="30.9998"
                                                r="1.66667"
                                                transform="rotate(-90 117.667 30.9998)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="74.6667"
                                                cy="74.6668"
                                                r="1.66667"
                                                transform="rotate(-90 74.6667 74.6668)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="74.6667"
                                                cy="30.9998"
                                                r="1.66667"
                                                transform="rotate(-90 74.6667 30.9998)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="103"
                                                cy="74.6668"
                                                r="1.66667"
                                                transform="rotate(-90 103 74.6668)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="103"
                                                cy="30.9998"
                                                r="1.66667"
                                                transform="rotate(-90 103 30.9998)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="132"
                                                cy="74.6668"
                                                r="1.66667"
                                                transform="rotate(-90 132 74.6668)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="132"
                                                cy="30.9998"
                                                r="1.66667"
                                                transform="rotate(-90 132 30.9998)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="1.66667"
                                                cy="60.0003"
                                                r="1.66667"
                                                transform="rotate(-90 1.66667 60.0003)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="1.66667"
                                                cy="16.3333"
                                                r="1.66667"
                                                transform="rotate(-90 1.66667 16.3333)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="16.3333"
                                                cy="60.0003"
                                                r="1.66667"
                                                transform="rotate(-90 16.3333 60.0003)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="16.3333"
                                                cy="16.3333"
                                                r="1.66667"
                                                transform="rotate(-90 16.3333 16.3333)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="31"
                                                cy="60.0003"
                                                r="1.66667"
                                                transform="rotate(-90 31 60.0003)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="31"
                                                cy="16.3333"
                                                r="1.66667"
                                                transform="rotate(-90 31 16.3333)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="45.6667"
                                                cy="60.0003"
                                                r="1.66667"
                                                transform="rotate(-90 45.6667 60.0003)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="45.6667"
                                                cy="16.3333"
                                                r="1.66667"
                                                transform="rotate(-90 45.6667 16.3333)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="60.3333"
                                                cy="60.0003"
                                                r="1.66667"
                                                transform="rotate(-90 60.3333 60.0003)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="60.3333"
                                                cy="16.3333"
                                                r="1.66667"
                                                transform="rotate(-90 60.3333 16.3333)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="88.6667"
                                                cy="60.0003"
                                                r="1.66667"
                                                transform="rotate(-90 88.6667 60.0003)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="88.6667"
                                                cy="16.3333"
                                                r="1.66667"
                                                transform="rotate(-90 88.6667 16.3333)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="117.667"
                                                cy="60.0003"
                                                r="1.66667"
                                                transform="rotate(-90 117.667 60.0003)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="117.667"
                                                cy="16.3333"
                                                r="1.66667"
                                                transform="rotate(-90 117.667 16.3333)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="74.6667"
                                                cy="60.0003"
                                                r="1.66667"
                                                transform="rotate(-90 74.6667 60.0003)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="74.6667"
                                                cy="16.3333"
                                                r="1.66667"
                                                transform="rotate(-90 74.6667 16.3333)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="103"
                                                cy="60.0003"
                                                r="1.66667"
                                                transform="rotate(-90 103 60.0003)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="103"
                                                cy="16.3333"
                                                r="1.66667"
                                                transform="rotate(-90 103 16.3333)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="132"
                                                cy="60.0003"
                                                r="1.66667"
                                                transform="rotate(-90 132 60.0003)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="132"
                                                cy="16.3333"
                                                r="1.66667"
                                                transform="rotate(-90 132 16.3333)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="1.66667"
                                                cy="45.3333"
                                                r="1.66667"
                                                transform="rotate(-90 1.66667 45.3333)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="1.66667"
                                                cy="1.66683"
                                                r="1.66667"
                                                transform="rotate(-90 1.66667 1.66683)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="16.3333"
                                                cy="45.3333"
                                                r="1.66667"
                                                transform="rotate(-90 16.3333 45.3333)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="16.3333"
                                                cy="1.66683"
                                                r="1.66667"
                                                transform="rotate(-90 16.3333 1.66683)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="31"
                                                cy="45.3333"
                                                r="1.66667"
                                                transform="rotate(-90 31 45.3333)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="31"
                                                cy="1.66683"
                                                r="1.66667"
                                                transform="rotate(-90 31 1.66683)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="45.6667"
                                                cy="45.3333"
                                                r="1.66667"
                                                transform="rotate(-90 45.6667 45.3333)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="45.6667"
                                                cy="1.66683"
                                                r="1.66667"
                                                transform="rotate(-90 45.6667 1.66683)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="60.3333"
                                                cy="45.3338"
                                                r="1.66667"
                                                transform="rotate(-90 60.3333 45.3338)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="60.3333"
                                                cy="1.66683"
                                                r="1.66667"
                                                transform="rotate(-90 60.3333 1.66683)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="88.6667"
                                                cy="45.3338"
                                                r="1.66667"
                                                transform="rotate(-90 88.6667 45.3338)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="88.6667"
                                                cy="1.66683"
                                                r="1.66667"
                                                transform="rotate(-90 88.6667 1.66683)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="117.667"
                                                cy="45.3338"
                                                r="1.66667"
                                                transform="rotate(-90 117.667 45.3338)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="117.667"
                                                cy="1.66683"
                                                r="1.66667"
                                                transform="rotate(-90 117.667 1.66683)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="74.6667"
                                                cy="45.3338"
                                                r="1.66667"
                                                transform="rotate(-90 74.6667 45.3338)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="74.6667"
                                                cy="1.66683"
                                                r="1.66667"
                                                transform="rotate(-90 74.6667 1.66683)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="103"
                                                cy="45.3338"
                                                r="1.66667"
                                                transform="rotate(-90 103 45.3338)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="103"
                                                cy="1.66683"
                                                r="1.66667"
                                                transform="rotate(-90 103 1.66683)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="132"
                                                cy="45.3338"
                                                r="1.66667"
                                                transform="rotate(-90 132 45.3338)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="132"
                                                cy="1.66683"
                                                r="1.66667"
                                                transform="rotate(-90 132 1.66683)"
                                                fill="#3056D3"
                                            />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full px-4 lg:w-1/2 xl:w-5/12">
                        <div className="mt-10 lg:mt-0">
                            <h2 className="mb-8 text-3xl md:text-4xl tracking-tight font-extrabold text-gray-900">
                                Make your customers happy by giving services.
                            </h2>
                            <p className="mb-5 text-base text-body-color ">
                                At RealProperty Solution, we believe that happy
                                customers are the cornerstone of our success. We
                                are dedicated to exceeding your expectations by
                                providing unparalleled service and support at
                                every stage of your real estate journey.
                            </p>
                            <p className="mb-8 text-base text-body-color ">
                                From personalized guidance and expert advice to
                                seamless transactions and exceptional results,
                                we are committed to making your experience with
                                us truly rewarding. Our team of highly skilled
                                brokers goes above and beyond to ensure that
                                your needs are met with professionalism,
                                integrity, and a genuine passion for customer
                                satisfaction.
                            </p>
                            <p className="mb-8 text-base text-body-color ">
                                A domain name is one of the first steps to
                                establishing your brand. Secure a consistent
                                brand image with a domain name that matches your
                                business.
                            </p>
                            <p className="mb-8 text-base text-body-color ">
                                Experience the difference of working with a
                                trusted partner who prioritizes your happiness
                                and success. Choose RealProperty Solution for
                                all your real estate needs.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="container mx-auto px-6 lg:px-10 2xl:px-32 md:mt-20 mt-8">
                <h2 className=" text-3xl md:text-4xl tracking-tight font-extrabold text-center text-gray-900">
                    Our Awesome Team
                </h2>
                <p className="mb-10 text-center mt-3 md:w-1/2 mx-auto">
                    Dedicated professionals committed to making your real estate
                    experience exceptional. Experience the difference with our
                    skilled brokers by your side.
                </p>
                {agentData && agentData.length > 0 && (
                    <div className="grid gap-x-6 md:grid-cols-3 lg:gap-x-12 mt-28">
                        {agentData.map((t: any) => (
                            <div className="mb-28">
                                <div className="block h-full rounded-lg bg-white-200/75 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                                    <div className="flex justify-center">
                                        <div className="flex justify-center -mt-[75px]">
                                            <img
                                                src={
                                                    t?.profileImage ??
                                                    "/images/profile.png"
                                                }
                                                className="mx-auto rounded-full shadow-lg dark:shadow-black/20 w-[150px] h-[150px] object-cover"
                                                alt="Avatar"
                                            />
                                        </div>
                                    </div>
                                    <div className="p-6 text-center">
                                        <h5 className="text-lg font-bold capitalize mb-2">
                                            {t?.name}
                                        </h5>
                                        {/* <p className="mb-6">{t.position}</p> */}
                                        <div className="flex items-center justify-center">
                                            {t.facebookUrl && (
                                                <Link
                                                    href={t.facebookUrl}
                                                    target="_blank"
                                                >
                                                    <FacebookIcon className="md:mr-3 mr-2 hover:text-primary hover:cursor-pointer" />
                                                </Link>
                                            )}
                                            {t.twitterUrl && (
                                                <Link
                                                    href={t.twitterUrl}
                                                    target="_blank"
                                                >
                                                    <TwitterIcon className="md:mr-3 mr-2 hover:text-primary hover:cursor-pointer" />
                                                </Link>
                                            )}
                                            {t.phoneNumber && (
                                                <Link
                                                    href={`https://wa.me/${t.phoneNumber}`}
                                                    target="_blank"
                                                >
                                                    <WhatsappIcon className="md:mr-3 mr-2 hover:text-primary hover:cursor-pointer" />
                                                </Link>
                                            )}
                                            {t.instagramUrl && (
                                                <Link
                                                    href={t.instagramUrl}
                                                    target="_blank"
                                                >
                                                    <InstagramIcon className="hover:text-primary hover:cursor-pointer" />
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </>
    );
};

export default AboutSchema;
