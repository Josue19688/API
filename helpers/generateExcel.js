
const exceljs = require('exceljs');

const excel=(data)=>{

   
   
    let workBook = new exceljs.Workbook();
    let worksheet=workBook.addWorksheet('Worksheet');
    let columns = data.reduce((acc,obj) => acc = Object.getOwnPropertyNames(obj),[]);

   

    worksheet.columns=columns.map((el)=>{
        return {header:el,key:el,width:20}
    });

    worksheet.addRows(data);
    return workBook;
}

module.exports={
    excel
}