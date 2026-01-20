import Form from "@/components/Common/Form"
import { useState } from "react"
import { registerFormControls } from '@/Config/userRegisterForm'
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { registerUser } from "@/store/auth-slice/authSlice"

const initialState = {
    userName: '',
    email: '',
    password: ''
}


const Register = () => {

    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    console.log(formData)
    const onsubmit = (event) => {
        event.preventDefault()
        dispatch(registerUser(formData)).then((data) => {
            if (data?.payload?.success) {
                console.log(data?.payload?.message)
                navigate("/auth/login")
            } else {
                console.log(data?.payload?.message)
            }
            console.log(data);
        })

    }

    return (
        <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Sign Up</h1>
                <p className="mt-2">Already have an account</p>
                <a className='font-medium text-primary ml-2 hover:underline' href='/auth/login'>Login</a>

            </div>
            <Form
                formControls={registerFormControls}
                buttonText={'Sign UP'}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onsubmit} />
        </div>
    )
}

export default Register