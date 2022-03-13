import React, { useContext } from "react";
import { MapContainer, TileLayer, Marker, Circle, Polygon } from "react-leaflet";
import { AlertsContext } from "../../context/alerts-context";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const position = [51.505, -0.09];
const newicon = new L.icon({
  iconUrl: require("../../assets/css/images/marker-icon-2x.png"),
  iconSize: [10, 15],
});
const Map = ({ radiusStroke = "blue", radiusFill = "red", areaStroke = "blue", areaFill = "red" }) => {
  const { alerts } = useContext(AlertsContext);

  return (
    <MapContainer center={position} zoom={4}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {alerts &&
        alerts.length &&
        alerts.map((alert, index) =>
          alert.type === "radius" ? (
            <Marker position={alert.point} icon={newicon}>
              <Circle key={index} center={alert.point} radius={alert.radius} fillColor={radiusFill} color={radiusStroke} />
            </Marker>
          ) : (
            <Polygon key={index} positions={alert.points} fillColor={areaFill} color={areaStroke} />
          )
        )}
    </MapContainer>
  );
};

export default Map;
