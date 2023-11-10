import { Button, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { gvGetDiem, gvSearchDiemSV, gvUpdateCourse, gvUpdateDiemSv } from '~/apis';
import styles from './bangdiem.module.scss';
import Papa from 'papaparse';
import classNames from 'classnames/bind';
import AddSinhVienModals from '../modals/AddSvDiem';
const cx = classNames.bind(styles);

function BangDiemHp() {
    const { id } = useParams();
    const [data, setdata] = useState([]);
    const [search, setSearch] = useState('');
    const [show, setShow] = useState(false);
    const [csvData, setCSVData] = useState([]);
    const [refetch, setRefetch] = useState(false);

    const handleClose = () => {
        setShow(false);
        setRefetch(!refetch);
    };

    useEffect(() => {
        // Truy cập API và lấy dữ liệu khi component được render
        const fetchData = async () => {
            try {
                let response = await gvGetDiem(id);
                if (search !== '') {
                    response = await gvSearchDiemSV(id, search);
                }
                setdata(response);
            } catch (error) {
                console.error('Lỗi lấy dữ liệu', error);
            }
        };
        fetchData();
    }, [data, id, search, refetch]);
    const handleShow = () => {
        setShow(true);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setShow(false);
            Papa.parse(file, {
                complete: (result) => {
                    setCSVData(result.data);
                },
                header: true, // If the CSV has a header row
                skipEmptyLines: true, // Skip empty lines
            });
            // setValuef(e.target.files[0].name);
            // setdata(csvData);
        }
    };

    const handleSave = () => {
        let dataUp = [];
        csvData.slice(0).forEach((values) => {
            const dataValues = Object.values(values);
            if (dataValues[1] !== '') {
                dataUp.push({
                    classN: dataValues[1],
                    email: dataValues[2],
                    firstName: dataValues[3],
                    lastName: dataValues[4],
                    middle: parseFloat(dataValues[5].replace(',', '.')),
                    final: parseFloat(dataValues[6].replace(',', '.')),
                });
            }
        });
        try {
            gvUpdateDiemSv(id, dataUp);
            alert('Update thành công');
            setRefetch(!refetch);
        } catch {
            alert('Lỗi Update');
        }
    };

    const handleCancel = () => {
        setCSVData([]);
    };
    return (
        <div>
            <div className="col col-5">
                <h1>Bảng điểm môn học</h1>
            </div>
            <div classNames="d-flex align-item-center">
                <div className="ms-4 col col-12 d-flex">
                    <Form.Control
                        style={{ width: 400 }}
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Tìm kiếm"
                    />
                    {/* {!data.length && */}
                    <div className="d-flex">
                        <div className="d-flex justify-content-between" style={{ marginLeft: 30 }}>
                            <input type="file" accept=".csv" onChange={handleFileChange} />
                        </div>
                        {/* <UploadDiemModal show={show} handleClose={() => setShow(false)} csvData={csvData}></UploadDiemModal> */}
                        {csvData.length ? (
                            <>
                                <Button variant="primary" onClick={handleSave}>
                                    Save Changes
                                </Button>
                                <Button style={{ marginLeft: 30 }} variant="warning" onClick={handleCancel}>
                                    Cancel
                                </Button>
                            </>
                        ) : (
                            <></>
                        )}
                    </div>
                    {/* } */}
                    {!csvData.length && (
                        <Button style={{ marginLeft: 30 }} variant="primary" onClick={handleShow}>
                            Thêm sinh viên
                        </Button>
                    )}
                    {show && <AddSinhVienModals id={id} show={show} handleClose={handleClose} />}
                </div>
                {csvData.length ? (
                    <table>
                        <thead>
                            <tr>
                                {csvData[0] &&
                                    Object.keys(csvData[0]).map((header, index) => <th key={index}>{header}</th>)}
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
                ) : data.length ? (
                    <div className="row d-flex align-items-center">
                        <table className={cx('table-score')} style={{ margin: 30 }}>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Họ đệm</th>
                                    <th>Tên</th>
                                    <th>Lớp</th>
                                    <th>MSV</th>
                                    <th>Điểm QT</th>
                                    <th>Điểm Thi</th>
                                    <th>Điểm KT</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((row, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{row.user.firstName}</td>
                                        <td>{row.user.lastName}</td>
                                        <td>{row.user.class}</td>
                                        <td>{row.user.email}</td>
                                        <td>{row.middle}</td>
                                        <td>{row.final}</td>
                                        <td>{row.total}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}

export default BangDiemHp;
