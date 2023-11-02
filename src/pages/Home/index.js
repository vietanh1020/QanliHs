import React, { useState } from 'react';
import Papa from 'papaparse';

function CSVReader() {
    const [csvData, setCSVData] = useState([]);

    console.log(csvData);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            Papa.parse(file, {
                complete: (result) => {
                    setCSVData(result.data);
                },
                header: true, // If the CSV has a header row
                skipEmptyLines: true, // Skip empty lines
            });
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between mt-5">
                <h2>Import from CSV</h2>
                <input type="file" accept=".csv" onChange={handleFileChange} />
            </div>

            <table>
                <thead>
                    <tr>
                        {csvData[0] && Object.keys(csvData[0]).map((header, index) => <th key={index}>{header}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {csvData.map((row, index) => (
                        <tr key={index}>
                            {Object.values(row).map((value, index) => (
                                <td key={index}>{value}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <button>Save</button>
        </div>
    );
}

export default CSVReader;