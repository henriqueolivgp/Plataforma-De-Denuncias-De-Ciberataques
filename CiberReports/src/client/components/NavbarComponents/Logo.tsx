import { Link, LinkProps } from "react-router-dom";

interface LogoProps extends LinkProps {
    to: string
    name: string
    activeTo: string
}

export function Logo({ to, name, activeTo, ...rest }: LogoProps) {
    const isActive = to === activeTo;
    const isHome = activeTo === "/";
    return (
        <Link to={to}>
            <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse " {...rest}>
                <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                <span className={`self-center text-2xl font-semibold whitespace-nowrap ${isActive? 'text-black': isHome?'text-white' : 'text-black'}`}>{name}</span>
            </a>
        </Link>
    )
}