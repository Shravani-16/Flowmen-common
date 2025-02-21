import { Alert } from "@mui/material";
import React from "react";

const Notification = ({ notifications, setNotifications }) => {
  const handleClose = (id) => {
    setNotifications([]);
  };

  const markAsRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <div style={{ zIndex: 1051 }}>
      <div
        className="position-fixed top-0 end-0 p-3"
        style={{
          zIndex: 1050,
          background:
            "linear-gradient(to right, rgb(211 216 229), rgb(238 226 177))",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          marginTop: "71px",
          width: "22%",
          borderRadius: "5px",
        }}
      >
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <Alert
              key={notification.id}
              onClose={() => handleClose(notification.id)}
              severity={
                notification?.message === "Machine Down" ? "error" : "success"
              }
              style={{ margin: "0px 0px 4px 1px" }}
            >
              <div>{notification?.message}</div>
              {
                notification?.duration && (
                  <div style={{ fontSize: "12px", marginTop: "4px" }}>
                    Duration: {notification?.duration}
                  </div>
                )}
              {notification.date && (
                <div style={{ fontSize: "12px", marginTop: "4px" }}>
                  Date: {notification?.date}
                </div>
              )}
              <button
                onClick={() => markAsRead(notification.id)}
                style={{
                  marginTop: "8px",
                  fontSize: "10px",
                  color: "blue",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Mark as read
              </button>
            </Alert>
          ))
        ) : (
          <Alert><p>No Notifications</p></Alert>
        )}
      </div>
    </div>
  );
};

export default Notification;
