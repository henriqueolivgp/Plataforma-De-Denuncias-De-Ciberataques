import { Link, LinkProps } from "react-router-dom";

interface LogoProps extends LinkProps {
    to: string
    name: string
    activeTo: string
}

export function Logo({ to, name, activeTo, ...rest }: LogoProps) {
    const isActive = to === activeTo;
    const isHome = activeTo === "/";
    const LogoisHome = activeTo === "/";
    return (
        <Link className="flex items-center space-x-3 rtl:space-x-reverse " {...rest} to={to}>  
                <img src={`${isActive? '/CRWhite.png': LogoisHome? '/CRWhite.png' : '/CR.png' }`} className="h-6 font-Ethnocentric " alt="#" />
                <span className={`self-center text-2xl font-semibold whitespace-nowrap ${isActive? 'text-white': isHome?'text-white' : 'text-black'}`}>{name}</span>
        </Link>
    )
}