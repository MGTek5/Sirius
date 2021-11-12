import {useFormik} from 'formik';
import {useContext, useRef, useEffect} from 'react';
import mapbox from "mapbox-gl";
import toast from 'react-hot-toast';
import FormInput from '../components/FormInput';
import userContext from '../context/userContext';
import {USER_POSITION_COLLECTION, MAPBOX_TOKEN} from '../utils/constants';
import {app} from '../utils/appwrite';
import {getPositionForCity} from '../utils/api';

const TrackMe = () => {
	mapbox.accessToken = MAPBOX_TOKEN;
  const formik = useFormik ({
    initialValues: {
      city: '',
    },
    onSubmit: async values => {
      try {
        console.log (values);
        const position = await getPositionForCity (values.city);
        await app.database.createDocument (
          USER_POSITION_COLLECTION,
          {
            user: userC.user['$id'],
            latitude: position.lat,
            longitude: position.lon,
          },
          ['role:member'],
          ['role:member']
        );
		positionMap(position)
      } catch (error) {
        toast.error ('Something went wrong while getting coordinates for city');
      }
    },
  });
  const userC = useContext (userContext);
  const mapContainer = useRef(null);
  const map = useRef();

  const positionMap = (position) => {
	map.current.flyTo({
		center: { lat: position.lat, lon: position.lon }
	})
  }

  useEffect(() => {
    if (map.current) return;
    map.current = new mapbox.Map({
      container: mapContainer.current,
      center: { lat: "46.56667", lon: "3.33333" },
      zoom: 9,
      style: "mapbox://styles/mapbox/dark-v10",
    });
  });

  return (
    <div className="w-full h-full flex flex-col lg:flex-row flex-wrap">
      <div className="w-full lg:w-2/3">
        <div className="h-full w-full" ref={mapContainer}>
		</div>
      </div>
      <div className="mt-0 lg:mt-5 lg:flex lg:items-center h-full">
        <div className="card lg:card-side bordered">
          <div className="card-body">
            <h2 className="card-title">Track a Position</h2>
            <p>
              do you want to be notified when the ISS is near you ?
            </p>
            <button
              className="btn btn-primary"
              onClick={() => {
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition (
                    async data => {
                      await app.database.createDocument (
                        USER_POSITION_COLLECTION,
                        {
                          user: userC.user['$id'],
                          latitude: data.coords.latitude,
                          longitude: data.coords.longitude,
                        },
                        ['role:member'],
                        ['role:member']
                      );
					  positionMap({lat:data.coords.latitude, lon:data.coords.longitude})
                    },
                    () => {
                      toast.error (
                        'Something went wrong while getting position. You need to enable it for this to work'
                      );
                    }
                  );
                } else {
                  toast.error (
                    'Looks like this device does not support geolocation. Please try another device or use the form below'
                  );
                }
              }}
            >
              Track Me
            </button>
            <p className="mt-8">
              Or enter a city below and we'll do our best to figure out where it is
            </p>
            <form onSubmit={formik.handleSubmit}>
              <FormInput
                inputName="city"
                labelText="City"
                inputPlaceholder="Enter a city name"
                onInputChange={formik.handleChange}
                inputValue={formik.values.city}
                htmlFor="city"
              />
              <button type="submit" className="btn btn-secondary btn-block">
                Track City
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackMe;
