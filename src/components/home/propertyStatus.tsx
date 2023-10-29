import { CommercialIcon } from "@components/theme/icons/commercialIcon";
import { LandIcon } from "@components/theme/icons/landIcon";
import { LocationsIcon } from "@components/theme/icons/locationsIcon";
import { ResidentialIcon } from "@components/theme/icons/residentialIcon";
import React, { useEffect, useRef, useState } from "react";

export const PropertyStatus = () => {
    const [inSection, setInSection] = useState(false);
    const [commercial, setCommercial] = useState(0);
    const [residential, setResidential] = useState(0);
    const [land, setLand] = useState(0);
    const [locations, setLocations] = useState(0);
    const sectionRef = useRef(null);

    useEffect(() => {
        if (inSection && commercial < 500) {
            const interval = setInterval(() => {
                setCommercial(commercial + 1);
            }, 9);

            return () => {
                clearInterval(interval);
            };
        }
    }, [inSection, commercial]);

    useEffect(() => {
        if (inSection && residential < 350) {
            const interval = setInterval(() => {
                setResidential(residential + 1);
            }, 9);

            return () => {
                clearInterval(interval);
            };
        }
    }, [inSection, residential]);

    useEffect(() => {
        if (inSection && land < 200) {
            const interval = setInterval(() => {
                setLand(land + 1);
            }, 9);

            return () => {
                clearInterval(interval);
            };
        }
    }, [inSection, land]);

    useEffect(() => {
        if (inSection && locations < 120) {
            const interval = setInterval(() => {
                setLocations(locations + 1);
            }, 9);

            return () => {
                clearInterval(interval);
            };
        }
    }, [inSection, locations]);

    const handleIntersect = (entries: any) => {
        if (entries[0].isIntersecting) {
            setInSection(true);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersect, {
            root: null,
            rootMargin: "0px",
            threshold: 0.1,
        });

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <section
            className="property-status-bg bg-cover bg-bottom mt-20"
            id="countdown-section"
            ref={sectionRef}
        >
            <div className="container mx-auto px-6 lg:px-10 2xl:px-32 py-14">
                <div className="flex flex-col text-center w-full mb-10">
                    <h2 className="text-3xl md:text-4xl tracking-tight font-semibold text-center text-white">
                        We are Trusted Property Dealer in Ahmedabad
                    </h2>
                    <p className="text-center mt-3 md:w-2/3 mx-auto text-white">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s.
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s.
                    </p>
                </div>
                <div className="flex flex-wrap -m-4 text-center">
                    <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                        <div className="px-4 py-6 rounded-lg bg-white">
                            <CommercialIcon className="w-[50px] h-[50px] mx-auto mb-3" />
                            <h2 className="title-font font-medium  text-3xl md:text-4xl">
                                {commercial}+
                            </h2>
                            <p className="text-lg font-medium">
                                Commercial Rent
                            </p>
                        </div>
                    </div>
                    <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                        <div className="px-4 py-6 rounded-lg bg-white">
                            <ResidentialIcon className="w-[50px] h-[50px] mx-auto mb-3" />
                            <h2 className="title-font font-medium  text-3xl md:text-4xl">
                                {residential}+
                            </h2>
                            <p className="text-lg font-medium">
                                Residential Rent
                            </p>
                        </div>
                    </div>
                    <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                        <div className="px-4 py-6 rounded-lg bg-white">
                            <LandIcon className="w-[50px] h-[50px] mx-auto mb-3" />
                            <h2 className="title-font font-medium  text-3xl md:text-4xl ">
                                {land}
                            </h2>
                            <p className="text-lg font-medium">Land</p>
                        </div>
                    </div>
                    <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                        <div className="px-4 py-6 rounded-lg bg-white">
                            <LocationsIcon className="w-[50px] h-[50px] mx-auto mb-3" />
                            <h2 className="title-font font-medium  text-3xl md:text-4xl ">
                                {locations}
                            </h2>
                            <p className="text-lg font-medium">Locations</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
