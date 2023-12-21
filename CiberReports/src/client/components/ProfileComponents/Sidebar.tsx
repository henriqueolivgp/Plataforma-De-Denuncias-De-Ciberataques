import { useLocation, Outlet } from "react-router-dom";
import { ProfileLi } from "./ProfileLi";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from 'react-router-dom';
import { useProfile } from "../../../hooks/useProfile";
import { Loading } from "../Loading";

function Explore() {

    const location = useLocation();
    const { signOut } = useAuth();
    const navigate = useNavigate();
    const { verificaAdmin, isAdmin } = useProfile();

    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const [isLoading, setisLoading] = useState(true);

    const handleOutsideClick = (event: MouseEvent) => {
        const target = event.target as Node;

        // Verifica se o clique foi fora do menu
        if (menuRef.current && !menuRef.current.contains(target)) {
            setIsOpen(false);
        }
    };
    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setisLoading(true)
            await verificaAdmin();
            setisLoading(false)
        };

        fetchData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoading) {
        return <Loading />
    }



    const handleLogOut = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            signOut();
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div ref={menuRef}>
            <button data-drawer-target="default-sidebar" onClick={handleClick} aria-expanded={isOpen} data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className=" sm:block lg:hidden inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>
            <div className="flex flex-1 ">
                <aside id="default-sidebar" className={` absolute z-50 lg:relative ${isOpen ? " " : "hidden"} xl:block lg:block llg:hidden w-64 h-auto transition-transform sm:-translate-x-0 lg:translate-x-0  `} aria-label="Sidebar">
                    <div className=" h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                        <ul className="space-y-2 font-medium">
                            <ProfileLi to="/profile" name="Profile" activeTo={location.pathname} activeLocal={location.pathname} svg={'profile'} />
                            <ProfileLi to="/profile/edit-profile" name="Edit-Profile" activeTo={location.pathname} activeLocal={location.pathname} svg={'editprofile'} />
                            <ProfileLi to="/profile/reports" name="Reports" activeTo={location.pathname} activeLocal={location.pathname} svg={'reports'} />
                            <ProfileLi to="/profile/chat" name="Chat" activeTo={location.pathname} activeLocal={location.pathname} svg={'chat'} />
                            {isAdmin && (
                                <ProfileLi to="/profile/admin" name="Admin Control" activeTo={location.pathname} activeLocal={location.pathname} svg={'admin'} />
                            )}
                            <ProfileLi to="/profile/settings" name="Settings" activeTo={location.pathname} activeLocal={location.pathname} svg={'settings'} />
                            <ProfileLi to="#" name="logout" activeTo={location.pathname} activeLocal={location.pathname} svg={'logout'} onClick={handleLogOut} />
                        </ul>
                    </div>
                </aside>

                <div className="flex-1">
                    <div className="content-box p-4 w-auto">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Explore;