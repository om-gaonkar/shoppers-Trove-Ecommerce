import { Outlet } from 'react-router'
import AdminSidebar from './AdminSidebar'
import AdminHeader from './AdminHeader'
import { useState } from 'react'



const AdminLayout = () => {
    const [adminSidebarOpen, setAdminSidebarOpen] = useState(false)

    return (
        <div className='flex min-h-screen w-full'>
            {/* Admin Sidebar */}
            <AdminSidebar open={adminSidebarOpen} setOpen={setAdminSidebarOpen} />
            <div className='flex flex-col flex-1'>
                {/* Admin header */}
                <AdminHeader setOpen={setAdminSidebarOpen} />
                <main className='flex-1 flex-col  flex bg-muted/40 p-4 md:p-6'>
                    <Outlet />
                </main>
            </div>

        </div>
    )
}

export default AdminLayout