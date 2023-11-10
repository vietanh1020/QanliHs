import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { deleteStudent, getStudent } from '~/apis';
import SinhVienModal from '../modals/SinhVien';
import styles from './QuanLiSV.module.scss';

const cx = classNames.bind(styles);

function QuanLiSV() {
    // const [selectedClass, setSelectedClass] = useState('');
    const [refetch, setRefetch] = useState(true);
    const [show, setShow] = useState(false);
    const [search, setSearch] = useState('');
    const [students, setStudents] = useState([]);

    const handleClose = () => {
        setShow(false);
        setRefetch(!refetch);
    };

    const handleDelete = async (id) => {
        const shouldDelete = window.confirm('Bạn có chắc chắn muốn xóa sinh viên này?');
        if (shouldDelete) {
            try {
                await deleteStudent(id);
                setRefetch(!refetch);
            } catch {
                alert('Sinh viên đang trong danh sách môn học');
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await getStudent(search);
                setStudents(response);
            } catch (error) {
                console.error('Lỗi lấy dữ liệu', error);
            }
        };
        fetchData();
    }, [refetch, search]);

    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title')}>Danh sách sinh viên</h1>
            <div className={cx('info-lop')}>
                <Form.Control
                    style={{ width: 400 }}
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Tìm kiếm"
                />
                {/* <select
                    className={cx('btn-chon')}
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                >
                    <option value="">Chọn lớp</option>
                    <option value="CNTT1">CNTT1</option>
                    <option value="CNTT2">CNTT2</option>
                </select> */}
                <Button onClick={() => setShow(true)} className={cx('btn-them')}>
                    Thêm sinh viên
                </Button>
            </div>

            <div className={cx('ds-sinhvien')}>
                <table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã sinh viên</th>
                            <th>Họ đệm</th>
                            <th>Tên</th>
                            <th>Lớp</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{student.email}</td>
                                <td>{student.firstName}</td>
                                <td>{student.lastName}</td>
                                <td>{student.class}</td>
                                {/* <td>{(student.sex = 1 ? 'Nam' : 'Nữ')}</td> */}
                                {/* <td>{student.GPA}</td> */}
                                <td>
                                    <Button>Chi tiết</Button>
                                    <Button onClick={() => handleDelete(student.id)} className={cx('delete')}>
                                        Xóa
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {show && <SinhVienModal show={show} handleClose={handleClose} />}
        </div>
    );
}

export default QuanLiSV;
