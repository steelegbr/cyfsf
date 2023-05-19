import Link from "next/link";
import { useState } from "react";

const Menu = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    return (
        <nav className="flex items-center justify-between flex-wrap bg-emerald-500 p-6 mb-4" >
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <span className="font-semibold text-xl tracking-tight">Can You Find Sherwood Forest</span>
            </div>
            <div className="block lg:hidden">
                <button
                    className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
                    onClick={() => setShowDropdown(!showDropdown)}
                >
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                </button>
            </div>
            <div className={`w-full ${showDropdown ? "block" : "hidden"} flex-grow lg:flex lg:items-center lg:w-auto`}>
                <div className="text-sm lg:flex-grow">
                    <Link href="/" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                        Play
                    </Link>
                    <Link href="/results" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                        Results
                    </Link>
                    <Link href="/about" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
                        About
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Menu;