"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next'; 
import '../../../i18n'; 

export default function Navbar() {
    const [isVisible, setIsVisible] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { t, i18n } = useTranslation(); 
    

    const dropdownRef = useRef<HTMLDivElement>(null); 
    const buttonRef = useRef<HTMLButtonElement>(null); 

    let lastScrollY = 0;

    const handleScroll = () => {
        if (typeof window !== "undefined") {
            if (window.scrollY > lastScrollY) {
                setIsVisible(false);
            } else {
                setIsVisible(true); 
            }
            lastScrollY = window.scrollY;
        }
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
        if (buttonRef.current) {
            buttonRef.current.style.display = 'none'; 
        }
    };

    const handleClickOutside = (e: MouseEvent) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(e.target as Node) &&
            buttonRef.current &&
            !buttonRef.current.contains(e.target as Node)
        ) {
            setIsDropdownOpen(false); 
            if (buttonRef.current) {
                buttonRef.current.style.display = 'inline-flex'; 
            }
        }
    };

    const changeLanguage = (lng: string, e: React.MouseEvent) => {
        e.preventDefault(); // Prevenir recarga de página
        i18n.changeLanguage(lng); 
        setIsDropdownOpen(false); 
        if (buttonRef.current) {
            buttonRef.current.style.display = 'inline-flex'; 
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        document.addEventListener('mousedown', handleClickOutside); 

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousedown', handleClickOutside); 
        };
    }, []);

    return (
        <motion.nav
            className="border-gray-200 fixed top-0 left-0 w-full z-50 shadow-md"
            initial={{ y: -100 }}
            animate={{ y: isVisible ? 0 : -100 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="logo.svg" className="h-12" alt="Logo" />
                    <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
                        Jorge Higuera
                    </span>
                </a>
                <div className="flex items-center md:order-2 space-x-1 md:space-x-0 rtl:space-x-reverse">
                    <button
                        ref={buttonRef} 
                        className="inline-flex items-center font-medium justify-center px-4 py-2 text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                        onClick={toggleDropdown}
                    >
                        {i18n.language === 'en' ? (
                            <svg
                                className="w-5 h-5 rounded-full me-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                viewBox="0 0 3900 3900"
                            >
                                <path fill="#b22234" d="M0 0h7410v3900H0z" />
                                <path d="M0 450h7410m0 600H0m0 600h7410m0 600H0m0 600H7410m0 600H0" stroke="#fff" strokeWidth="300" />
                                <path fill="#3c3b6e" d="M0 0h2964v2100H0z" />
                            </svg>
                        ) : (
                            <svg
                                aria-hidden="true"
                                className="h-5 w-5 rounded-full me-3"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                            >
                                <path fill="#aa151b" d="M0 0h512v512H0z" />
                                <path fill="#f1bf00" d="M0 85h512v341H0z" />
                            </svg>
                        )}
                        <span className="text-white">{t('dropdown_title')}</span>
                    </button>
                    <div
                        ref={dropdownRef}
                        className={`z-50 ${isDropdownOpen ? 'block' : 'hidden'} my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700`}
                    >
                        <ul className="py-2 font-medium" role="none">
                            <li>
                                <button
                                    onClick={(e) => changeLanguage('en', e)} 
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                    role="menuitem"
                                >
                                    <div className="inline-flex items-center">
                                        <svg
                                            className="w-5 h-5 rounded-full me-3"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                            viewBox="0 0 3900 3900"
                                        >
                                            <path fill="#b22234" d="M0 0h7410v3900H0z" />
                                            <path d="M0 450h7410m0 600H0m0 600h7410m0 600H0m0 600H7410m0 600H0" stroke="#fff" strokeWidth="300" />
                                            <path fill="#3c3b6e" d="M0 0h2964v2100H0z" />
                                        </svg>
                                        English (US)
                                    </div>
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={(e) => changeLanguage('es', e)} 
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                    role="menuitem"
                                >
                                    <div className="inline-flex items-center">
                                        <svg
                                            aria-hidden="true"
                                            className="h-3.5 w-3.5 rounded-full me-2"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 512 512"
                                        >
                                            <path fill="#aa151b" d="M0 0h512v512H0z" />
                                            <path fill="#f1bf00" d="M0 85h512v341H0z" />
                                        </svg>
                                        Español (ES)
                                    </div>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
}
