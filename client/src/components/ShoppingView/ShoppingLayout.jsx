import React from 'react'
import { Outlet } from 'react-router'
import ShoppingHeader from './ShoppingHeader'

const ShoppingLayout = () => {
    return (
        <div className='flex flex-col bg-white overflow-hidden'>
            {/*Shopping Header  */}
            <ShoppingHeader />
            <main className='flex flex-col w-full'>
                <Outlet />
            </main>
        </div>
    )
}

export default ShoppingLayout