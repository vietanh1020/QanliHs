import Papa from 'papaparse';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { svGetDiem } from '~/apis';

function SvHome() {
    const [csvData, setCSVData] = useState([]);
    const [show, setShow] = useState(false);
    const [cookie, setCookie] = useCookies(['user']);
    const navigate = useNavigate();

    useEffect(() => {
        if (cookie.user.role === 1) navigate('/admin');
    }, [cookie.user]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setShow(true);
            Papa.parse(file, {
                complete: (result) => {
                    setCSVData(result.data);
                },
                header: true, // If the CSV has a header row
                skipEmptyLines: true, // Skip empty lines
            });
        }
    };

    useEffect(() => {
        svGetDiem(cookie.user.id).then((data) => {
            setCSVData(data);
        });
    }, []);

    return (
        <div>
            <h1>Bảng Điểm sinh viên</h1>
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

export default SvHome;
