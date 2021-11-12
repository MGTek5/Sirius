import mapbox from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { app } from "../utils/appwrite";
import { MAPBOX_TOKEN, POSITION_COLLECTION } from "../utils/constants";
import { useHistory } from "react-router";
import LoadingScreen from "../components/LoadingScreen";

const Home = () => {
  mapbox.accessToken = MAPBOX_TOKEN;
  const mapContainer = useRef(null);
  const map = useRef();
  const marker = useRef();
  const history = useHistory();
  const IssPosition = useRef(
    new mapbox.Marker({
      onclick: () => {
        history.push(`/details/${currentIss.timestamp}`);
      },
    })
  );
  const [currentIss, setCurrentIss] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapbox.Map({
      container: mapContainer.current,
      center: { lat: "46.56667", lon: "3.33333" },
      zoom: 2,
      style: "mapbox://styles/mapbox/dark-v10",
    });
    IssPosition.current = new mapbox.Marker(marker.current);
    app.database
      .listDocuments(POSITION_COLLECTION, [], 1, 0, "timestamp", "DESC")
      .then((value) => {
        IssPosition.current
          .setLngLat({
            lat: value.documents[0]["latitude"],
            lon: value.documents[0]["longitude"],
          })
          .addTo(map.current);
        setCurrentIss(value.documents[0]);
        map.current.setCenter({
          lat: value.documents[0]["latitude"],
          lon: value.documents[0]["longitude"],
        });
        setLoading(false);
      });
  });

  useEffect(() => {
    const unsub = app.subscribe(
      `collections.${POSITION_COLLECTION}.documents`,
      onDocumentsUpdate
    );

    return unsub;
  });

  const onDocumentsUpdate = (payload) => {
    if (payload.event === "database.documents.create") {
      IssPosition.current.setLngLat({
        lon: payload.payload.longitude,
        lat: payload.payload.latitude,
      });
      map.current.setCenter({
        lon: payload.payload.longitude,
        lat: payload.payload.latitude,
      });
      setCurrentIss(payload.payload);
    }
  };

  return (
    <div className="h-full w-full">
      {loading && <LoadingScreen text="Fetching latest data, please wait..." />}

      <div
        ref={marker}
        className="h-12 w-12 bg-cover cursor-pointer"
        style={{ backgroundImage: "url('/assets/satellite.png')" }}
        onClick={() => {
          history.push(`/details/${currentIss.timestamp}`);
        }}
      ></div>
      <div className="h-full w-full" ref={mapContainer} />
    </div>
  );
};

export default Home;
