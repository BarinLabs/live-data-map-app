import { Marker } from "react-leaflet";
import { useDispatch } from "react-redux";
import {
  openDevice,
  setError,
} from "../../redux/CurrentDevice/currentDeviceSlice";

const Pin = ({ device }) => {
  const token = device.token;
  const dispatch = useDispatch();

  const onDeviceOpen = () => {
    fetchDeviceData().catch((e) => dispatch(setError()));
  };

  const fetchDeviceData = async () => {
    const res = await fetch("https://see.senstate.cloud/data/" + token);

    if (!res.ok) {
      throw new Error("Something went wrong");
    }

    const deviceData = await res.json();
    dispatch(openDevice({ device: deviceData }));
  };
  return (
    <>
      <Marker
        eventHandlers={{
          click: onDeviceOpen,
        }}
        key={device.token}
        position={[device.location.latitude, device.location.longtitude]}
      />
    </>
  );
};

export default Pin;
