import { createContext } from "react";
import { Models } from "appwrite";

interface UserContextInterface {
  user: Models.User<Models.Preferences> | undefined;
  setUser: (_u: Models.User<Models.Preferences>) => void;
  askForPermission: () => void;
  logout: () => void;
}

const userContext = createContext({} as UserContextInterface)


export default userContext;
