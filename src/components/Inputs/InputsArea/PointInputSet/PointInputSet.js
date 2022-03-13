import React from "react";

export const PointInputSet = ({ value, onChange }) => {
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
            step={"any"}
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
            step={"any"}
          />
        </div>
      </div>
    </div>
  );
};
