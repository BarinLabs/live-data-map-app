import { Marker, Popup } from "react-leaflet";

const Pin = ({ device }) => {
  return (
    <>
      <Marker
        eventHandlers={{
          click: (e) => {
            console.log("marker clicked", device.token);
          },
        }}
        key={device.token}
        position={[device.location.latitude, device.location.longtitude]}
      >
        <Popup>{device.location.address}</Popup>
      </Marker>
    </>
  );
};

export default Pin;
