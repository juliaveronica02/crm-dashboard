export const getStartOfWeek = (date) => {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay());
    return start.toISOString().split('T')[0];
};

export const getStartOfMonth = (date) => {
    const start = new Date(date);
    start.setDate(1);
    return start.toISOString().split('T')[0];
};