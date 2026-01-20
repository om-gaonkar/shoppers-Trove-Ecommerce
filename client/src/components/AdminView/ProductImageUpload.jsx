import React, { useEffect, useRef } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FileIcon, UploadCloudIcon, XIcon } from 'lucide-react'
import axios from 'axios'
import { Skeleton } from '../ui/skeleton'

const ProductImageUpload = ({ imageFile, setImageFile, uploadedImgUrl, setUploadedImgUrl, setImageLoading, imageLoading }) => {

    const inputRef = useRef(null)
    function handleImgChange(event) {
        console.log(event.target.files)
        const selectedFile = event.target.files?.[0]
        if (selectedFile) {
            setImageFile(selectedFile)

        }
    }

    const handleDragOver = (event) => {
        event.preventDefault()
    }
    const handleDrop = (event) => {
        event.preventDefault()
        console.log("dropped file>>>>", event.dataTransfer.files?.[0])
        const droppedFile = event.dataTransfer.files?.[0]
        if (droppedFile) setImageFile(droppedFile)
    }
    const handleRemoveImage = () => {
        setImageFile(null)
        if (inputRef.current) {
            inputRef.current.value = ''
        }
    }
    console.log(imageFile)
    async function uploadImageToCloudinary() {
        setImageLoading(true)
        const data = new FormData()
        console.log("image uploading")
        data.append('myFile', imageFile)
        const response = await axios.post("http://localhost:8080/api/admin/products/uploadimage", data)
        console.log("response----", response)
        if (response?.data?.success) {
            setUploadedImgUrl(response.data.result.url)
            setImageLoading(false)
        }
    }

    useEffect(() => {
        if (imageFile !== null)
            uploadImageToCloudinary()
    }, [imageFile])

    return (
        <div className='w-full max-w-md mx-auto mt-1'>
            <Label className='font-semibold text-lg mb-2 block'>Upload image</Label>
            <div onDragOver={handleDragOver} onDrop={handleDrop} className='border-2 border-dashed rounded-lg p-4' >
                <Input className='hidden' type='file' id="imageUpload" ref={inputRef} onChange={handleImgChange} ></Input>

                {!imageFile ?
                    (<Label htmlFor='imageUpload' className='flex flex-col items-center justify-center h-32 cursor-pointer' >
                        <UploadCloudIcon className='w-10 h-10 text-muted-foreground mb-2' />
                        <span>Drag & drop or click to upload</span>
                    </Label>) :
                    (imageLoading ?
                        <Skeleton className='h-10 bg-gray-100' /> :
                        <div className='flex items-center justify-between'>
                            <div className='flex w-full items-center justify-between'>
                                <FileIcon className='w-8 text-primary mr-2 h-8'></FileIcon>
                                <p className='text-sm font-medium'>{imageFile.name}</p>
                                <Button onClick={handleRemoveImage}>
                                    <XIcon className='w-4 h-4 '></XIcon>
                                    <span className='sr-only'>Remove File</span>
                                </Button>
                            </div>
                        </div>)}
            </div>
        </div>
    )
}

export default ProductImageUpload