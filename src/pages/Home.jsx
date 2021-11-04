import mapbox from "mapbox-gl"
import { useEffect, useRef } from "react"
import 'mapbox-gl/dist/mapbox-gl.css';
import {app} from "../utils/appwrite"
import { POSITION_COLLECTION } from "../utils/constants";

mapbox.accessToken = "pk.eyJ1IjoibWF0ZmlyZTE5OTkiLCJhIjoiY2t2anA4eGVmMDd0aDMzb3U1M2s0cWp6aSJ9.J6uwIZao8WEhN2An1pi76Q"



const Home = () => {
	const mapContainer = useRef(null);
	const map = useRef()
	const IssPosition = useRef(new mapbox.Marker())

	useEffect(() => {
		if (map.current) return;
		map.current = new mapbox.Map({
			container: mapContainer.current,
			center: { lat: "46.56667", lon: "3.33333" },
			zoom: 9,
			style: 'mapbox://styles/mapbox/dark-v10',


		})
		IssPosition.current.setLngLat({lat: 46.56667, lon: 3.33333}).addTo(map.current)
	})

	useEffect(() => {
		const unsub = app.subscribe(`collections.${POSITION_COLLECTION}.documents`, onDocumentsUpdate)
		return unsub;
	})

	const onDocumentsUpdate = (payload) => {
		console.log(payload)
		if (payload.event === "database.documents.create") {
		}
	}

	return (
		<main>
			<div className="h-full w-full" ref={mapContainer} />
		</main>
	)
}

export default Home;