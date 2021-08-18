import { Marker } from "react-leaflet";
import * as L from "leaflet";
import { useDispatch, useSelector, useStore } from "react-redux";
import {
  openDevice,
  setError,
} from "../../redux/CurrentDevice/currentDeviceSlice";

import styles from "./pin.module.scss";

const Pin = ({ device }) => {
  const currDeviceURL = useSelector(
    (state) => state.currentDevice.device.deviceURL
  );

  const dispatch = useDispatch();
  const { token, dataEndpoint, indexes, location } = device;

  let { deviceURL: deviceURLTemplate, channelDataURL: channelDataURLTemplate } =
    dataEndpoint;
  const deviceURL = deviceURLTemplate.replace("{Token}", token);
  const channelDataURL = channelDataURLTemplate.replace("{Token}", token);

  const onDeviceOpen = () => {
    if (currDeviceURL !== deviceURL) {
      fetchDeviceData().catch((e) => dispatch(setError()));
    }
  };

  const fetchDeviceData = async () => {
    const res = await fetch(deviceURL);

    if (!res.ok) {
      throw new Error("Something went wrong");
    }

    const deviceData = await res.json();
    const { data: categories } = deviceData;
    delete deviceData.data;

    dispatch(
      openDevice({
        device: {
          deviceURL,
          channelDataURLTemplate: channelDataURL,
          location: { ...location },
          categories,
          ...deviceData,
        },
      })
    );
  };

  let iconClasses = styles.divIcon + " ";
  const commonAirQualityIndex = indexes.find((index) => index.slug === "caqi");
  if (commonAirQualityIndex) {
    const { indexLevel } = commonAirQualityIndex;
    iconClasses += styles[`indexLevel${indexLevel}`];
  }

  const icon = new L.divIcon({
    iconSize: [15, 15],
    className: iconClasses,
  });

  return (
    <>
      <Marker
        icon={icon}
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
