import React, { useContext } from "react";
import { AlertsContext } from "../../context/alerts-context";
import { useNavigate } from "react-router-dom";
const Alerts = (props) => {
  const navigate = useNavigate();
  const { alerts, deleteAlert } = useContext(AlertsContext);

  const onEditHandler = (id) => navigate("/" + id);
  return (
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Points</th>
          <th scope="col">Radius</th>
          <th scope="col">Type</th>
          <th scope="col">Edit</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        {alerts &&
          alerts.length &&
          alerts.map((alert) => (
            <tr>
              <th scope="row">{alert.id}</th>
              <td>{alert.point ? alert.point.join(", ") : alert.points.flat().join(", ")}</td>
              <td>{alert.radius}</td>
              <td>{alert.type}</td>
              <td>
                <i class="bi bi-pencil" onClick={onEditHandler.bind(null, alert.id)}></i>
              </td>
              <td>
                <i class="bi bi-trash" onClick={deleteAlert.bind(null, alert.id)}></i>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Alerts;
