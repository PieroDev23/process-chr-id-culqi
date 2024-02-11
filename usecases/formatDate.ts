export const formatDateFromTimestamp = (unix: number) => {

    const milliseconds = unix * 1000
    const date = new Date(milliseconds);

    const day = date.getDate();
    const month = date.getMonth() + 1; // Los meses comienzan desde 0, así que sumamos 1
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}


export const formatDateExcel = (xlsxDate: number) => {
    const excelDate = new Date(1900, 0, xlsxDate - 1);

    const day = excelDate.getDate();
    const month = excelDate.getMonth() + 1;
    const year = excelDate.getFullYear();

    return `${day}/${month}/${year}`;
}