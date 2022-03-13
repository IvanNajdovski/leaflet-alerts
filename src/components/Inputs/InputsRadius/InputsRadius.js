import React from "react";

export const InputsRadius = ({ modeRadius, radiusArea, onChangeHandler }) => {
  return (
    <fieldset disabled={!modeRadius}>
      <legend>Select Point</legend>
      <div className="mb-3">
        <label htmlFor="radiusLat" className="form-label">
          Latitude
        </label>
        <input
          id="radiusLat"
          className="form-control"
          type="number"
          name={"latitude"}
          onChange={onChangeHandler}
          value={radiusArea.latitude}
          min={-90}
          max={180}
          step={"any"}
          required={modeRadius}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="radiusLong" className="form-label">
          Longitude
        </label>
        <input
          id="radiusLong"
          className="form-control"
          type="number"
          name={"longitude"}
          onChange={onChangeHandler}
          value={radiusArea.longitude}
          min={-180}
          max={180}
          step={"any"}
          required={modeRadius}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="radius" className="form-label">
          Radius in meter
        </label>
        <input
          id="radius"
          className="form-control"
          type="number"
          name="radius"
          onChange={onChangeHandler}
          value={radiusArea.radius}
          step={"any"}
          required={modeRadius}
        />
      </div>
    </fieldset>
  );
};
