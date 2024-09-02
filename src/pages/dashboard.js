import React from "react";
import DashboardCard from '../components/card-dashboard';
import PipelineChart from '../components/chart-pipeline';
import TopCompanies from '../components/top-companies';
import '../style/general.css'

const Dashboard = () => {
    return (
        <div className="container-fluid">
          <div className="row mt-4">
            <DashboardCard title="New Contacts" value="425" icon="fa-address-book" color="primary" />
            <DashboardCard title="Calls Complete" value="280" icon="fa-phone" color="success" />
            <DashboardCard title="Pipeline Won" value="22" icon="fa-chart-line" color="danger" />
            <DashboardCard title="Tasks Closed" value="11" icon="fa-tasks" color="warning" />
          </div>
          <div className="row">
            <div className="col-lg-8">
              <PipelineChart />
            </div>
            <div className="col-lg-4">
              <TopCompanies />
            </div>
          </div>
        </div>
    )
}

export default Dashboard