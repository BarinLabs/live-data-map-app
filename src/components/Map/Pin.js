import { Marker } from "react-leaflet";
import { useDispatch } from "react-redux";
import {
  openDevice,
  setError,
} from "../../redux/CurrentDevice/currentDeviceSlice";

const Pin = ({ device }) => {
  const dispatch = useDispatch();
  const { token, dataEndpoint } = device;
  let { deviceURL: deviceURLTemplate, channelDataURL: channelDataURLTemplate } =
    dataEndpoint;
  const deviceURL = deviceURLTemplate.replace("{Token}", token);
  const channelDataURL = channelDataURLTemplate.replace("{Token}", token);

  const onDeviceOpen = () => {
    fetchDeviceData().catch((e) => dispatch(setError()));
  };

  const fetchDeviceData = async () => {
    const res = await fetch(deviceURL);

    if (!res.ok) {
      throw new Error("Something went wrong");
    }

    const deviceData = await res.json();
    dispatch(
      openDevice({
        device: {
          deviceURL,
          channelDataURLTemplate: channelDataURL,
          ...deviceData,
        },
      })
    );
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
