
import Form from "@/components/Common/Form"
import { useState } from "react"
import { loginFormControls } from '@/Config/userLoginForm'
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { loginUser } from "@/store/auth-slice/authSlice"

const initialState = {
    email: '',
    password: ''
}


const Login = () => {
    const [formData, setFormData] = useState(initialState)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    console.log(formData)
    const onsubmit = (event) => {
        event.preventDefault()
        console.log("LOGIN SUBMITTED");

        dispatch(loginUser(formData)).then((data) => {
            if (data?.payload?.success) {
                console.log(data?.payload?.message)
                // navigate("/")
            } else {
                console.log(data?.payload?.message)
            }
            console.log(data);
        })

    }

    return (
        <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Login</h1>
                <p className="mt-2">Dont have an account</p>
                <a className='font-medium text-primary ml-2 hover:underline' href='/auth/register'>Register</a>

            </div>
            <Form
                formControls={loginFormControls}
                buttonText={'Login'}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onsubmit} />
        </div>
    )
}

export default Login