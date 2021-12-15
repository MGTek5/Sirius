import { useContext } from "react";
import { useHistory, useLocation, Link } from "react-router-dom";
import userContext from "../context/userContext";
import { useHasInternet } from "../context/hasInternetContext";
import { NO_HEADER_FOOTER } from "../utils/constants";
import { app } from "../utils/appwrite";

const Header = () => {
  const userC = useContext(userContext);
  const hasInternet = useHasInternet();
  const history = useHistory();
  const location = useLocation();
  if (NO_HEADER_FOOTER.includes(location.pathname)) {
    return null;
  }
  return (
    <header className="">
      {!hasInternet && (
        <div className="alert alert-error">
          <div className="flex-1 justify-between items-center">
            <label>
              You appear to be offline. The page will reload when you are back
              online.
            </label>
            <button onClick={() => window.location.reload()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 36 36"
                className="w-6 h-6 mx-2 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 9h-7v-7h1v5.2c1.853-4.237 6.083-7.2 11-7.2 6.623 0 12 5.377 12 12s-5.377 12-12 12c-6.286 0-11.45-4.844-11.959-11h1.004c.506 5.603 5.221 10 10.955 10 6.071 0 11-4.929 11-11s-4.929-11-11-11c-4.66 0-8.647 2.904-10.249 7h5.249v1z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      )}
      <div className="navbar shadow-lg bg-neutral text-neutral-content">
        <div className="flex-1 px-2 mx-2">
          <span
            className="text-lg font-bold cursor-pointer"
            onClick={() => {
              history.push("/");
            }}
          >
            Sirius
          </span>
        </div>
        <div className="flex-none">
          {userC.user ? (
            <div className="dropdown dropdown-hover dropdown-end">
              <div tabIndex={0} className="avatar">
                <div className="rounded-full w-10 h-10 m-1">
                  <img
                    src={app.avatars
                      .getInitials(userC?.user?.name ?? "anon")
                      .toString()}
                    alt="profile"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/track">Track Me</Link>
                </li>
                <li>
                  <Link to="/auth/signout">Sign Out</Link>
                </li>
              </ul>
            </div>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => history.push("/login")}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
