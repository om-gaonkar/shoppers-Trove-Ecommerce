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
import { addProduct, deleteProducts, editProducts, fetchAllProducts } from "@/store/admin/productSlice/index";
import AdminProductTile from "@/components/AdminView/ProductTile";
import { data } from "react-router";
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
    const [currentEditedId, setCurrentEditedId] = useState(null)
    const { productList } = useSelector(state => state.adminProducts)
    const dispatch = useDispatch()

    function onSubmit(e) {
        e.preventDefault()

        currentEditedId !== null ?
            dispatch(editProducts({ id: currentEditedId, formData }))
                .then((data) => {
                    console.log(data, "edit data")
                    if (data?.payload?.success === true) {
                        dispatch(fetchAllProducts())
                        setFormData(initialFormData)
                        setOpenPDialogue(false)
                        setCurrentEditedId(null)
                    }
                }
                ) :

            dispatch(
                addProduct({ ...formData, image: uploadedImgUrl }
                ))
                .then((data) => {
                    console.log(data)
                    if (data?.payload?.success) {
                        setOpenPDialogue(false)
                        dispatch(fetchAllProducts())
                        setImageFile(null)
                        setFormData(initialFormData)
                        alert("data uploaded successfully")
                    }
                })
    }

    function isFormValid() {
        return Object.keys(formData).map(keys => formData[keys] !== '').every((item) => item)
    }

    function handleDelete(currentEditedId) {
        dispatch(deleteProducts(currentEditedId))
            .then(data => {
                if (data?.payload?.success) {
                    dispatch(fetchAllProducts())
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
                        productList.map(productItems =>
                            <AdminProductTile
                                setCurrentEditedId={setCurrentEditedId}
                                setFormData={setFormData}
                                setOpenPDialogue={setOpenPDialogue}
                                product={productItems}
                                handleDelete={handleDelete}
                            />) : null
                }

            </div>
            <Sheet open={openPDialogue} onOpenChange={() => {
                setOpenPDialogue(false)
                setCurrentEditedId(null)
                setFormData(initialFormData)
            }
            }>
                <SheetContent side="right" className="overflow-auto px-5 ">
                    <SheetHeader>
                        <SheetTitle>{currentEditedId !== null ? 'Edit Product' : "Add new Product"}</SheetTitle>
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
                            buttonText={currentEditedId !== null ? 'Edit Product' : "Add"}
                            isButtonDisabled={!isFormValid()}
                        ></Form>
                    </div>
                </SheetContent>
            </Sheet>
        </Fragment>
    );
};

export default AdminProducts;
