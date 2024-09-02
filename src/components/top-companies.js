import React from 'react';

const TopCompanies = () => {
  const companies = [
    { name: 'Gravy Face', amount: '$246M', status: 'Turnover' },
    { name: 'Joe Mann', amount: '$140M', status: 'Turnover' },
    { name: 'Door Matic', amount: '$120M', status: 'Turnover' },
    { name: 'Groove Mojo', amount: '$110M', status: 'Turnover' },
  ];

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">Top Companies</h5>
        <ul className="list-group">
          {companies.map((company, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              {company.name}
              <span className="badge badge-primary badge-pill">{company.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TopCompanies;