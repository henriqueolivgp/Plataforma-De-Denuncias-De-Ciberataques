import { Link, LinkProps } from "react-router-dom";

interface NavLiProps extends LinkProps {
    to: string
    name: string
    activeTo: string
}

export function NavLi({ to, name, activeTo, ...rest }: NavLiProps) {
    const isActive = to === activeTo;
    const isHome = activeTo === "/";
    return (
        <li>
            <Link to={to} className={`block  md:p-0 hover:text-bluelite rounded ${isActive? 'text-bluelite': isHome?'text-white' : 'text-black'}`} aria-current="page" {...rest}>{name}</Link>
        </li>
    )
}