import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { gvCreateCourse, gvUpdateCourse } from '~/apis';

export default function AddCourseModal({ show, handleClose }) {
    const [name, setname] = useState('');
    const [gv, setGV] = useState('');
    const [so_tc, setso_tc] = useState(3);
    const [from, setFrom] = useState(1);
    const [to, setTo] = useState(2);
    const [date, setDate] = useState('T2');
    const [year, setyear] = useState('2023-2024');
    const [hocKi, setKiHoc] = useState('1');
    const [desc, setDesc] = useState('');
    const [totalSV, settotalSV] = useState(0);
    const [address, setaddress] = useState('');

    const onSubmit = async () => {
        if (!name || !gv || !so_tc || !from || !to || !date || !year || !hocKi || !address) {
            alert(' Vui long nhap du thong tin');
            return;
        }

        try {
            const course = {
                name,
                gv,
                so_tc: Number(so_tc),
                from,
                to,
                date,
                year,
                hocKi,
                desc,
                address,
                totalSV: Number(totalSV),
            };
            await gvCreateCourse(course);
        } catch (error) {
            alert(error);
        }

        handleClose();
    };

    return (
        <>
            {show && (
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Thêm học phần</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <div className="row">
                                <Form.Group className="mb-3 col-9">
                                    <Form.Label>Tên học phần</Form.Label>
                                    <Form.Control value={name} onChange={(e) => setname(e.target.value)} type="text" />
                                </Form.Group>
                                <Form.Group className="mb-3 col-3" controlId="email">
                                    <Form.Label>Tổng số:</Form.Label>
                                    <Form.Control
                                        value={totalSV}
                                        onChange={(e) => settotalSV(e.target.value)}
                                        type="number"
                                    />
                                </Form.Group>
                            </div>

                            <div className="row">
                                <Form.Group className="mb-3 col-9" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Giáo viên</Form.Label>
                                    <Form.Control value={gv} onChange={(e) => setGV(e.target.value)} type="text" />
                                </Form.Group>
                                <Form.Group className="mb-3 col-3" controlId="email">
                                    <Form.Label>Số tc:</Form.Label>
                                    <Form.Control
                                        value={so_tc}
                                        onChange={(e) => setso_tc(+e.target.value)}
                                        type="number"
                                    />
                                </Form.Group>
                            </div>

                            <div className="row">
                                <Form.Group className="mb-3 col-6" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Kì học</Form.Label>
                                    <Form.Select
                                        value={hocKi}
                                        onChange={(e) => setKiHoc(e.target.value)}
                                        aria-label="Default select example"
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="He">Hè</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3 col-3" controlId="email">
                                    <Form.Label>Năm học: </Form.Label>
                                    <Form.Select value={year} onChange={(e) => setyear(e.target.value)}>
                                        <option value="2023-2024">2023-2024</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3 col-3" controlId="email">
                                    <Form.Label>Phòng học</Form.Label>
                                    <Form.Control
                                        value={address}
                                        onChange={(e) => setaddress(e.target.value)}
                                        type="text"
                                    />
                                </Form.Group>
                            </div>

                            <div className="row">
                                <Form.Group className="mb-3 col-6" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Thời gian trong tuần</Form.Label>
                                    <Form.Select value={date} onChange={(e) => setDate(e.target.value)}>
                                        <option value="T2">T2</option>
                                        <option value="T3">T3</option>
                                        <option value="T4">T4</option>
                                        <option value="T5">T5</option>
                                        <option value="T6">T6</option>
                                        <option value="T7">T7</option>
                                        <option value="CN">CN</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3 col-3" controlId="email">
                                    <Form.Label>Từ tiết</Form.Label>
                                    <Form.Control
                                        value={from}
                                        onChange={(e) => setFrom(+e.target.value)}
                                        type="number"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3 col-3" controlId="email">
                                    <Form.Label>Đến tiết</Form.Label>
                                    <Form.Control value={to} onChange={(e) => setTo(+e.target.value)} type="number" />
                                </Form.Group>
                            </div>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Mô tả</Form.Label>
                                <Form.Control
                                    value={desc}
                                    onChange={(e) => setDesc(e.target.value)}
                                    as="textarea"
                                    rows={3}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={onSubmit}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
}
