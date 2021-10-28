import { Link, useLocation, useHistory } from "react-router-dom"
import { useFormik } from "formik"
import Google from "../icons/Google";
import Button from "../components/Button";
import { app } from "../utils/appwrite";
import {BASE_URL} from "../utils/constants"
import toast from "react-hot-toast";
import queryString from 'query-string';
import { useEffect } from "react";

const Login = () => {
	const location = useLocation()
	const history = useHistory()
	useEffect(() => {
		const {auth} = queryString.parse(location.search)
		if (auth) {
			toast.error("Something went wrong while trying to authenticate. Please try again")
		}
	})

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: async (values) => {
            try {
                await app.account.createSession(values.email, values.password, values.username)
				toast.success("Welcome Back!")
				history.push("/")
            } catch (error) {
                console.log(error)
                toast.error("Something went wrong while signing into your account. Please check your credentials...")
            }
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
                        <label htmlFor="email">Email</label>
                        <input onChange={formik.handleChange} name="email" value={formik.values.email} type="email" />
                        <label htmlFor="password">Password</label>
                        <input onChange={formik.handleChange} name="password" value={formik.values.password} type="password" />

                        <Button type="submit" bg="bg-blue-400" hoverBg="bg-blue-500" text="submit" />
                    </form>
                </div>
                <Button bg="bg-red-400" hoverBg="bg-red-500" text="Google" onClick={() => {
                    app.account.createOAuth2Session("google", `${BASE_URL}/?auth=success`, `${BASE_URL}/register?auth=failure`)
                }} icon={<Google className="h-8 w-auto" />} />
                <div className="text-right">
                    <Link to="/register">Or create an account</Link>
                </div>
            </div>
        </main>
    )
}

export default Login