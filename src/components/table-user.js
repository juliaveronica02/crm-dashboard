import React from "react";

const UserTable = ({ users, userDeviceInfo, handleUserSignIn, handleUserSignOut }) => {
  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead className="table-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Status</th>
            <th scope="col">IP Address</th>
            <th scope="col">Device</th>
            <th scope="col">Time Detected</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <th scope="row">{user.id}</th>
              <td>{user.name}</td>
              <td>
                <span
                  className={`badge ${
                    user.online ? "bg-success" : "bg-secondary"
                  }`}
                >
                  {user.online ? "Online" : "Offline"}
                </span>
              </td>
              <td>{userDeviceInfo.ip}</td>
              <td>
                {userDeviceInfo.platform} - {userDeviceInfo.browser}
              </td>
              <td>{userDeviceInfo.time}</td>
              <td>
                {!user.online ? (
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleUserSignIn(user.id)}
                  >
                    <i className="bi bi-box-arrow-in-right"></i> Sign In
                  </button>
                ) : (
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleUserSignOut(user.id)}
                  >
                    <i className="bi bi-box-arrow-right"></i> Sign Out
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;