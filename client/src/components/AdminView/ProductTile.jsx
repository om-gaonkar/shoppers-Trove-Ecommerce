import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Button } from '../ui/button'

function AdminProductTile({ product, setFormData, setOpenPDialogue, setCurrentEditedId, handleDelete }) {
    return (
        <Card className='w-full max-w-sm mx-auto pt-0 gap-2'>
            <div className='relative'>
                <img src={product?.image} className='w-full h-[250px] object-cover rounded-t-lg'
                    alt={product.title} />
            </div>
            <CardContent>
                <h2 className='text-xl font-bold  '>{product?.title}</h2>
                <div className='flex justify-between items-center mb-2'>
                    <span className={`${product?.salePrice > 0 ? 'line-through' : ''} font-semibold text-primary text-lg`}>${product?.price}</span>
                    {product.salePrice > 0 ? <span>${product?.salePrice}</span>
                        : null}
                </div>
            </CardContent>
            <CardFooter className='flex justify-between items-center '>
                <Button onClick={() => {
                    setOpenPDialogue(true)
                    setCurrentEditedId(product?._id)
                    setFormData(product)
                }}
                >Edit</Button>
                <Button onClick={() => handleDelete(product?._id)}>Delete</Button>
            </CardFooter>
        </Card>
    )
}

export default AdminProductTile