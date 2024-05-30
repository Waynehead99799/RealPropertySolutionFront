import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FacebookIcon } from "@components/theme/icons/facebook";
import { TwitterIcon } from "@components/theme/icons/Twitter";
import { LinkedInIcon } from "@components/theme/icons/LinkedIn";
import { InstagramIcon } from "@components/theme/icons/Instagram";
import { LocationIcon } from "@components/theme/icons/Location";
import { PhoneIcon } from "@components/theme/icons/Phone";
import { WhatsappIcon } from "@components/theme/icons/whastapp";

export const Footer = () => {
    const currentYear = new Date().getFullYear();
    const footerMenu = [
        {
            label: "About",
            url: "/about",
        },
        {
            label: "Contact",
            url: "/contact",
        },
        {
            label: "Terms and Conditions",
            url: "/terms",
        },
        {
            label: "Privacy Policy",
            url: "/privacy-policy",
        },
    ];

    return (
        <>
            <footer className="pt-2 bg-[#e8e6e6]/40">
                <div className="rounded-[5px]">
                    <div className="text-center py-8">
                        <div className="flex items-center justify-center mb-10 md:mt-3">
                            <Image
                                src="/logo.png"
                                width={153}
                                height={50}
                                alt="Logo"
                            />
                            <span className="ml-5 mr-4 bg-black w-[1px] h-[26px]"></span>
                            <div className="flex justify-between items-center">
                                <a
                                    href={
                                        "https://www.facebook.com/p/Real-Property-Solution-100054285771240/"
                                    }
                                    target="_blank"
                                >
                                    <FacebookIcon className="md:mr-3 mr-2 hover:text-primary hover:cursor-pointer" />
                                </a>
                                <a href={""} target="_blank">
                                    <TwitterIcon className="md:mr-3 mr-2 hover:text-primary hover:cursor-pointer" />
                                </a>
                                <a href={""} target="_blank">
                                    <LinkedInIcon className="md:mr-3 mr-2 hover:text-primary hover:cursor-pointer" />
                                </a>
                                <a
                                    href={
                                        "https://www.instagram.com/real_property_solution?igsh=ZmFuazl3ajUxam44"
                                    }
                                    target="_blank"
                                >
                                    <InstagramIcon className="md:mr-3 mr-2 hover:text-primary hover:cursor-pointer" />
                                </a>
                                <a
                                    href={"https://wa.me/919909953645"}
                                    target="_blank"
                                >
                                    <WhatsappIcon className=" hover:text-primary hover:cursor-pointer" />
                                </a>
                            </div>
                        </div>
                        <div className="my-6">
                            {footerMenu.map((menu) => {
                                return (
                                    <Link href={menu.url} key={menu.label}>
                                        <span className="lg:px-5 px-2 lg:text-sm text-xs font-normal border-r last:border-r-0 hover:cursor-pointer hover:text-primary">
                                            {menu.label}
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
                        <div className="flex md:items-center justify-center lg:text-sm text-xs font-normal mb-6">
                            <LocationIcon />
                            <span className="ml-2 md:w-auto w-4/5">
                                921, Gala Empire, Opp. Doordarshan Tower, Nr.
                                Drive In Rd, Thaltej Ahmadabad, Gujarat, India
                                380054
                            </span>
                        </div>
                        <p className="flex items-center justify-center lg:text-sm text-xs font-normal">
                            <PhoneIcon />
                            <span className="ml-2">+91 9909953645</span>
                        </p>
                    </div>
                    <div className="lg:text-sm text-xs font-normal p-5 text-center border-t border-black/10">
                        © {currentYear} Real Property Solution. All rights
                        reserved
                    </div>
                </div>
            </footer>
        </>
    );
};
