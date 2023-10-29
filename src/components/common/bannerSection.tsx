import React from "react";

export const BannerSection = ({ title }: any) => {
    return (
        <section className="md:mb-20 mb-12 overflow-hidden">
            <div className="relative overflow-hidden bg-cover bg-no-repeat bg-[50%] md:h-[300px] h-[150px] bg-[url('https://tecdn.b-cdn.net/img/new/standard/city/078.jpg')]">
                <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed bg-[hsla(0,0%,0%,0.75)]">
                    <div className="flex h-full items-center justify-center">
                        <div className="px-6 text-center text-white md:px-12">
                            <h1 className="mt-2 mb-6 text-2xl font-semibold md:text-6xl xl:text-7xl text-white">
                                {title}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
