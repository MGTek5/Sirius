const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://sirius.nirah.tech"
const NO_HEADER_FOOTER = [
	"/register",
	"/login"
]
export {BASE_URL, NO_HEADER_FOOTER}