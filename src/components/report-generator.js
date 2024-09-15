import React from 'react';
import generatePDF from '../utils/pdf';

function ReportGenerator({ salesData }) {
    const handleExport = () => {
        const content = salesData.map(data => `${data.date}: $${data.amount}`).join('\n');
        generatePDF(content);
    };

    return (
        <button className="btn btn-primary" onClick={handleExport}>
            Export to PDF
        </button>
    );
}

export default ReportGenerator;