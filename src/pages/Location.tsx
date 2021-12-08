import mapbox from "mapbox-gl";
import { useEffect, useRef } from "react";
import { MAPBOX_TOKEN } from "../utils/constants";

const Location = () => {
    const map = useRef<mapbox.Map>();
    const marker = useRef<HTMLDivElement>(null);
    const mapContainer = useRef<HTMLDivElement>(null);
    mapbox.accessToken = MAPBOX_TOKEN;

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
            <div className="w-full md:w-2/3 h-96 md:h-full">
                <div
                    ref={marker}
                    className="h-12 w-12 bg-cover"
                ></div>
                <div className="h-full w-full" ref={mapContainer} />
            </div>
            <div className="flex flex-col justify-evenly">
            </div>
        </div>
    );
};

export default Location;