const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://sirius.nirah.tech"
const NO_HEADER_FOOTER = [
	"/register",
	"/login"
]
const POSITION_COLLECTION = process.env.REACT_APP_POSITION_COLLECTION || "6183ef8e310fd"
const MAPBOX_TOKEN = "pk.eyJ1IjoibWF0ZmlyZTE5OTkiLCJhIjoiY2t2anA4eGVmMDd0aDMzb3U1M2s0cWp6aSJ9.J6uwIZao8WEhN2An1pi76Q"
export {BASE_URL, NO_HEADER_FOOTER, POSITION_COLLECTION, MAPBOX_TOKEN}