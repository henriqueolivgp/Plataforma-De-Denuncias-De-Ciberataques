import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useAuth } from "../../hooks/useAuth";

export default function Navbar() {

  {/*Function UserDropdown */ }
  // ...
  const [isOpen, setIsOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>();

  const handleClick = () => {
    setIsOpen(!isOpen);

    // Limpar o timeout existente antes de definir um novo
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    const id = setTimeout(() => {
      setIsOpen(false);
      setIsLinksOpen(false);
    }, 3000);

    // Armazenar o identificador do timeout na variável de estado
    setTimeoutId(id);
  };

  // Limpar o timeout se o componente for desmontado antes que o timeout expire
  useEffect(() => {
    return () => {
      // Verificar se há um timeout ativo antes de tentar limpar
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);
  // ...


  {/*Function DropdownLinks*/ }
  const [timeoutId2, setTimeoutId2] = useState<NodeJS.Timeout | null>();
  const [isLinksOpen, setIsLinksOpen] = useState(false);

  const handleLinksToggle = () => {
    setIsLinksOpen(!isLinksOpen);
    setIsOpen(!isOpen);

    const id_LinksDropdown = setTimeout(() => {
      setIsLinksOpen(false);
    }, 1000);


    setTimeoutId2(id_LinksDropdown);
  };
  // Limpar o timeout se o componente for desmontado antes que o timeout expire
  useEffect(() => {
    return () => {
      // Verificar se há um timeout ativo antes de tentar limpar
      if (timeoutId2 !== null) {
        clearTimeout(timeoutId2);
      }
    };
  }, [timeoutId2]);

  const { signOut, session } = useAuth();

  const handleLogOut = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      signOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (

    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="container-xxl flex flex-wrap items-center p-5">
        <a href="#" className="flex items-center">
          <img src="#" className="h-6 " alt="CR-logo" />
        </a>
        <div className="flex items-center md:order-2 mx-auto mr-3">
          <div className="relative hidden md:block mr-4">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
              <span className="sr-only">Search icon</span>
            </div>
            <input type="text" id="search-navbar" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
          </div>
          <div className="relative">
            <button type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded={isOpen} data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom" onClick={handleClick}>
              <span className="sr-only">Open user menu</span>
              <span className="logado top-0 left-6 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
              <img className="w-8 h-8 rounded-full" src="user.png" alt="user photo" />
            </button>
            <div
              className={`absolute top-50% -right-4 ${isOpen ? "" : "hidden"} z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
              id="user-dropdown"
            >
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">Name LastName</span>
                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">emai@email.com</span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</a>
                </li>
                <li>
                  {!session && (
                    <Link to={"/signin"} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">SignIn</Link>
                  )}
                  {!session && (
                    <Link to={"/signup"} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">SignUp</Link>
                  )}
                  {session && (
                    <Link to={"/"} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Home</Link>

                  )}
                  {session && (
                    <Link to="#" onClick={handleLogOut} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">LogOut</Link>

                  )}
                </li>
              </ul>
            </div>
          </div>
          <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded={isLinksOpen} onClick={handleLinksToggle}>
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
          </button>
        </div>
        <div
          className={`absolute top-50% -right-4 ${isOpen ? "" : "hidden"} z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
          id="user-dropdown"
        ></div>
        <div className={`ml-20 items-center justify-between ${isLinksOpen ? "" : "hidden"} w-full md:flex md:w-auto md:order-1" id="mobile-menu-2`}>
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link to={'/'} className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</Link>
            </li>
            <li>
              <Link to={'/support'} className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Support</Link>
            </li>
            <li>
              <Link to={"/about-us"} className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About US</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>



  );
}