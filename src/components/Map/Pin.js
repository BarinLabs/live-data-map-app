import { Circle, LayerGroup, Polygon } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { openDevice } from "../../redux/CurrentDevice/currentDeviceSlice";
import { isDataRecent } from "../../utils/utils";

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

const updateDeviceIndexMinutes = 10;
const markOfflineTreshold = 3;
const recentDataLimitMinutes = updateDeviceIndexMinutes * markOfflineTreshold;

const Pin = ({ device }) => {
  const openedDeviceToken = useSelector(
    (state) => state.currentDevice.device.token
  );

  const dispatch = useDispatch();
  const { token, indexes, location } = device;

  const { latitude, longtitude, radius } = location;

  const onDeviceOpen = () => {
    if (openedDeviceToken !== token) {
      dispatch(openDevice({ device }));
    }
  };

  let pinColor = "#979997";
  let isOnline = true;
  if (indexes.length > 0) {
    let index = indexes.find((index) => index.slug === "sbaqi");
    if (!index) {
      index = indexes[0];
    }

    const { value, timeStamp } = index;

    const isCurrDataRecent = isDataRecent(timeStamp, recentDataLimitMinutes);

    if (isCurrDataRecent) {
      pinColor = getPinColor(value);
    } else {
      isOnline = false;
    }
  }

  const polygon1 = [
    [
      [latitude - 0.0015, longtitude],
      [latitude - 0.0015, longtitude],
      [latitude - 0.00088, longtitude - 0.0009],
      [latitude - 0.0009, longtitude + 0.0009],
    ],
  ];

  const polygon2 = [
    [
      [latitude - 0.0025, longtitude],
      [latitude - 0.0014, longtitude - 0.0001],
      [latitude - 0.0003, longtitude + 0.00126],
    ],
  ];

  const polygon3 = [
    [
      [latitude - 0.0025, longtitude],
      [latitude - 0.0014, longtitude - 0.00012],
      [latitude - 0.0003, longtitude - 0.00126],
    ],
  ];

  const isDeviceOpen = openedDeviceToken === token;
  const onlinePin = (
    <>
      <Circle
        center={[latitude, longtitude]}
        pathOptions={{
          fillColor: pinColor,
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
        pathOptions={{ fillColor: pinColor, fillOpacity: 0.4 }}
        radius={0.8 * radius}
        stroke={false}
        eventHandlers={{
          click: onDeviceOpen,
        }}
      />
      <Circle
        center={[latitude, longtitude]}
        pathOptions={{ fillColor: pinColor, fillOpacity: 0.6 }}
        radius={0.6 * radius}
        stroke={false}
        eventHandlers={{
          click: onDeviceOpen,
        }}
      />
      <Circle
        center={[latitude, longtitude]}
        pathOptions={{
          color: isDeviceOpen ? "#16123F" : pinColor,
          fillColor: isDeviceOpen ? "#16123F" : pinColor,
          fillOpacity: 1,
        }}
        radius={0.4 * radius}
        stroke={true}
        eventHandlers={{
          click: onDeviceOpen,
        }}
      />
      <Circle
        center={[latitude, longtitude]}
        pathOptions={{
          fillColor: pinColor,
          fillOpacity: 1,
        }}
        radius={0.3 * radius}
        stroke={false}
        eventHandlers={{
          click: onDeviceOpen,
        }}
      />
    </>
  );

  const offlinePin = (
    <>
      <Circle
        center={[latitude, longtitude]}
        pathOptions={{
          color: "#16123F",
          fillColor: "#16123F",
          fillOpacity: 1,
        }}
        radius={0.4 * radius}
        stroke={true}
        eventHandlers={{
          click: onDeviceOpen,
        }}
      />
      <Circle
        center={[latitude, longtitude]}
        pathOptions={{
          fillColor: "#16123F",
          fillOpacity: 1,
        }}
        radius={0.3 * radius}
        stroke={false}
        eventHandlers={{
          click: onDeviceOpen,
        }}
      />
    </>
  );

  return (
    <div>
      <LayerGroup>
        {isOnline ? onlinePin : offlinePin}
        {isDeviceOpen && (
          <>
            <Polygon
              positions={polygon1}
              pathOptions={{
                fillOpacity: "1",
                color: "#16123F",
                fillColor: "#16123F",
              }}
            />
            <Polygon
              positions={polygon2}
              pathOptions={{
                fillOpacity: "1",
                color: "#16123F",
                fillColor: "#16123F",
              }}
            />
            <Polygon
              positions={polygon3}
              pathOptions={{
                fillOpacity: "1",
                color: "#16123F",
                fillColor: "#16123F",
              }}
            />
          </>
        )}
      </LayerGroup>
    </div>
  );
};

export default Pin;
