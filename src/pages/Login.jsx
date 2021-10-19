import { signInWithGoogle } from "../utils/firebase";

const Login = () => {
    return (
        <main className="flex flex-col justify-center items-center">
            <div className="bg-gray-200 p-4 rounded-md shadow-lg h-96 flex flex-col justify-evenly">
                <div className="mb-2">
                    <h3 className="text-center text-xl font-semibold">Welcome to Sirius</h3>
                    <p>Sign in using the form below or using another service</p>
                </div>
                <div>
                    <form className="flex flex-col">
                        <label>Email</label>
                        <input type="email" />
                        <label>Password</label>
                        <input type="password" />
                    </form>
                </div>
                <button
                    className="bg-red-500 px-4 py-2 rounded-xl"
                    onClick={signInWithGoogle}>Google</button>
            </div>
        </main>
    )
}

export default Login;