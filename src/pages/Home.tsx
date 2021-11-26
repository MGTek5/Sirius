import mapbox from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { app, ISSPosition } from "../utils/appwrite";
import { MAPBOX_TOKEN, POSITION_COLLECTION } from "../utils/constants";
import { useHistory } from "react-router";
import LoadingScreen from "../components/LoadingScreen";

const Home = () => {
  mapbox.accessToken = MAPBOX_TOKEN;
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapbox.Map>();
  const marker = useRef<HTMLDivElement>(null);
  const history = useHistory();
  const IssPosition = useRef<mapbox.Marker>(
    new mapbox.Marker()
  );
  const [currentIss, setCurrentIss] = useState<ISSPosition>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initMapAndPositions = async () => {
      if (map.current) return;
      if (mapContainer.current !== null && IssPosition.current !== null && marker.current !== null) {
        map.current = new mapbox.Map({
          container: mapContainer.current,
          center: { lat: 46.56667, lon: 3.33333 },
          zoom: 2,
          style: "mapbox://styles/mapbox/dark-v10",
        });
          IssPosition.current = new mapbox.Marker(marker.current);
          const lastPosition = await app.database.listDocuments<ISSPosition>(POSITION_COLLECTION, [], 1, 0, "timestamp", "DESC");
          IssPosition.current
            .setLngLat({
              lat: lastPosition.documents[0]["latitude"],
              lon: lastPosition.documents[0]["longitude"],
            })
            .addTo(map.current);
          setCurrentIss(lastPosition.documents[0]);
          map.current.setCenter({
            lat: lastPosition.documents[0]["latitude"],
            lon: lastPosition.documents[0]["longitude"],
          });
          setLoading(false);
      }
    };
    initMapAndPositions();
  });

  useEffect(() => {
    const unsub = app.subscribe(
      `collections.${POSITION_COLLECTION}.documents`,
      onDocumentsUpdate
    );

    return unsub;
  });

  const onDocumentsUpdate = (payload: { event: string; payload: ISSPosition; }) => {
    if (payload.event === "database.documents.create") {
      IssPosition.current.setLngLat({
        lon: payload.payload.longitude,
        lat: payload.payload.latitude,
      });
      map.current?.setCenter({
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
          history.push(`/details/${currentIss?.timestamp}`);
        }}
      ></div>
      <div className="h-full w-full" ref={mapContainer} />
    </div>
  );
};

export default Home;
