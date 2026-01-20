import Form from "@/components/Common/Form";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import React, { Fragment, useEffect, useState } from "react";
import { addProductFormElements } from "@/Config/adminProduct";
import ProductImageUpload from "@/components/AdminView/ProductImageUpload";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, fetchAllProducts } from "@/store/admin/productSlice/index";
import AdminProductTile from "@/components/AdminView/ProductTile";
const initialFormData = {
    img: null,
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    totalStock: "",
};


const AdminProducts = () => {

    const [openPDialogue, setOpenPDialogue] = useState(false);
    const [formData, setFormData] = useState(initialFormData);

    const [imageFile, setImageFile] = useState(null);
    const [uploadedImgUrl, setUploadedImgUrl] = useState("");
    const [imageLoading, setImageLoading] = useState(false)
    const { productList } = useSelector(state => state.adminProducts)
    const dispatch = useDispatch()

    function onSubmit(e) {
        e.preventDefault()
        dispatch(
            addProduct({ ...formData, image: uploadedImgUrl }
            ))
            .then((data) => {
                console.log(data)
                if (data?.payload?.success) {
                    setOpenPDialogue(false)
                    dispatch(fetchAllProducts)
                    setImageFile(null)
                    setFormData(initialFormData)
                    alert("data uploaded successfully")
                }
            })
    }

    useEffect(() => {
        dispatch(fetchAllProducts())

    }, [dispatch])

    console.log("formdata", formData)
    console.log("productList", uploadedImgUrl, productList)

    return (
        <Fragment>
            <div className="flex mb-5 w-full justify-end">
                <Button onClick={() => setOpenPDialogue(true)}>Add New Products</Button>
            </div>

            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
                {
                    productList && productList.length > 0 ?
                        productList.map(productItems => <AdminProductTile product={productItems} />) : null
                }

            </div>
            <Sheet open={openPDialogue} onOpenChange={() => setOpenPDialogue(false)}>
                <SheetContent side="right" className="overflow-auto px-5 ">
                    <SheetHeader>
                        <SheetTitle>Add New Products</SheetTitle>
                    </SheetHeader>
                    <div>
                        <ProductImageUpload
                            imageFile={imageFile}
                            setImageFile={setImageFile}
                            uploadedImgUrl={uploadedImgUrl}
                            setUploadedImgUrl={setUploadedImgUrl}
                            setImageLoading={setImageLoading}
                            imageLoading={imageLoading}
                        />
                    </div>
                    <div className="py-6">
                        <Form
                            onSubmit={onSubmit}
                            formControls={addProductFormElements}
                            formData={formData}
                            setFormData={setFormData}
                            buttonText="Add"
                        ></Form>
                    </div>
                </SheetContent>
            </Sheet>
        </Fragment>
    );
};

export default AdminProducts;
