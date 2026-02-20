import { HousePlug, ShoppingCart, Sidebar } from 'lucide-react'
import React, { useState, useCallback, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import { shoppingViewHeaderMenuItems } from '@/Config/userNavbar'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'


import { User, LogOut, MenuIcon, X } from "lucide-react";
import { logout } from '@/store/auth-slice/authSlice'

function UserDropdown({ user }) {
    const [open, setOpen] = useState(false);
    const containerRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    function handleLogout() {
        dispatch(logout())
    }

    const closeMenu = useCallback(() => {
        setOpen(false);
    }, []);

    const handleBlur = useCallback((event) => {
        // If focus moves outside dropdown, close it
        if (
            containerRef.current &&
            !containerRef.current.contains(event.relatedTarget)
        ) {
            closeMenu();
        }
    }, [closeMenu]);

    const handleNavigate = useCallback(
        (path) => {
            closeMenu();
            navigate(path);
        },
        [navigate, closeMenu]
    );

    if (!user) return null;

    return (
        <div
            ref={containerRef}
            className="relative inline-block text-left"
            tabIndex={-1}
            onBlur={handleBlur}
        >
            {/* Trigger */}
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                aria-haspopup="menu"
                aria-expanded={open}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
            >
                {user.userName?.[0]?.toUpperCase()}
            </button>

            {/* Dropdown */}
            {open && (
                <div
                    role="menu"
                    className="absolute right-0 mt-2 w-56 rounded-xl bg-white p-3 shadow-lg ring-1 ring-black/5"
                >
                    <p className="text-sm text-gray-600">
                        Logged in as{" "}
                        <span className="font-medium text-gray-900">
                            {user.userName}
                        </span>
                    </p>

                    <div className="my-2 border-t border-gray-100" />

                    <div className="space-y-1">
                        <button
                            role="menuitem"
                            onClick={() => handleNavigate("/shop/accounts")}
                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100"
                        >
                            <User size={16} className="text-gray-500" />
                            Account
                        </button>

                        <button
                            role="menuitem"
                            onClick={() => handleLogout()}
                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 focus:bg-red-50"
                        >
                            <LogOut size={16} />
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}


function ShoppingMenuList() {
    // id label path
    return (
        <nav className=' flex-row hidden md:flex flex-1 lg:mb-0 font-semibold md:gap-2 items-center justify-center lg:gap-5'>
            {
                shoppingViewHeaderMenuItems.map((items) => (
                    <Link key={items.id} to={items.path} >
                        {items.label}
                    </Link>
                ))
            }
        </nav>
    )
}

function ShoppingRightContent({ user }) {

    return (
        <div className='hidden md:flex items-center  justify-center flex-row gap-2'>
            <Button>
                <ShoppingCart className='w-6 h-6' />
                <span>cart</span>
            </Button>
            <UserDropdown user={user} />
        </div>
    )
}

function MobileNavbar({ user }) {
    const [isSidebarOpen, setSideBarOpen] = useState(false);
    const dispatch = useDispatch();

    function handleLogout() {
        dispatch(logout());
        setSideBarOpen(false);
    }

    return (
        <div className="md:hidden">
            {/* Hamburger Button */}
            <button onClick={() => setSideBarOpen(true)}>
                <MenuIcon className="h-6 w-6" />
            </button>

            {/* Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
                    onClick={() => setSideBarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 right-0 z-50 h-full w-72 bg-white shadow-2xl
                transform transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b">
                    <h2 className="text-lg font-semibold">Menu</h2>
                    <button onClick={() => setSideBarOpen(false)}>
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between h-[calc(100%-72px)] overflow-y-auto p-5">

                    {/* Navigation Links */}
                    <nav className="flex flex-col gap-2 font-medium text-gray-700">
                        {shoppingViewHeaderMenuItems.map((item) => (
                            <Link
                                key={item.id}
                                to={item.path}
                                onClick={() => setSideBarOpen(false)}
                                className="py-2 px-3 rounded-lg hover:bg-gray-100 transition"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* User Section */}
                    {user && (
                        <div className="mt-8 border-t pt-6">
                            <p className="text-sm text-gray-500 mb-4">
                                Logged in as
                                <span className="block font-semibold text-gray-900">
                                    {user.userName}
                                </span>
                            </p>

                            <Link
                                to="/shop/accounts"
                                onClick={() => setSideBarOpen(false)}
                                className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                            >
                                <User size={18} />
                                Account
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="mt-3 flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition w-full"
                            >
                                <LogOut size={18} />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </aside>
        </div>
    );
}


const ShoppingHeader = ({ isAuthenticated, user }) => {
    // const { isAuthenticated, user } = useSelector((state) => state.auth)
    useEffect(() => {
        console.log("Mounted");
    }, []);
    console.log("Header Rendered")
    console.log("auth----", isAuthenticated)
    console.log("user---", user)
    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background">
            <div className="flex h-16 items-center justify-between px-4 md:px-6">
                <Link to="/shop/home" className="flex items-center gap-2">
                    <HousePlug className="h-6 w-6" />
                    <span className="font-bold">Ecommerce</span>
                </Link>

                <ShoppingMenuList />
                <ShoppingRightContent user={user} />

                <MobileNavbar user={user} />

            </div>

        </header>

    )
}

export default ShoppingHeader