export interface LogoProps {
    className?: string;
}

export const Logo = (props: LogoProps) => {
    const { className }: any = props;
    return (
        <>
            <img src="logo.png" alt="" className={className} />
        </>
    );
};
