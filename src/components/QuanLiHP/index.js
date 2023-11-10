import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import { gvGetListCourse } from '~/apis';
import HocPhan from '../HocPhan';
import AddCourseModal from '../modals/AddCoure';
import styles from './QuanliHP.module.scss';

const cx = classNames.bind(styles);

function QuanLiHP() {
    const [show, setShow] = useState(false);
    const [refetch, setRefetch] = useState(false);
    const [search, setSearch] = useState('');

    const [courses, setCourses] = useState([]);

    const handleClose = () => {
        setShow(false);
        setRefetch(!refetch);
    };

    const handleShow = () => {
        setShow(true);
    };

    useEffect(() => {
        gvGetListCourse(search).then((data) => {
            setCourses(data);
        });
    }, [refetch, search]);

    return (
        <div>
            <div className="col col-5">
                <h1>Danh sách Học Phần</h1>
            </div>
            <div classNames="d-flex align-item-center">
                <div className="ms-4 col col-6 d-flex">
                    <Form.Control
                        style={{ width: 400 }}
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Tìm kiếm"
                    />
                    <Button variant="primary" className="ms-5" onClick={handleShow}>
                        Thêm khóa học
                    </Button>
                </div>
            </div>
            <Row className="">
                {courses.map((course) => (
                    <HocPhan
                        handleShow={handleShow}
                        key={course.id}
                        data={course}
                        reload={() => setRefetch(!refetch)}
                        show={show}
                        handleClose={handleClose}
                    />
                ))}
            </Row>

            {show && <AddCourseModal show={show} handleClose={handleClose} />}
        </div>
    );
}

export default QuanLiHP;
