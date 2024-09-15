import jsPDF from 'jspdf';

const generatePDF = (content) => {
    const doc = new jsPDF();
    doc.text(content, 10, 10);
    doc.save('report.pdf');
};

export default generatePDF;