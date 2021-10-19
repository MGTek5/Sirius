import { createContext } from "react";

const userContext = createContext({
    user: {},
    logout: () => { },
    setUser: (u) => { }
})

export default userContext