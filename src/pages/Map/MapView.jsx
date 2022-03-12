import React, { useContext } from "react";
import { MapContainer, TileLayer, Marker, Pane, Rectangle, Circle, Polygon } from "react-leaflet";
import { AlertsContext } from "../../context/alerts-context";
import "leaflet/dist/leaflet.css";

const position = [51.505, -0.09];
const MapView = (props) => {
  const { alerts } = useContext(AlertsContext);

  return (
    <MapContainer center={position} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {alerts &&
        alerts.length &&
        alerts.map((alert, index) =>
          alert.type === "radius" ? (
            <Circle key={index} center={alert.point} fillColor="red" radius={alert.radius} />
          ) : (
            <Polygon key={index} positions={alert.points} color="blue" />
          )
        )}
    </MapContainer>
  );
};

export default MapView;
