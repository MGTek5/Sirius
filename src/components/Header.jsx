import {useContext} from 'react';
import {useHistory, useLocation, Link} from 'react-router-dom';
import avatarholder from 'avatarholder';
import userContext from '../context/userContext';
import {NO_HEADER_FOOTER} from '../utils/constants';

const Header = () => {
  const userC = useContext (userContext);
  const history = useHistory ();
  const location = useLocation ();
  if (NO_HEADER_FOOTER.includes (location.pathname)) {
    return null;
  }
  console.log (location);
  return (
    <header className="">
      <div className="navbar mb-2 shadow-lg bg-neutral text-neutral-content">
        <div className="flex-1 px-2 mx-2">
          <span
            className="text-lg font-bold cursor-pointer"
            onClick={() => {
              history.push ('/');
            }}
          >
            Sirius
          </span>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-hover dropdown-end">
            <div tabIndex="0" className="avatar">
              <div className="rounded-full w-10 h-10 m-1">
                <img src={avatarholder.generateAvatar(userC?.user?.name?? "anon", { size: 256 })} alt="profile" />
              </div>
            </div>
            <ul
              tabIndex="0"
              className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/auth/signout">Sign Out</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
