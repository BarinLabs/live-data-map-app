import { Circle, LayerGroup, Marker, useMap, useMapEvent } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import {
  openDevice,
  setError,
} from "../../redux/CurrentDevice/currentDeviceSlice";
import * as L from "leaflet";

import styles from "./pin.module.scss";
import { useState } from "react";

const getPinColor = (indexValue) => {
  let color = "";
  if (indexValue <= 25) {
    color = "#79BC6A";
  } else if (indexValue <= 50) {
    color = "#BBCF4C";
  } else if (indexValue <= 75) {
    color = "#EEC20B";
  } else if (indexValue <= 100) {
    color = "#F29305";
  } else {
    color = "#E8416F";
  }

  return color;
};

const pinParams = {
  18: {
    width: 328,
    height: 511,
    translateX: -157,
    translateY: -191,
  },
  17: {
    width: 328,
    height: 511,
    translateX: -154,
    translateY: -191,
  },
  16: { width: 167, height: 270, translateX: -77, translateY: -103 },
  15: { width: 81, height: 129, translateX: -34, translateY: -43 },
  14: { width: 39, height: 67, translateX: -14, translateY: -21 },
  13: { width: 19, height: 36, translateX: -4, translateY: -10 },
  12: { width: 11, height: 20, translateX: 1, translateY: -3 },
  11: { width: 6, height: 9, translateX: 2, translateY: -2 },
  10: { width: 6, height: 9, translateX: 3, translateY: -1 },
  9: { width: 6, height: 9, translateX: 3, translateY: -1 },
  8: { width: 6, height: 9, translateX: 3, translateY: -1 },
  7: { width: 4, height: 9, translateX: 4, translateY: -2 },
  6: { width: 3, height: 9, translateX: 4, translateY: -2 },
  5: { width: 2, height: 2, translateX: 5, translateY: -5 },
  4: { width: 0, height: 0, translateX: 0, translateY: 0 },
  3: { width: 0, height: 0, translateX: 0, translateY: 0 },
  2: { width: 0, height: 0, translateX: 0, translateY: 0 },
  1: { width: 0, height: 0, translateX: 0, translateY: 0 },
};

const Pin = ({ device }) => {
  const openedDeviceToken = useSelector(
    (state) => state.currentDevice.device.token
  );

  const dispatch = useDispatch();
  const { token, dataEndpoint, indexes, location } = device;

  const { latitude, longtitude, radius } = location;

  let { deviceURL: deviceURLTemplate, channelDataURL: channelDataURLTemplate } =
    dataEndpoint;
  const deviceURL = deviceURLTemplate.replace("{Token}", token);
  const channelDataURL = channelDataURLTemplate.replace("{Token}", token);

  const onDeviceOpen = () => {
    if (openedDeviceToken !== token) {
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
          location,
          categories,
          ...deviceData,
        },
      })
    );
  };

  let pinColor = "#979997";
  if (indexes.length > 0) {
    let index = indexes.find((index) => index.slug === "sbaqi");
    if (!index) {
      index = indexes[0];
    }

    const { value } = index;

    pinColor = getPinColor(value);
  }

  const map = useMap();
  const [zoomLevel, setZoomLevel] = useState(map.getZoom());

  const mapEvents = useMapEvent({
    zoom: () => {
      const currZoomLevel = map.getZoom();
      console.log(currZoomLevel);
      setZoomLevel(currZoomLevel);
    },
  });

  const { width, height, translateX, translateY } = pinParams[zoomLevel];

  const selectedPinIcon = new L.divIcon({
    html: `
          <svg width=${width} height=${height}  transform="translate(${translateX}, ${translateY})" viewBox="0 0 54 70" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M0 26.9121C0 12.0735 12.1107 0 27 0C41.8869 0 54 12.0735 54 26.9121C54 31.8109 51.4271 36.3118 46.16 45.5259C45.002 47.5515 43.7138 49.805 42.2941 52.3408C36.7237 62.29 31.2445 70.5874 31.0131 70.9356L27 77L22.9868 70.9356L22.9723 70.9135C22.5867 70.3284 17.1894 62.1372 11.7058 52.3408C10.2873 49.8076 9.00009 47.5561 7.84287 45.5319C2.57382 36.3156 0 31.8136 0 26.9121ZM26.8255 44.2562C16.6064 44.2562 8.32514 36.0002 8.32514 25.8161C8.32514 15.632 16.61 7.37605 26.8255 7.37605C37.0409 7.37605 45.3258 15.632 45.3258 25.8161C45.3258 36.0002 37.0409 44.2562 26.8255 44.2562Z" fill="#16123F"/>
         </svg>`,
    className: styles["div-icon"],
  });

  return (
    <div>
      <LayerGroup>
        <Circle
          center={[latitude, longtitude]}
          pathOptions={{
            fillColor: `${pinColor}`,
            fillOpacity: 0.2,
          }}
          radius={radius}
          stroke={false}
          eventHandlers={{
            click: onDeviceOpen,
          }}
        />
        <Circle
          center={[latitude, longtitude]}
          pathOptions={{ fillColor: `${pinColor}`, fillOpacity: 0.4 }}
          radius={0.8 * radius}
          stroke={false}
          eventHandlers={{
            click: onDeviceOpen,
          }}
        />
        <Circle
          center={[latitude, longtitude]}
          pathOptions={{ fillColor: `${pinColor}`, fillOpacity: 0.6 }}
          radius={0.6 * radius}
          stroke={false}
          eventHandlers={{
            click: onDeviceOpen,
          }}
        />
        <Circle
          center={[latitude, longtitude]}
          pathOptions={{ fillColor: `${pinColor}`, fillOpacity: 0.8 }}
          radius={0.4 * radius}
          stroke={false}
          eventHandlers={{
            click: onDeviceOpen,
          }}
        />
        <Circle
          center={[latitude, longtitude]}
          pathOptions={{ fillColor: `${pinColor}`, fillOpacity: 1 }}
          radius={0.2 * radius}
          stroke={false}
          eventHandlers={{
            click: onDeviceOpen,
          }}
        />
        {openedDeviceToken === token && (
          <Marker
            className={styles["marker"]}
            icon={selectedPinIcon}
            eventHandlers={{
              click: onDeviceOpen,
            }}
            key={device.token}
            position={[latitude, longtitude]}
          />
        )}
      </LayerGroup>
    </div>
  );
};

export default Pin;
