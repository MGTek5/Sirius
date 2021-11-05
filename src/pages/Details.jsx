import mapbox from "mapbox-gl";
import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import { app } from "../utils/appwrite";
import { MAPBOX_TOKEN, POSITION_COLLECTION } from "../utils/constants";

const Details = () => {
  const { timestamp } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const mapContainer = useRef(null);
  const map = useRef();
  const marker = useRef();
  const IssPosition = useRef(new mapbox.Marker());
  mapbox.accessToken = MAPBOX_TOKEN;

  useEffect(() => {
    if (map.current) return;
    map.current = new mapbox.Map({
      container: mapContainer.current,
      center: { lat: "46.56667", lon: "3.33333" },
      zoom: 4,
      style: "mapbox://styles/mapbox/dark-v10",
    });
  });

  useEffect(() => {
    app.database
      .listDocuments(POSITION_COLLECTION, [`timestamp=${timestamp}`], 1)
      .then((value) => {
        const res = value.documents[0];
        setData({ ...res, onboard: JSON.parse(res.onboard) });
        IssPosition.current = new mapbox.Marker(marker.current);
        map.current.setCenter({ lat: res.latitude, lon: res.longitude });
        IssPosition.current
          .setLngLat({ lat: res.latitude, lon: res.longitude })
          .addTo(map.current);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error(
          "Could not get data, something must have gone terribly wrong"
        );
        setLoading(false);
      });
  }, [timestamp]);

  return (
    <div className="w-full h-full flex flex-col md:flex-row">
      {loading && (
        <LoadingScreen text="Fetching data for selected time, please wait..." />
      )}
      <div className="w-full md:w-2/3 h-96 md:h-full">
        <div
          ref={marker}
          className="h-12 w-12 bg-cover"
          style={{ backgroundImage: "url('/assets/satellite.png')" }}
        ></div>
        <div className="h-full w-full" ref={mapContainer} />
      </div>
      <div className="flex flex-col justify-evenly">
        <div className="text-center">
          <h1 className="font-bold text-xl">
            {new Date(timestamp * 1000).toLocaleString()}
          </h1>
          <span>
            {data?.latitude} Lat, {data?.longitude} Lon
          </span>
        </div>
        <div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {data?.onboard.map((e) => (
              <div
                className="flex flex-col items-center mx-2 my-2 text-center"
                key={e.name}
              >
                <div className="avatar">
                  <div className="mb-4 rounded-full w-24 h-24">
                    <img src={app.avatars.getInitials(e.name)} alt={e.name} />
                  </div>
                </div>
                <span>{e.name}</span>
                <span>Onboard the</span>
                <span>{e.craft}</span>
              </div>
            ))}
          </div>
          <div className="w-full px-4">
            <button
              disabled={!navigator.share}
              className={`btn btn-primary btn-block ${
                !navigator.share && "btn-disabled"
              }`}
              onClick={() => {
                navigator
                  .share({
                    title: "Sirius",
                    text: "The ISS was right here!",
                    url: `https://sirius.nirah.tech/details/${timestamp}`,
                  })
                  .then(() => {
                    toast.success("Shared!");
                  })
                  .catch(() => {
                    toast.error("Something went wrong while trying to share");
                  });
              }}
            >
              Share this page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
