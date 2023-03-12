import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import 'moment/locale/pt-br';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  generateExcelLinhas(dataSource: any) {
    const data = dataSource;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Linhas', { views: [{ state: "frozen", ySplit: 1 }] });

    worksheet.columns = [
      { header: 'cod_linha', key: 'cl', width: 17 },
      { header: 'circular', key: 'lc', width: 17 },
      { header: 'letreiro_num_linha', key: 'lt', width: 17 },
      { header: 'letreiro_cod_linha', key: 'tl', width: 17 },
      { header: 'sentido_linha', key: 'sl', width: 17 },
      { header: 'terminal_principal', key: 'tp', width: 20 },
      { header: 'terminal_secundario', key: 'ts', width: 20 },
    ]

    var moment = require('moment-timezone');

    data.forEach((element) => {

      worksheet.addRow(
        {
          'cl': element.cl,
          'lc': element.lc === true ? 'Sim' : 'Não',
          'lt': element.lt,
          'tl': element.tl,
          'sl': element.sl === 1 ? element.ts : element.tp,
          'tp': element.tp,
          'ts': element.ts,
        }).font = { name: 'Gill Sans MT', family: 4, size: 10 };

    })

    worksheet.eachRow((row, rowNumber) => {

      row.eachCell((cell, colNumber) => {
        if (rowNumber == 1) {
          // First set the background of header row
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'e2001a' }
          };
          cell.font = { name: 'Gill Sans MT', family: 4, size: 10, color: { argb: 'FFFFFF' }, bold: true }
        };
      })
      //Commit the changed row to the stream
      row.commit();
    });

    worksheet.autoFilter = 'A1:G1';

    var agora = moment(new Date()).format('YYYYMMDD_HHmmss')

    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, `SPTrans_Linhas_${agora}.xlsx`);
    });

  }


}
