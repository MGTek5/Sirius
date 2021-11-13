import axios from "axios"

const getPositionForCity = async(city) => {
	const res = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=9d9ab4467244bce9a0a31fcbeb8ecb4c`)
	if (res.data[0]) {
		return {
			lat:res.data[0].lat,
			lon:res.data[0].lon
		}
	}
	throw Error("Could not find city")
}

export {getPositionForCity}