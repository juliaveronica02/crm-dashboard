import React, { useState, useEffect } from 'react';
import SalesCalculator from '../components/calculator-sales';
import Filters from '../components/filter';
import ReportGenerator  from '../components/report-generator';
import { getStartOfWeek, getStartOfMonth } from '../utils/date';
import salesData from '../data/sales.json';
import Modal from '../components/modal';

function Accounting() {
    const [filteredData, setFilteredData] = useState([]);
    const [filter, setFilter] = useState('today');
    const [showExportModal, setShowExportModal] = useState(false);

    useEffect(() => {
        const now = new Date();
        let startDate;

        switch (filter) {
            case 'week':
                startDate = getStartOfWeek(now);
                break;
            case 'month':
                startDate = getStartOfMonth(now);
                break;
            case 'today':
            default:
                startDate = now.toISOString().split('T')[0];
        }

        setFilteredData(salesData.filter(data => data.date >= startDate));
    }, [filter]);

    const handleExportConfirm = () => {
        ReportGenerator()
        setShowExportModal(false);
    };

    return (
        <div className="container mt-4">
            <h2>Accounting Module</h2>
            <Filters onFilterChange={setFilter} />
            <SalesCalculator salesData={filteredData} />
            <button className="btn btn-primary" onClick={() => setShowExportModal(true)}>
                Export to PDF
            </button>
            {/* Modal Confirmation for Export */}
            <Modal
                show={showExportModal}
                title="Export to PDF"
                handleClose={() => setShowExportModal(false)}
                onConfirm={handleExportConfirm}
            >
                <p>Are you sure you want to export the report to PDF?</p>
            </Modal>
        </div>
    );
}

export default Accounting;