import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Outlet, Link, useRoutes, useParams, useNavigate } from "react-router-dom";
import { useAlerts } from "../../context/alerts-context.js";

const PointInputSet = ({ value, onChange }) => {
  return (
    <div className="row">
      <div className="col-6">
        <div className="mb-3">
          <label htmlFor="pointLat1" className="form-label">
            Point Latitude
          </label>
          <input
            required
            type="number"
            min={-90}
            max={90}
            id="pointLat1"
            name={"latitude"}
            onChange={onChange}
            value={value[0]}
            className="form-control"
          />
        </div>
      </div>
      <div className="col-6">
        <div className="mb-3">
          <label htmlFor="pointLong1" className="form-label">
            Point Longitude
          </label>
          <input
            required
            type="number"
            min={-180}
            max={180}
            id="pointLong1"
            name={"longitude"}
            onChange={onChange}
            value={value[1]}
            className="form-control"
          />
        </div>
      </div>
    </div>
  );
};
const initialRadiusArea = {
  radius: "",
  latitude: "",
  longitude: "",
};
const initialPointArea = {
  numOfPoints: "",
  locations: [],
};
const Alert = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { alerts, addAlert, editAlert } = useAlerts();
  const [modeRadius, setModeRadius] = useState(true);
  const [radiusArea, setRadiusArea] = useState(initialRadiusArea);
  const [pointArea, setPointArea] = useState(initialPointArea);

  useEffect(() => {
    if (params.id) {
      const alert = alerts.find((val) => val.id === params.id);
      if (!alert) {
        navigate("/");
      } else {
        if (alert.type === "radius") {
          setModeRadius(true);
          setRadiusArea({ radius: alert.radius, latitude: alert.point[0], longitude: alert.point[1] });
        } else {
          setModeRadius(false);
          setPointArea({ numOfPoints: alert.points.length, locations: alert.points });
        }
      }
    }
  }, [params.id]);

  const onModeChangeHandler = () => {
    if (modeRadius) {
      setRadiusArea(initialRadiusArea);
    } else {
      setPointArea(initialPointArea);
    }
    setModeRadius((prevData) => !prevData);
  };

  const onRadiusChangeArea = (e) => {
    const { name, value } = e.target;
    setRadiusArea((prevData) => ({ ...prevData, [name]: value }));
  };

  const onPointChangeArea = (e, index) => {
    const { name, value } = e.target;
    if (name === "numOfPoints") {
      if (parseInt(value) > 8) {
        alert("Number of points must be lower then 8");
        return;
      }
      if (!pointArea.locations.length) {
        setPointArea((prevData) => ({ ...prevData, [name]: value, locations: new Array(parseInt(value)).fill(["", ""]).map((val) => [...val]) }));
      } else if (pointArea.locations.length < parseInt(value)) {
        const locations = new Array(parseInt(value))
          .fill([])
          .map((val, index) => (pointArea.locations.length >= index + 1 ? pointArea.locations[index] : val));
        setPointArea((prevData) => ({ ...prevData, [name]: value, locations }));
      } else if (pointArea.locations.length > parseInt(value)) {
        pointArea.locations.length = value;
        setPointArea((prevData) => ({ ...prevData, [name]: value }));
      }
    } else if (name === "latitude") {
      setPointArea((prevData) => {
        prevData.locations[index][0] = value;
        return { ...prevData };
      });
    } else if (name === "longitude") {
      setPointArea((prevData) => {
        prevData.locations[index][1] = value;
        return { ...prevData };
      });
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const id = params.id || uuidv4();
    let newAlert;
    if (modeRadius) {
      newAlert = { id, type: "radius", radius: radiusArea.radius, point: [radiusArea.latitude, radiusArea.longitude] };
    } else {
      newAlert = { id, type: "polygon", points: pointArea.locations };
    }
    if (params.id) {
      editAlert(newAlert);
      navigate("/map");
    } else {
      addAlert(newAlert);
    }
    setRadiusArea(initialRadiusArea);
    setPointArea(initialPointArea);
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="form-check form-switch d-flex justify-content-center">
        <input checked={modeRadius} onChange={onModeChangeHandler} className="form-check-input" type="checkbox" id="radiusAreaTrue" />
        <label className="form-check-label ms-2" htmlFor="radiusAreaTrue">
          Enter Radius area
        </label>
      </div>
      <div className="row">
        <div className="col-6">
          <fieldset disabled={!modeRadius}>
            <legend>Select Point</legend>
            <div className="mb-3">
              <label htmlFor="radiusLat" className="form-label">
                Radius Latitude
              </label>
              <input
                type="number"
                id="radiusLat"
                onChange={onRadiusChangeArea}
                value={radiusArea.latitude}
                name={"latitude"}
                className="form-control"
                required={modeRadius}
                min={-90}
                max={180}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="radiusLong" className="form-label">
                Radius Longitude
              </label>
              <input
                type="number"
                id="radiusLong"
                onChange={onRadiusChangeArea}
                value={radiusArea.longitude}
                name={"longitude"}
                className="form-control"
                required={modeRadius}
                min={-180}
                max={180}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="radius" className="form-label">
                Radius
              </label>
              <input
                type="number"
                id="radius"
                onChange={onRadiusChangeArea}
                value={radiusArea.radius}
                name="radius"
                className="form-control"
                required={modeRadius}
              />
            </div>
          </fieldset>
        </div>
        <div className="col-6">
          <fieldset disabled={modeRadius}>
            <legend>Select Area</legend>
            <div className="mb-3">
              <label htmlFor="numberOfPoints" className="form-label">
                Number Of Points
              </label>
              <input
                type="number"
                min={1}
                max={8}
                id="numberOfPoints"
                onChange={onPointChangeArea}
                value={pointArea.numOfPoints}
                name={"numOfPoints"}
                className="form-control"
                placeholder="Enter Number of Points"
                required={!modeRadius}
              />
            </div>
            {pointArea.locations.map((val, index) => (
              <PointInputSet key={index} onChange={(e) => onPointChangeArea(e, index)} value={val} index={index} />
            ))}
          </fieldset>
        </div>
      </div>
      <div className="row ">
        <div className="col-4 d-flex mx-auto justify-content-center">
          <button type="submit" className="w-100 btn btn-primary">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default Alert;
