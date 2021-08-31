import { Circle, LayerGroup, useMap } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import {
  openDevice,
  setError,
} from "../../redux/CurrentDevice/currentDeviceSlice";

import styles from "./pin.module.scss";
import { useMemo } from "react";

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

  const getPinParams = (zoomLevel) => {
    console.log("zoom level", zoomLevel);
    let size = 0;
    let translateValue = 0;
    if (zoomLevel <= 6) {
      size = 10;
      translateValue = 1;
    } else if (zoomLevel <= 9) {
      size = 15;
      translateValue = -1;
    } else if (zoomLevel <= 11) {
      size = 25;
      translateValue = -6;
    } else if (zoomLevel <= 14) {
      size = 34;
      translateValue = -11;
    } else if (zoomLevel <= 16) {
      size = 64;
      translateValue = -26;
    } else if (zoomLevel === 17) {
      size = 104;
      translateValue = -46;
    } else {
      translateValue = -230;
      if (zoomLevel === 18) {
        const metersPerPx =
          (156543.03392 * Math.cos((latitude * Math.PI) / 180)) /
          Math.pow(2, zoomLevel);

        size = metersPerPx * radius * 2;
      }
    }

    return { size, translateValue };
  };

  const map = useMap();

  let pinColor = "#979997";
  if (indexes.length > 0) {
    let index = indexes.find((index) => index.slug === "sbaqi");
    if (!index) {
      index = indexes[0];
    }

    const { value } = index;

    pinColor = getPinColor(value);
  }

  // const customIcon = new L.divIcon({
  //   html: `
  //         <svg width="100%" height="100%" position="absolute" viewBox="0 10 54 70" fill="none" xmlns="http://www.w3.org/2000/svg">
  //         <circle cx="26" cy="27" r="21" fill="red" />
  //         <path fill-rule="evenodd" clip-rule="evenodd" d="M0 26.9121C0 12.0735 12.1107 0 27 0C41.8869 0 54 12.0735 54 26.9121C54 31.8109 51.4271 36.3118 46.16 45.5259C45.002 47.5515 43.7138 49.805 42.2941 52.3408C36.7237 62.29 31.2445 70.5874 31.0131 70.9356L27 77L22.9868 70.9356L22.9723 70.9135C22.5867 70.3284 17.1894 62.1372 11.7058 52.3408C10.2873 49.8076 9.00009 47.5561 7.84287 45.5319C2.57382 36.3156 0 31.8136 0 26.9121ZM26.8255 44.2562C16.6064 44.2562 8.32514 36.0002 8.32514 25.8161C8.32514 15.632 16.61 7.37605 26.8255 7.37605C37.0409 7.37605 45.3258 15.632 45.3258 25.8161C45.3258 36.0002 37.0409 44.2562 26.8255 44.2562Z" fill="#16123F"/>
  //        </svg>`,
  //   className: styles["div-icon"],
  // });

  const layerKey = useMemo(() => {
    return Math.random().toString();
  }, [openedDeviceToken]);

  return (
    <div key={layerKey}>
      <LayerGroup>
        <Circle
          center={[latitude, longtitude]}
          pathOptions={{ fillColor: `${pinColor}`, fillOpacity: 0.2 }}
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
          pathOptions={{
            color: "#16123F",
            fillColor: `${pinColor}`,
            fillOpacity: 1,
          }}
          radius={0.2 * radius}
          stroke={openedDeviceToken === token}
          eventHandlers={{
            click: onDeviceOpen,
          }}
        />
      </LayerGroup>

      {/* <Marker
        className={styles["marker"]}
        icon={icon}
        eventHandlers={{
          click: onDeviceOpen,
        }}
        key={device.token}
        position={[latitude, longtitude]}
      /> */}
    </div>
  );
};

export default Pin;
