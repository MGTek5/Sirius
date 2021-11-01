import {useEffect} from 'react';
import { Link, useLocation, useHistory } from "react-router-dom"
import { useFormik } from "formik"
import { app } from "../utils/appwrite";
import {BASE_URL} from "../utils/constants"
import toast from "react-hot-toast";
import queryString from 'query-string';
import FormInput from '../components/FormInput';
const Register = () => {
  const location = useLocation ();
  const history = useHistory()
  useEffect (() => {
    const {auth} = queryString.parse (location.search);
    if (auth) {
      toast.error (
        'Something went wrong while trying to authenticate. Please try again'
      );
    }
  });

  const formik = useFormik ({
    initialValues: {
      email: '',
      password: '',
      username: '',
    },
    onSubmit: async values => {
      try {
        await app.account.create (
          values.email,
          values.password,
          values.username
        );
        await app.account.createSession(values.email, values.password);
        toast.success(`Welcome to Sirius, ${values.username}`);
        history.push("/")
      } catch (error) {
        console.log (error);
        toast.error (
          'Something went wrong while creating your account. Please check your credentials...'
        );
      }
    },
  });

  return (
    <main className="flex flex-col justify-center items-center">
      <div className="card lg:card-side bordered">
        <figure>
          <img
            src="https://source.unsplash.com/yZygONrUBe8"
            alt="earth with a satellite"
          />
        </figure>
        <div className="card-body">
          <img src="/icons/icon-512x512.png" className="h-12 w-12 md:h-24 md:w-24 lg:h-32 lg:w-32 self-center mb-2" alt="logo" />
          <h2 className="card-title text-xl font-bold text-center">Welcome to Sirius</h2>
          <p>Sign up using the form below or using another service</p>
          <form className="flex flex-col" onSubmit={formik.handleSubmit}>
            <FormInput
              labelText="Email"
              htmlFor="email"
              inputType="email"
              inputPlaceholder="Email"
              inputName="email"
              inputValue={formik.values.email}
              onInputChange={formik.handleChange}
            />
            <FormInput
              labelText="Username"
              htmlFor="username"
              inputName="username"
              inputPlaceholder="Username"
              inputValue={formik.values.username}
              onInputChange={formik.handleChange}
            />
            <FormInput
              labelText="Password"
              htmlFor="password"
              inputName="password"
              inputPlaceholder="Password"
              inputType="password"
              inputValue={formik.values.password}
              onInputChange={formik.handleChange}
            />
            <button className="btn mt-2" type="submit">
              Submit
            </button>
          </form>
          <h4 className="mb-2 mt-4">Or use an identity provider below</h4>
          <button
            className="btn"
            onClick={() => {
              app.account.createOAuth2Session (
                'google',
                `${BASE_URL}/?auth=success`,
                `${BASE_URL}/register?auth=failure`
              );
            }}
          >
            <svg
              className="h-8 w-auto"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              width="48px"
              height="48px"
              viewBox="0 0 48 48"
            >
              <g transform="translate(0, 0)">
                <path
                  d="M24,11a12.932,12.932,0,0,1,8.346,3.047l6.54-6.228A21.973,21.973,0,0,0,4.293,14.236l7.373,5.683A13.016,13.016,0,0,1,24,11Z"
                  fill="#d94f3d"
                />
                {' '}
                <path
                  d="M11,24a12.942,12.942,0,0,1,.666-4.081L4.293,14.236a21.935,21.935,0,0,0,0,19.528l7.373-5.683A12.942,12.942,0,0,1,11,24Z"
                  fill="#f2c042"
                />
                {' '}
                <path
                  d="M45.1,20h-21v9H36a10.727,10.727,0,0,1-4.555,6.162l7.316,5.64C43.436,36.606,46.183,29.783,45.1,20Z"
                  fill="#5085ed"
                />
                {' '}
                <path
                  d="M31.442,35.162A13.98,13.98,0,0,1,24,37a13.016,13.016,0,0,1-12.334-8.919L4.293,33.764A22.023,22.023,0,0,0,24,46a21.865,21.865,0,0,0,14.758-5.2Z"
                  fill="#57a75c"
                />
              </g>
            </svg>
            Google
          </button>
            <button className="btn mt-2" onClick={() => {
                              app.account.createOAuth2Session (
                'github',
                `${BASE_URL}/?auth=success`,
                `${BASE_URL}/register?auth=failure`
              );
            }}>
            <svg className="h-8 w-auto" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="64px" height="64px" viewBox="0 0 64 64"><g transform="translate(0, 0)"><path fillRule="evenodd" clipRule="evenodd" fill="#444444" d="M32,0.8c-17.7,0-32,14.3-32,32c0,14.1,9.2,26.1,21.9,30.4 c1.6,0.3,2.2-0.7,2.2-1.5c0-0.8,0-2.8,0-5.4c-8.9,1.9-10.8-4.3-10.8-4.3c-1.5-3.7-3.6-4.7-3.6-4.7c-2.9-2,0.2-1.9,0.2-1.9 c3.2,0.2,4.9,3.3,4.9,3.3c2.9,4.9,7.5,3.5,9.3,2.7c0.3-2.1,1.1-3.5,2-4.3c-7.1-0.8-14.6-3.6-14.6-15.8c0-3.5,1.2-6.3,3.3-8.6 c-0.3-0.8-1.4-4.1,0.3-8.5c0,0,2.7-0.9,8.8,3.3c2.6-0.7,5.3-1.1,8-1.1c2.7,0,5.5,0.4,8,1.1c6.1-4.1,8.8-3.3,8.8-3.3 c1.7,4.4,0.6,7.7,0.3,8.5c2.1,2.2,3.3,5.1,3.3,8.6c0,12.3-7.5,15-14.6,15.8c1.1,1,2.2,2.9,2.2,5.9c0,4.3,0,7.7,0,8.8 c0,0.9,0.6,1.9,2.2,1.5C54.8,58.9,64,46.9,64,32.8C64,15.1,49.7,0.8,32,0.8z"></path></g></svg>
                Github
            </button>
          <div className="text-right">
            <Link to="/login">Or sign in</Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;
