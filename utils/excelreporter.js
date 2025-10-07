import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import os from 'os';

// Persistent folder: project root or Desktop
const reportsDir = path.join(os.homedir(), 'PlaywrightReports');
if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });

export function saveResultsToExcel(results) {
  const fileName = `test-results-${new Date().toISOString().replace(/[:.]/g, '-')}.xlsx`;
  const filePath = path.join(reportsDir, fileName);

  const workbook = XLSX.utils.book_new();
  const data = [['Test Name', 'Status', 'Message', 'Timestamp']];
  results.forEach(r => data.push([r.name, r.status, r.message, r.timestamp]));

  const worksheet = XLSX.utils.aoa_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Results');
  XLSX.writeFile(workbook, filePath);

  console.log(`✅ Test results saved permanently: ${filePath}`);
}
