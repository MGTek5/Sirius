import {useContext} from 'react';
import userContext from '../context/userContext';
import Button from './Button';

const Header = () => {
  const userC = useContext (userContext);

  return (
    <header className="">
      <div className="navbar mb-2 shadow-lg bg-neutral text-neutral-content">
        <div className="flex-1 px-2 mx-2">
          <span className="text-lg font-bold">
            Sirius
          </span>
        </div>
        <div className="flex-none">
          <div className="avatar">
            <div className="rounded-full w-10 h-10 m-1">
              <img src="https://i.pravatar.cc/500?img=32" alt="profile" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
