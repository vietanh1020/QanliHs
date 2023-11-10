import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { gvGetDiem } from '~/apis';

function BangDiemLopHoc() {
    const [csvData, setCSVData] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            try {
                gvGetDiem(id).then((data) => {
                    setCSVData(data);
                });
            } catch (error) {
                alert('Lỗi API' + error);
            }
        }
    }, [id]);

    return (
        <div>
            <div className="d-flex justify-content-between mt-5">
                <h2>Bảng điểm Sinh Vien</h2>
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
        </div>
    );
}

export default BangDiemLopHoc;
