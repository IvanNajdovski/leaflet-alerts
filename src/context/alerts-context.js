import { useState, useCallback, useMemo, createContext, useContext } from "react";

// Create Context Object
export const AlertsContext = createContext([]);

export function useAlerts() {
  const context = useContext(AlertsContext);
  if (!context) throw new Error("AlertsContext must be used with in AlertsProvider");
  return context;
}

export const AlertsContextProvider = (props) => {
  const [alerts, setAlerts] = useState(JSON.parse(localStorage.getItem("alerts")) || []);

  const addAlert = useCallback(
    (alert) => {
      const newAlerts = [...alerts, alert];
      localStorage.setItem("alerts", JSON.stringify(newAlerts));

      setAlerts(newAlerts);
    },
    [alerts]
  );

  const editAlert = useCallback(
    (alert) => {
      const newAlerts = alerts.map((val) => (val.id === alert.id ? alert : val));
      localStorage.setItem("alerts", JSON.stringify(newAlerts));
      setAlerts(newAlerts);
    },
    [alerts]
  );

  const deleteAlert = useCallback(
    (alertId) => {
      const newAlerts = alerts.filter((val) => val.id !== alertId);
      localStorage.setItem("alerts", JSON.stringify(newAlerts));

      setAlerts(newAlerts);
    },
    [alerts]
  );

  const store = useMemo(() => ({ alerts, addAlert, editAlert, deleteAlert }), [alerts]);

  return <AlertsContext.Provider value={store}>{props.children}</AlertsContext.Provider>;
};
