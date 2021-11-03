import mapbox from "mapbox-gl"
import { useEffect, useRef } from "react"
import 'mapbox-gl/dist/mapbox-gl.css';

mapbox.accessToken = "pk.eyJ1IjoibWF0ZmlyZTE5OTkiLCJhIjoiY2t2anA4eGVmMDd0aDMzb3U1M2s0cWp6aSJ9.J6uwIZao8WEhN2An1pi76Q"

const Home = () => {
	const mapContainer = useRef(null);
	const map = useRef()

	useEffect(() => {
		if (map.current) return;
		map.current = new mapbox.Map({
			container: mapContainer.current,
			center: { lat: "46.56667", lon: "3.33333" },
			zoom: 9,
			style: 'mapbox://styles/mapbox/dark-v10',


		})
	})


	return (
		<main>
			<div ref={mapContainer} className="h-full w-full" />
		</main>
	)
}

export default Home;