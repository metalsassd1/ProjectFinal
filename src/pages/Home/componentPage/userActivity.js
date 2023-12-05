// src/components/UserActivityLogs.js
import React from "react";

const UserActivityLogs = ({ userActivityLogs }) => {
  return (
    <div>
      <h3>User Activity Logs</h3>
      <ul>
        {userActivityLogs.map((log, index) => (
          <li key={index}>{log}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserActivityLogs;
