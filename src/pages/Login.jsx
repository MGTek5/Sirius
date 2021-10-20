import { signInEmailPassword, signInWithGoogle } from "../utils/firebase";
import { Link } from "react-router-dom"
import { useFormik } from "formik"

import Google from "../icons/Google";
import Button from "../components/Button";
const Login = () => {

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: (values) => {
            signInEmailPassword(values.email, values.password)
        }
    })

    return (
        <main className="flex flex-col justify-center items-center dark:bg-gray-900">
            <div className="bg-gray-200 dark:bg-gray-700 p-4 rounded-md shadow-lg h-96 flex flex-col justify-evenly">
                <div className="mb-2">
                    <h2 className="text-center text-xl font-semibold">Welcome to Sirius</h2>
                    <p>Sign in using the form below or using another service</p>
                </div>
                <div>
                    <form className="flex flex-col" onSubmit={formik.handleSubmit}>
                        <label>Email</label>
                        <input onChange={formik.handleChange} name="email" value={formik.values.email} type="email" />
                        <label>Password</label>
                        <input onChange={formik.handleChange} name="password" value={formik.values.password} type="password" />
                        <Button type="submit" bg="bg-blue-400" hoverBg="bg-blue-500" text="submit" />
                    </form>
                </div>
                <Button bg="bg-red-400" hoverBg="bg-red-500" text="Google" onClick={signInWithGoogle} icon={<Google className="h-8 w-auto" />} />
                <div className="text-right">
                    <Link to="/register">Or create an account</Link>
                </div>
            </div>
        </main>
    )
}

export default Login;
