import { gvDeleteCourse, gvGetCourse } from '~/apis';
import UpdateCourseModal from '../modals/UpdateCourse';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HocPhan({ data, reload }) {
    const [showModal, setShowModal] = useState(false);
    const [courseData, setCourseData] = useState(null);

    useEffect(() => {
        // Truy cập API và lấy dữ liệu khi component được render
        const fetchData = async () => {
            try {
                const response = await gvGetCourse(data.id);
                setCourseData(response);
            } catch (error) {
                console.error('Lỗi lấy dữ liệu', error);
            }
        };
        fetchData();
    }, [data.id]);

    const navigate = useNavigate();
    const handleClick = (id) => {
        navigate('/admin/score/' + id);
    };
    return (
        <div className="card col col-xl-3 col-6 mx-4 my-4">
            <img src="https://img.lovepik.com/photo/40015/9423.jpg_wh860.jpg" className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{data.TenMH}</h5>
                <div className="d-flex justify-content-between">
                    <p className="card-text">Tên MH: {data.name}</p>
                    <p className="card-text ">Số tín chỉ: {data.so_tc}</p>
                </div>
                <div className="d-flex justify-content-between">
                    <p className="card-text">Kì học: {data.hocKi}</p>
                    <p className="card-text">Năm học: {data.year}</p>
                </div>
                <p className="card-text">Phòng học: {data.address}</p>
                <p className="card-text">Giáo viên phụ trách: {data.gv}</p>
                <p className="card-text">
                    Thòi gian học: {data.date} tiết {data.from} - {data.to}
                </p>
                <p className="card-text">Tổng số: {data.totalSV} sinh viên</p>
                <div className="d-flex justify-content-between">
                    <button
                        onClick={() => {
                            handleClick(data.id);
                        }}
                        className="btn btn-primary"
                    >
                        Xem
                    </button>
                    <button onClick={() => setShowModal(true)} className="btn btn-warning">
                        Sửa
                    </button>

                    <button
                        onClick={async () => {
                            const shouldDelete = window.confirm('Bạn có chắc chắn muốn xóa môn học này?');
                            if (shouldDelete) {
                                try {
                                    await gvDeleteCourse(data.id);
                                    reload();
                                } catch {
                                    alert('Lỗi xóa');
                                }
                            }
                        }}
                        className="btn btn-danger"
                    >
                        Xóa
                    </button>
                </div>
            </div>
            {showModal && (
                <UpdateCourseModal
                    show={showModal}
                    handleClose={() => {
                        setShowModal(false);
                        reload();
                    }}
                    data={courseData}
                />
            )}
        </div>
    );
}

export default HocPhan;
