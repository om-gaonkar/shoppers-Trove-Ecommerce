import { HousePlug, ShoppingCart } from 'lucide-react'
import React, { useState, useCallback, useRef } from 'react'
import { Link, useNavigate } from 'react-router'
import { shoppingViewHeaderMenuItems } from '@/Config/userNavbar'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'


import { User, LogOut } from "lucide-react";
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
        <div className='flex items-center justify-center flex-row gap-2'>
            <Button>
                <ShoppingCart className='w-6 h-6' />
                <span>cart</span>
            </Button>
            <UserDropdown user={user} />
        </div>
    )
}

const ShoppingHeader = () => {
    const { isAuthenticated, user } = useSelector((state) => state.auth)
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

            </div>
        </header>

    )
}

export default ShoppingHeader