import React, { useState, useEffect } from "react";
import usersData from "../data/users.json";
import Modal from "../components/modal";
import UserTable from "../components/table-user";
import { fetchUserDeviceInfo } from "../utils/info-users";

const Navbar = () => {
  const [users, setUsers] = useState(usersData);
  const [onlineMembers, setOnlineMembers] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [userDeviceInfo, setUserDeviceInfo] = useState({});

  useEffect(() => {
    const fetchInfo = async () => {
      const deviceInfo = await fetchUserDeviceInfo();
      setUserDeviceInfo(deviceInfo);
    };

    fetchInfo();
  }, []);

  const handleUserSignIn = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId && !user.online ? { ...user, online: true } : user
      )
    );
    setOnlineMembers((prevCount) => prevCount + 1);
  };

  const handleUserSignOut = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId && user.online ? { ...user, online: false } : user
      )
    );
    setOnlineMembers((prevCount) => prevCount - 1);
  };

  const toggleModal = () => setShowModal(!showModal);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <button className="btn btn-primary" style={{ marginLeft: '1rem' }} onClick={toggleModal}>
          {onlineMembers} Online Member{onlineMembers !== 1 ? "s" : ""}
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="/notifications">
                Notification
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/profile">
                Profile
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/logout">
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Modal */}
      <Modal show={showModal} handleClose={toggleModal} title="Online Members">
        <UserTable 
          users={users} 
          userDeviceInfo={userDeviceInfo} 
          handleUserSignIn={handleUserSignIn} 
          handleUserSignOut={handleUserSignOut} 
        />
      </Modal>
    </>
  );
};

export default Navbar;