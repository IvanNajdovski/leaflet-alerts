import React from "react";
import { PointInputSet } from "./PointInputSet/PointInputSet";

export const InputsArea = ({ pointArea, modeRadius, onChangeHandler }) => {
  return (
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
          onChange={onChangeHandler}
          value={pointArea.numOfPoints}
          name={"numOfPoints"}
          className="form-control"
          placeholder="Enter Number of Points"
          required={!modeRadius}
          step={"any"}
        />
      </div>
      {pointArea.locations.map((val, index) => (
        <PointInputSet key={index} onChange={(e) => onChangeHandler(e, index)} value={val} index={index} />
      ))}
    </fieldset>
  );
};
