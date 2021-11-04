const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://sirius.nirah.tech"
const NO_HEADER_FOOTER = [
	"/register",
	"/login"
]
const POSITION_COLLECTION = process.env.REACT_APP_POSITION_COLLECTION || "6183ef8e310fd"
export {BASE_URL, NO_HEADER_FOOTER, POSITION_COLLECTION}