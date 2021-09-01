import { Circle, LayerGroup, Polygon } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import {
  openDevice,
  setError,
} from "../../redux/CurrentDevice/currentDeviceSlice";

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
  const dataSource = device.dataSource;

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
          dataSource,
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

  const polygon1 = [
    [
      [latitude - 0.0015, longtitude],
      [latitude - 0.0015, longtitude],
      [latitude - 0.0009, longtitude - 0.0009],
      [latitude - 0.0009, longtitude + 0.0009],
    ],
  ];

  const polygon2 = [
    [
      [latitude - 0.0025, longtitude],
      [latitude - 0.0014, longtitude - 0.0001],
      [latitude - 0.0003, longtitude + 0.00128],
    ],
  ];

  const polygon3 = [
    [
      [latitude - 0.0025, longtitude],
      [latitude - 0.0014, longtitude - 0.00012],
      [latitude - 0.0003, longtitude - 0.00127],
    ],
  ];

  const isDeviceOpen = openedDeviceToken === token;

  return (
    <div>
      <LayerGroup>
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
