// import React from "react";

// const Navbar = () => {
//     return (
//         <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
//             <button className="btn btn-primary" id="menu-toggle">Online Member</button>
//             <div className="collapse navbar-collapse" id="navbarSupportedContent">
//                 <ul className="navbar-nav ms-auto">
//                     <li className="nav-item">
//                         <a className="nav-link" href="/notifications">Notification</a>
//                     </li>
//                     <li className="nav-item">
//                         <a className="nav-link" href="/profile">Profile</a>
//                     </li>
//                     <li className="nav-item">
//                         <a className="nav-link" href="/logout">Logout</a>
//                     </li>
//                 </ul>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;

import React, { useState,useEffect } from "react";
import axios from "axios";
import usersData from '../data/users.json';

const Navbar = () => {
    const [users, setUsers] = useState(usersData);
    const [onlineMembers, setOnlineMembers] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [userDeviceInfo, setUserDeviceInfo] = useState({});

    useEffect(() => {
        axios.get('https://api.ipify.org?format=json')
            .then(response => {
                const ipAddress = response.data.ip;
                const deviceInfo = {
                    ip: ipAddress,
                    browser: navigator.userAgent,
                    platform: navigator.platform,
                };
                setUserDeviceInfo(deviceInfo);
            })
            .catch(error => console.error('Error fetching IP address:', error));
    }, []);

    const handleUserSignIn = (userId) => {
        setUsers(prevUsers =>
            prevUsers.map(user =>
                user.id === userId && !user.online ? { ...user, online: true } : user
            )
        );
        setOnlineMembers(prevCount => prevCount + 1);
    };

    const handleUserSignOut = (userId) => {
        setUsers(prevUsers =>
            prevUsers.map(user =>
                user.id === userId && user.online ? { ...user, online: false } : user
            )
        );
        setOnlineMembers(prevCount => prevCount - 1);
    };

    const toggleModal = () => setShowModal(!showModal);

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                <button className="btn btn-primary" style={{marginLeft: "1rem"}} onClick={toggleModal}>
                    {onlineMembers} Online Member{onlineMembers !== 1 ? 's' : ''}
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/notifications">Notification</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/profile">Profile</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/logout">Logout</a>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Modal */}
            {showModal && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header bg-primary text-white">
                                <h5 className="modal-title">
                                    <i className="bi bi-people-fill"></i> Online Members
                                </h5>
                                <button type="button" className="btn-close" onClick={toggleModal}></button>
                            </div>
                            <div className="modal-body">
                                <table className="table table-hover">
                                    <thead className="table-light">
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">IP Address</th>
                                            <th scope="col">Device</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map(user => (
                                            <tr key={user.id}>
                                                <th scope="row">{user.id}</th>
                                                <td>{user.name}</td>
                                                <td>
                                                    <span className={`badge ${user.online ? 'bg-success' : 'bg-secondary'}`}>
                                                        {user.online ? 'Online' : 'Offline'}
                                                    </span>
                                                </td>
                                                <td>{userDeviceInfo.ip}</td>
                                                <td>{userDeviceInfo.platform} - {userDeviceInfo.browser}</td>
                                                <td>
                                                    {!user.online ? (
                                                        <button className="btn btn-success btn-sm" onClick={() => handleUserSignIn(user.id)}>
                                                            <i className="bi bi-box-arrow-in-right"></i> Sign In
                                                        </button>
                                                    ) : (
                                                        <button className="btn btn-danger btn-sm" onClick={() => handleUserSignOut(user.id)}>
                                                            <i className="bi bi-box-arrow-right"></i> Sign Out
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={toggleModal}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;