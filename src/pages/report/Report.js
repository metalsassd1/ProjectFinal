import React, { useState } from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/navigatorbar";
import TableReport from "./componentPage/tableReport";
import Barchart from "./componentPage/barChart";
import Piechart from "./componentPage/pieChart";
import ExcelJS from "exceljs";
import FileSaver from "file-saver";
import { useRecoilState, useResetRecoilState } from "recoil";
import { isSidebarOpenState } from "../../Recoils/AdminRecoil/AdminHomeRecoil";

function ReportPage(params) {
  const [isSidebarOpen, setIsSidebarOpen] = useRecoilState(isSidebarOpenState);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const exportToExcel = async (data, sheetName, fileName) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(sheetName);

    // Add headers
    const headers = Object.keys(data[0]);
    worksheet.addRow(headers);

    // Add data
    data.forEach((row) => {
      worksheet.addRow(Object.values(row));
    });

    // Style the header row
    worksheet.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };
    worksheet.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF556CCA" },
    };
    worksheet.getRow(1).alignment = {
      horizontal: "center",
      vertical: "middle",
    };

    // Style all cells
    worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
        if (rowNumber !== 1) {
          cell.alignment = { horizontal: "center", vertical: "middle" };
        }
      });
    });

    // Highlight important columns
    const highlightColumns = [
      "ชื่ออุปกรณ์",
      "คลังคงเหลือ",
      "จำนวนที่ถูกยืม",
      "สถานะ",
    ];
    highlightColumns.forEach((colName) => {
      const colIndex = headers.indexOf(colName) + 1;
      if (colIndex > 0) {
        worksheet.getColumn(colIndex).eachCell((cell, rowNumber) => {
          if (rowNumber !== 1) {
            cell.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "FFFFFF00" },
            };
            cell.font = { bold: true };
          }
        });
      }
    });

    // Set column widths
    worksheet.columns.forEach((column, index) => {
      let maxLength = 0;
      column.eachCell({ includeEmpty: true }, (cell) => {
        const columnLength = cell.value ? cell.value.toString().length : 10;
        if (columnLength > maxLength) {
          maxLength = columnLength;
        }
      });
      column.width = maxLength < 10 ? 10 : maxLength;
    });

    // Generate Excel file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    FileSaver.saveAs(blob, `${fileName}.xlsx`);
  };

  const chartContainerStyle = {
    display: "flex",
    justifyContent: "space-between", // this applies the space-between layout
    alignItems: "center", // this centers the charts vertically
    padding: "20px", // add padding as necessary
    margin: "20px 0", // add margin as necessary
  };

  return (
    <div className="m" style={{ background: "#e0e6fc" }}>
      <div
        className="header"
        style={{
          marginLeft: isSidebarOpen ? 200 : 0,
          transition: "margin 0.3s",
        }}
      >
        <div
          className="content-container"
          style={{
            marginLeft: isSidebarOpen ? 300 : 100,
            marginRight: isSidebarOpen ? 70 : 100,
            transition: "margin 0.3s",
          }}
        ></div>
        <div className="Navbar">
          <Navbar onToggleSidebar={handleToggleSidebar} />
        </div>
      </div>
      <div className="Side-bar">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>
      <div
        className="contrainer-main"
        style={{
          marginLeft: isSidebarOpen ? 300 : 100,
          marginRight: isSidebarOpen ? 70 : 100,
          transition: "margin 0.3s",
        }}
      >
        <h1>รายงายสรุปผล</h1>
        <div className="chart-container" style={chartContainerStyle}>
          <Barchart />
          <Piechart />
        </div>
        <div className="tableHome">
          <TableReport exportToExcel={exportToExcel} />
        </div>
      </div>
    </div>
  );
}

export default ReportPage;
