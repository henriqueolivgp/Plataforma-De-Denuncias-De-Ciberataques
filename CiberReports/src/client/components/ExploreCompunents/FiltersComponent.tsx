import React, { useEffect, useRef, useState } from "react";

interface DropdownProps {
    filterType: string;
    setFilterType: (type: string) => void;
}

const FiltersComponent: React.FC<DropdownProps> = ({
    filterType,
    setFilterType,
}: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (
        <div className="flex justify-end">
            <div className="flex justify-center items-center mr-2">

                <button
                    id="dropdownMenuIconHorizontalButton"
                    data-dropdown-toggle="dropdownDotsHorizontal"
                    className="top-0 right-0 mb-2 inline-flex items-center p-2 text-sm font-medium text-center bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    type="button"
                    onClick={toggleDropdown}
                >
                    <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 18"
                    >
                        <path d="M18.85 1.1A1.99 1.99 0 0 0 17.063 0H2.937a2 2 0 0 0-1.566 3.242L6.99 9.868 7 14a1 1 0 0 0 .4.8l4 3A1 1 0 0 0 13 17l.01-7.134 5.66-6.676a1.99 1.99 0 0 0 .18-2.09Z" />
                    </svg>
                    <a href="#">Fiilters</a>
                </button>
            </div>

            {isOpen && (
                <div
                    id="dropdownDotsHorizontal"
                    ref={dropdownRef}
                    className={`mt-10 overflow-auto drop-shadow-xl absolute max-h-96 top-50% -left ${isOpen ? "" : "hidden"
                        } z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
                    aria-orientation="vertical"
                >
                    <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownMenuIconHorizontalButton"
                    >

                        <li className=" hover:bg-gray-100 py-1">
                            <a
                                href="#"
                                onClick={() => setFilterType("All")} // Atualizar o estado do filtro
                                className={`inline-block p-4 ${filterType === "All "
                                    ? "text-bluelite border-b-2 border-bluelite rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                                    : "block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    }`}
                            >
                                All Reports
                            </a>
                        </li>
                        <li className=" hover:bg-gray-100 py-1">
                            <a
                                href="#"
                                onClick={() => setFilterType("Malware")} // Atualizar o estado do filtro
                                className={`inline-block p-4 ${filterType === "Malware "
                                    ? "text-bluelite border-b-2 border-bluelite rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                                    : "block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    }`}
                            >
                                Malware
                            </a>
                        </li>
                        <li className=" hover:bg-gray-100 py-1">
                            <a
                                href="#"
                                onClick={() => setFilterType("Phishing")} // Atualizar o estado do filtro
                                className={`inline-block p-4 ${filterType === "Phishing "
                                    ? "text-bluelite border-b-2 border-bluelite rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                                    : "block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    }`}
                            >
                                Phishing
                            </a>
                        </li>
                        <li className=" hover:bg-gray-100 py-1">
                            <a
                                href="#"
                                onClick={() => setFilterType("Ataques de Negação de Serviço DoS/DDoS")} // Atualizar o estado do filtro
                                className={`inline-block p-4 ${filterType === "Ataques de Negação de Serviço DoS/DDoS"
                                    ? "text-bluelite border-b-2 border-bluelite rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                                    : "block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    }`}
                            >
                                Ataques de Negação de Serviço DoS/DDoS
                            </a>
                        </li>

                        <li className=" hover:bg-gray-100 py-1">
                            <a
                                href="#"
                                onClick={() => setFilterType("Intrusões em Sistemas")} // Atualizar o estado do filtro
                                className={`inline-block p-4 ${filterType === "Intrusões em Sistemas"
                                    ? "text-bluelite border-b-2 border-bluelite rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                                    : "block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    }`}
                            >
                                Intrusões em Sistemas
                            </a>
                        </li>
                        <li className=" hover:bg-gray-100 py-1">
                            <a
                                href="#"
                                onClick={() => setFilterType("Vazamento de Dados")} // Atualizar o estado do filtro
                                className={`inline-block p-4 ${filterType === "Vazamento de Dados"
                                    ? "text-bluelite border-b-2 border-bluelite rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                                    : "block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    }`}
                            >
                                Vazamento de Dados
                            </a>
                        </li>
                        <li className=" hover:bg-gray-100 py-1">
                            <a
                                href="#"
                                onClick={() => setFilterType("Fraudes Online")} // Atualizar o estado do filtro
                                className={`inline-block p-4 ${filterType === "Fraudes Online"
                                    ? "text-bluelite border-b-2 border-bluelite rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                                    : "block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    }`}
                            >
                                Fraudes Online
                            </a>
                        </li>
                        <li className=" hover:bg-gray-100 py-1">
                            <a
                                href="#"
                                onClick={() => setFilterType("Abuso Online")} // Atualizar o estado do filtro
                                className={`inline-block p-4 ${filterType === "Abuso Online"
                                    ? "text-bluelite border-b-2 border-bluelite rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                                    : "block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    }`}
                            >
                                Abuso Online
                            </a>
                        </li>
                        <li className=" hover:bg-gray-100 py-1">
                            <a
                                href="#"
                                onClick={() => setFilterType("Violência ou Conteúdo Ilícito")} // Atualizar o estado do filtro
                                className={`inline-block p-4 ${filterType === "Violência ou Conteúdo Ilícito"
                                    ? "text-bluelite border-b-2 border-bluelite rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                                    : "block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    }`}
                            >
                                Violência ou Conteúdo Ilícito
                            </a>
                        </li>
                        <li className=" hover:bg-gray-100 py-1">
                            <a
                                href="#"
                                onClick={() => setFilterType("Exploração de Vulnerabilidades")} // Atualizar o estado do filtro
                                className={`inline-block p-4 ${filterType === "Exploração de Vulnerabilidades"
                                    ? "text-bluelite border-b-2 border-bluelite rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                                    : "block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    }`}
                            >
                                Exploração de Vulnerabilidades
                            </a>
                        </li>
                        <li className=" hover:bg-gray-100 py-1">
                            <a
                                href="#"
                                onClick={() => setFilterType("Incidentes em Redes Sociais")} // Atualizar o estado do filtro
                                className={`inline-block p-4 ${filterType === "Incidentes em Redes Sociais"
                                    ? "text-bluelite border-b-2 border-bluelite rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                                    : "block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    }`}
                            >
                                Incidentes em Redes Sociais
                            </a>
                        </li>
                        <li className=" hover:bg-gray-100 py-1">
                            <a
                                href="#"
                                onClick={() => setFilterType("Incidentes em Dispositivos Conectados IoT")} // Atualizar o estado do filtro
                                className={`inline-block p-4 ${filterType === "Incidentes em Dispositivos Conectados IoT"
                                    ? "text-bluelite border-b-2 border-bluelite rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                                    : "block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    }`}
                            >
                                Incidentes em Dispositivos Conectados IoT
                            </a>
                        </li>
                        <li className=" hover:bg-gray-100 py-1">
                            <a
                                href="#"
                                onClick={() => setFilterType("Spam e Phishing por SMS")} // Atualizar o estado do filtro
                                className={`inline-block p-4 ${filterType === "Spam e Phishing por SMS"
                                    ? "text-bluelite border-b-2 border-bluelite rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                                    : "block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    }`}
                            >
                                Spam e Phishing por SMS
                            </a>
                        </li>

                    </ul>
                </div>
            )}
        </div>
    );
};

export default FiltersComponent;
