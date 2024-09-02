import React from "react";

const Dashboard = ({title, value, icon, color }) => {
    return (
        <div className="col-md-3">
            <div className={`card text-white bg-${color} mb-3`} style={{maxWidth: '18rem'}}>
                <div className="card-header">{title}</div>
                <div className="card-body">
                    <h5 className="card-title">{value}</h5>
                    <p className="card-text">
                        <i className={`fa ${icon}`}/>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Dashboard