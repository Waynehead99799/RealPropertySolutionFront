import React, { useMemo, useState } from "react";
import { formatINR, formatNumber } from "src/lib/format";

/** Indicative home-loan EMI for sale listings. Pure arithmetic, no data leaves the page. */
export const EmiCalculator = ({ price }: { price: number }) => {
    const [down, setDown] = useState(25);
    const [rate, setRate] = useState(9);
    const [years, setYears] = useState(15);

    const { emi, loan, interest } = useMemo(() => {
        const loanAmt = price * (1 - down / 100);
        const r = rate / 12 / 100;
        const n = years * 12;
        const e =
            r === 0
                ? loanAmt / n
                : (loanAmt * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        return { emi: e, loan: loanAmt, interest: e * n - loanAmt };
    }, [price, down, rate, years]);

    const Slider = ({
        id,
        label,
        value,
        set,
        min,
        max,
        step,
        suffix,
    }: {
        id: string;
        label: string;
        value: number;
        set: (n: number) => void;
        min: number;
        max: number;
        step: number;
        suffix: string;
    }) => (
        <div>
            <div className="flex items-baseline justify-between">
                <label
                    htmlFor={id}
                    className="text-[15px] font-semibold text-ink"
                >
                    {label}
                </label>
                <span className="tnum font-display text-[26px] font-extrabold text-ink">
                    {value}
                    {suffix}
                </span>
            </div>
            <input
                id={id}
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => set(Number(e.target.value))}
                className="mt-2"
            />
        </div>
    );

    return (
        <div className="grid gap-8 border-2 border-ink p-6 sm:p-8 md:grid-cols-[1fr_1fr]">
            <div className="space-y-6">
                <Slider
                    id="emi-down"
                    label="Down payment"
                    value={down}
                    set={setDown}
                    min={10}
                    max={90}
                    step={5}
                    suffix="%"
                />
                <Slider
                    id="emi-rate"
                    label="Interest rate"
                    value={rate}
                    set={setRate}
                    min={6}
                    max={14}
                    step={0.25}
                    suffix="%"
                />
                <Slider
                    id="emi-years"
                    label="Loan tenure"
                    value={years}
                    set={setYears}
                    min={5}
                    max={25}
                    step={1}
                    suffix=" yrs"
                />
            </div>
            <div className="flex flex-col justify-center bg-ink p-6 text-white">
                <p className="text-[15px] text-white/70">
                    Estimated monthly EMI
                </p>
                <p
                    className="tnum font-display text-[clamp(3rem,6vw,4.6rem)] font-black leading-none"
                    aria-live="polite"
                >
                    {formatINR(Math.round(emi))}
                </p>
                <dl className="mt-5 space-y-1 text-[15px] text-white/80">
                    <div className="flex justify-between gap-4">
                        <dt>Loan amount</dt>
                        <dd className="tnum font-semibold text-white">
                            ₹{formatNumber(loan)}
                        </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                        <dt>Total interest</dt>
                        <dd className="tnum font-semibold text-white">
                            ₹{formatNumber(interest)}
                        </dd>
                    </div>
                </dl>
                <p className="mt-4 text-[13px] text-white/60">
                    Indicative only. Your bank's rate, fees and eligibility will
                    differ.
                </p>
            </div>
        </div>
    );
};
