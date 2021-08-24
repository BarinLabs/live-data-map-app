import { Marker, useMap, useMapEvent } from "react-leaflet";
import * as L from "leaflet";
import { useDispatch, useSelector } from "react-redux";
import {
  openDevice,
  setError,
} from "../../redux/CurrentDevice/currentDeviceSlice";

import styles from "./pin.module.scss";
import { useState } from "react";

const getPinSize = (zoomLevel) => {
  let size = 0;
  if (zoomLevel <= 6) {
    size = 10;
  } else if (zoomLevel <= 9) {
    size = 15;
  } else if (zoomLevel <= 11) {
    size = 25;
  } else if (zoomLevel <= 14) {
    size = 34;
  } else if (zoomLevel <= 16) {
    size = 64;
  } else {
    size = 94;
  }

  return size;
};

const getPinColor = (indexValue) => {
  let color = "";
  if (indexValue <= 50) {
    color = "#8FDF53";
  } else if (indexValue <= 75) {
    color = "#EFBB11";
  } else {
    color = "#E7222E";
  }

  return color;
};

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
          token,
          deviceURL,
          channelDataURLTemplate: channelDataURL,
          location: { ...location },
          categories,
          ...deviceData,
        },
      })
    );
  };

  const map = useMap();
  const [size, setSize] = useState(() => getPinSize(map.getZoom()));

  const mapEvents = useMapEvent({
    zoom: () => {
      const currZoomLevel = map.getZoom();
      const currSize = getPinSize(currZoomLevel);
      setSize(currSize);
    },
  });

  let pinColor = "#979997";
  if (indexes.length > 0) {
    let index = indexes.find((index) => index.slug === "sbaqi");
    if (!index) {
      index = indexes[0];
    }

    const { value } = index;

    pinColor = getPinColor(value);
  }

  const icon = new L.divIcon({
    html: `
      <svg width="${size}" height="${size}" viewBox="0 0 94 94" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="47" cy="47" r="47" fill=${pinColor} fill-opacity="0.2"/>
      <svg width="94" height="94" viewBox="-5 -10 80 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="35" cy="35" r="35" fill=${pinColor} fill-opacity="0.4"/>
        <svg width="58" height="58" viewBox="-12 -11 58 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="23" cy="23" r="23" fill=${pinColor} fill-opacity="0.7"/>
          <svg width="34" height="35" viewBox="-14 -11 35 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="9.5" fill=${pinColor} stroke="#767676"/>
          </svg>
        </svg>
      </svg>
    </svg>`,
    className: styles.divIcon,
  });

  return (
    <>
      <Marker
        className={styles["marker"]}
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
