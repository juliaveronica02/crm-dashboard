import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () =>  {
    return (
        <div className="bg-light border-right" id="sidebar-wrapper">
            <div className="sidebar-heading"><a href="/">CRM</a></div>
            <div className="list-group list-group-flush">
                <a href="/dashboard" className="list-group-item list-group-item-action bg-light" >Dashboard</a>
                <a href="#" className="list-group-item list-group-item-action bg-light" >Pipeline</a>
                <a href="#" className="list-group-item list-group-item-action bg-light" >Contacts</a>
                <Link to="/products" className="list-group-item list-group-item-action bg-light" >Products</Link>
                <a href="#" className="list-group-item list-group-item-action bg-light" >Activities</a>
                <a href="#" className="list-group-item list-group-item-action bg-light" >Settings</a>
            </div>
        </div>
    )
}

export default Sidebar