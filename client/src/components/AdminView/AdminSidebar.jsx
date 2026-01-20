import { adminSidebarMenuItems } from '@/Config/adminForm'
import { ChartNoAxesCombined } from 'lucide-react'
import React, { Fragment } from 'react'
import { useNavigate } from 'react-router'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '../ui/sheet'

function MenuItems({ setOpen }) {
    const navigate = useNavigate()
    return <nav className="mt-8 flex-col flex gap-2">
        {
            adminSidebarMenuItems.map(menuItem =>
                <div key={menuItem.id} onClick={() => {
                    navigate(menuItem.path);
                    setOpen ? setOpen(false) : null
                }} className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground">
                    <span>{menuItem.label}</span>
                </div>)
        }
    </nav>
}

const AdminSidebar = ({ open, setOpen }) => {
    const navigate = useNavigate()


    return (
        <Fragment>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent side="left" className="w-64">
                    <div className="flex flex-col h-full">
                        <SheetHeader className='border-b'>
                            <SheetTitle>
                                <ChartNoAxesCombined size={30} />
                                Admin Panel</SheetTitle>
                        </SheetHeader>
                        <MenuItems setOpen={setOpen} />
                    </div>
                </SheetContent>
            </Sheet>

            <aside className="hidden w-64 flex-col border-b bg-background p-6 border-r lg:flex">
                <div className='flex items-center gap-2' onClick={() => navigate('/admin/dashboard')}>
                    <ChartNoAxesCombined size={30} />
                    <h1 className='text-l font-bold'>Admin Panel</h1>
                </div>
                <MenuItems />

            </aside>

        </Fragment>
    )
}

export default AdminSidebar