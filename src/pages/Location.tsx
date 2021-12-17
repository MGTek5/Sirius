import mapbox from "mapbox-gl";
import { useParams } from "react-router-dom";
import userContext from "../context/userContext";
import { useContext, useState, useEffect, useRef, } from "react";
import { app, UserPosition } from "../utils/appwrite";
import { useHistory } from "react-router";
import LoadingScreen from "../components/LoadingScreen";
import toast from "react-hot-toast";
import {
    MAPBOX_TOKEN,
    USER_POSITION_COLLECTION
} from "../utils/constants";

const Location = () => {
    const { idlocation } = useParams<{ idlocation: string }>();
    const history = useHistory();
    const map = useRef<mapbox.Map>();
    const userC = useContext(userContext);
    const [position, setPosition] = useState<UserPosition | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const mapContainer = useRef<HTMLDivElement>(null);
    mapbox.accessToken = MAPBOX_TOKEN;

    useEffect(() => {
        const Positions = async () => {
            try {
                const res = await app.database.getDocument<UserPosition>(USER_POSITION_COLLECTION, idlocation)
                setPosition(res);
                console.log(res);
                console.log(userC.user);
                setLoading(false);
            } catch (error) {
                console.error(error);
                toast.error(
                    "Error position"
                );
                setLoading(false);
            }
        }
        if (userC.user && !position) Positions()
    })

    useEffect(() => {
        const getPositions = () => {
                if (map.current !== undefined && position) {
                    new mapbox.Marker().setLngLat({ lat: position.latitude, lon: position.longitude }).addTo(map.current);
                    map.current?.setCenter({
                        lon: position.longitude,
                        lat: position.latitude,
                    });
                }
        }
        if (userC.user) getPositions()
    }, [userC, map, position])

    useEffect(() => {
        if (map.current) return;
        if (mapContainer.current !== null) {
            map.current = new mapbox.Map({
                container: mapContainer.current,
                center: { lat: 46.56667, lon: 3.33333 },
                zoom: 4,
                style: "mapbox://styles/mapbox/dark-v10",
            });
        }
    });

    return (
        <div className="w-full h-full flex flex-col md:flex-row">
            {loading && (
                <LoadingScreen text="Fetching data for selected time, please wait..." />
            )}
            <div className="w-full md:w-2/3 h-96 md:h-full">
                <div className="h-full w-full" ref={mapContainer} />
            </div>
            <div className="flex flex-col justify-evenly">
                <div className="text-center">
                    <div className="w-full px-4">
                        <button
                            onClick={
                                async () => {
                                    await app.database.deleteDocument(USER_POSITION_COLLECTION, idlocation);
                                    history.push('/');
                                    toast.success("Delete position");
                                }}
                            className={`btn btn-primary btn-block`}
                            disabled={userC.user?.$id !== position?.user}
                        >
                            Delete Position
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Location;
