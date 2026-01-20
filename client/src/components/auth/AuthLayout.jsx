import React from 'react'
import { Outlet } from 'react-router'

const AuthLayout = () => {
    return (
        <div className='flex min-h-screen w-full'>
            <div className='hidden md:flex items-center justify-center bg-black w-1/2 px-12'>
                <div className='max-w-md space-y-6 text-center text-primary-foreground'>
                    <h1 className='text-4xl font-extrabold tracking-tight'>Welcome to Shoppers Stop</h1>
                </div>
            </div>
            <div className='flex justify-center items-center flex-1 bg-background px-4 py-12 sm:py-6 md:px-8'>
                <Outlet />
            </div>
        </div>
    )
}

export default AuthLayout