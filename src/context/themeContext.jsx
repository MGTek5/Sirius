import { createContext } from "react";

const themeContext = createContext({
    theme: "",
    changeTheme: () => { }
})

export default themeContext