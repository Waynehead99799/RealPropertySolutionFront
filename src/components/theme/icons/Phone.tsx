import React from "react";

export const PhoneIcon = (props: React.SVGProps<SVGSVGElement>) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={16}
            fill="none"
            {...props}
        >
            <path
                fill="#B4131E"
                d="m11.434 11.873-.915-1.503a1.748 1.748 0 0 0-1.088-.796 1.751 1.751 0 0 0-1.331.207l-.756.46a.577.577 0 0 1-.707-.073 10.278 10.278 0 0 1-2.605-4.283.584.584 0 0 1 .262-.657l.755-.46a1.761 1.761 0 0 0 .588-2.418L4.722.846A1.748 1.748 0 0 0 3.634.051a1.746 1.746 0 0 0-1.331.207l-1.457.886A1.74 1.74 0 0 0 0 2.641c0 1.82.36 4.58 2.063 7.379.769 1.263 2.515 3.62 5.578 5.208.266.138.552.206.835.206.317 0 .631-.085.911-.255l1.457-.888c.402-.244.685-.63.796-1.087a1.75 1.75 0 0 0-.208-1.331h.002Z"
            />
        </svg>
    );
};
