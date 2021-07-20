import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import styles from "./styles.module.css";

const Map = ({ devices }) => {
  const markers = devices.map((device) => {
    return (
      <Marker
        key={device.token}
        position={[device.location.latitude, device.location.longtitude]}
      >
        <Popup>{device.location.address}</Popup>
      </Marker>
    );
  });

  return (
    <div className={styles.container}>
      <MapContainer
        className={styles.mapContainer}
        center={[42.753, 25.291]}
        zoom={8}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers}
      </MapContainer>
    </div>
  );
};

export default Map;
