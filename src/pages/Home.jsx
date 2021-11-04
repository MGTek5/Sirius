import mapbox from "mapbox-gl"
import { useEffect, useRef, useState } from "react"
import { BallTriangle  } from 'svg-loaders-react'
import 'mapbox-gl/dist/mapbox-gl.css';
import {app} from "../utils/appwrite"
import { POSITION_COLLECTION } from "../utils/constants";
import { useHistory } from "react-router";

const Home = () => {
	mapbox.accessToken = "pk.eyJ1IjoibWF0ZmlyZTE5OTkiLCJhIjoiY2t2anA4eGVmMDd0aDMzb3U1M2s0cWp6aSJ9.J6uwIZao8WEhN2An1pi76Q"
	const mapContainer = useRef(null);
	const map = useRef()
	const marker = useRef()
	const history = useHistory()
	const IssPosition = useRef(new mapbox.Marker(
		{onclick: () => {
			history.push(`/details/${currentIss.timestamp}`)
		}}
	))
	const [currentIss, setCurrentIss] = useState()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		if (map.current) return;
		map.current = new mapbox.Map({
			container: mapContainer.current,
			center: { lat: "46.56667", lon: "3.33333" },
			zoom: 2,
			style: 'mapbox://styles/mapbox/dark-v10',


		})
		IssPosition.current = new mapbox.Marker(marker.current)
		app.database.listDocuments(POSITION_COLLECTION, [], 1, 0, "timestamp", "DESC").then((value) => {
			IssPosition.current.setLngLat({lat:value.documents[0]["latitude"], lon:value.documents[0]["longitude"]}).addTo(map.current)
			setCurrentIss(value.documents[0])
			map.current.setCenter({lat:value.documents[0]["latitude"], lon:value.documents[0]["longitude"]})
			setLoading(false)
		})
	})

	useEffect(() => {
		const unsub = app.subscribe(`collections.${POSITION_COLLECTION}.documents`, onDocumentsUpdate)
		return unsub;
	})

	const onDocumentsUpdate = (payload) => {
		if (payload.event === "database.documents.create") {
			IssPosition.current.setLngLat({lon:payload.payload.longitude, lat:payload.payload.latitude})
			map.current.setCenter({lon:payload.payload.longitude, lat:payload.payload.latitude})
			setCurrentIss(payload.payload)
		}
	}

	return (
		<main>
{ loading &&			<div className="w-screen h-screen bg-black flex flex-col justify-center items-center absolute top-0 right-0 z-50">

				<h1>Fetching latest data, please wait...</h1>
				<BallTriangle  />
			</div>}
			<div ref={marker} className="h-12 w-12 bg-cover" style={{backgroundImage:"url('/assets/satellite.png')"}}  onClick={() => {
							history.push(`/details/${currentIss.timestamp}`)

			}}></div>
			<div className="h-full w-full" ref={mapContainer} />
		</main>
	)
}

export default Home;