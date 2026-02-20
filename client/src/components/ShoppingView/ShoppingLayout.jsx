import React from 'react'
import { Outlet } from 'react-router'
import ShoppingHeader from './ShoppingHeader'
import { useSelector } from 'react-redux'

const ShoppingLayout = () => {
    const { isAuthenticated, user } = useSelector((state) => state.auth)

    return (
        <div className='flex flex-col bg-white overflow-hidden'>
            {/*Shopping Header  */}
            <ShoppingHeader isAuthenticated={isAuthenticated} user={user} />
            <main className='flex flex-col w-full'>
                <Outlet />
            </main>
        </div>
    )
}

export default ShoppingLayout