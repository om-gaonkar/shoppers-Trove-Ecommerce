import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Button } from '../ui/button'

function AdminProductTile({ product }) {
    return (
        <Card className='w-full max-w-sm mx-auto'>
            <div className='relative'>
                <img src={product?.image} className='w-full h-[300px] object-cover rounded-t-lg'
                    alt={product.title} />
            </div>
            <CardContent>
                <h2 className='text-xl font-bold mb-2'>{product?.title}</h2>
                <div className='flex justify-between items-center mb-2'>
                    <span className={`${product?.salePrice > 0 ? 'line-through' : ''} font-semibold text-primary text-lg`}>${product?.price}</span>
                    <span>${product?.salePrice}</span>
                </div>
            </CardContent>
            <CardFooter>
                <Button>Edit</Button>
                <Button>Delete</Button>
            </CardFooter>
        </Card>
    )
}

export default AdminProductTile