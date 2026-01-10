import { Row, Col, Button, Input, InputNumber, Form, Select } from "antd";
import "./FindSchool.css";
import FormItem from "antd/es/form/FormItem";
import ResultSchool from "./components/ResultSchool";
import { useEffect, useState } from "react";
import { getAllLocation } from "../../services/locationService";
import { getListMajor } from "../../services/majorService";
import { findUniversity } from "../../services/schoolService";
import { useSearchParams } from "react-router-dom";
const FindSchool = () => {
  const [location, setLocation] = useState([]);
  const [majors, setMajors] = useState([]);
  const [universities, setUniversites] = useState([]);
  const [check, setCheck] = useState([]);

  const [searchParams] = useSearchParams();
  let majorName = searchParams.get("majorName");
  if (majorName) {
    majorName = majorName.split(",");
    if (majorName[majorName.length - 1] === "") majorName.pop();
  } else {
    majorName = null;
  }

  useEffect(() => {
    const fetchLocation = async () => {
      const res = await getAllLocation();
      const options = res.map((item) => ({
        label: item.name,
        value: item.name,
      }));
      setLocation(options);
    };
    fetchLocation();
  }, []);

  useEffect(() => {
    const fetchMajors = async () => {
      const res = await getListMajor();
      const options = res.map((item) => ({
        label: item.name,
        value: item.name,
      }));
      setMajors(options);
    };
    fetchMajors();
  }, []);

  const onFinish = async (values) => {
    console.log(values);
    const res = await findUniversity(values);
    setUniversites(res);
    setCheck(true);
  };

  if (majorName) {
    useEffect(() => {
      const fetchUniversities = async () => {
        let majorQuery = {
          tenNganh: majorName,
        };
        console.log(majorQuery);
        const res = await findUniversity(majorQuery);
        setUniversites(res);
        setCheck(true);
      };
      fetchUniversities();
    }, majorName);
  }

  return (
    <>
      <Row className="find__school">
        <Col span={6}></Col>
        <Col span={6} style={{ marginTop: "10%", marginLeft: 30 }}>
          <h1 style={{ color: "white" }}>Tìm trường</h1>
          <p className="text_find_school">Biết mình làm gì</p>
          <p style={{ marginLeft: 30 }} className="text_find_school">
            {" "}
            - Học đâu cũng được{" "}
          </p>
        </Col>

        <Col
          span={10}
          style={{
            display: "flex",
            justifyContent: "center", // căn giữa ngang
            alignItems: "center",
            marginLeft: 60, // căn giữa dọc
          }}
        >
          <Form
            onFinish={onFinish}
            layout="vertical"
            style={{
              background: "#ffff",
              minHeight: 500,
              padding: 40,
              borderRadius: 15,
            }}
            initialValues={{
              tenNganh: majorName,
            }}
          >
            <Row className="form_item_school" gutter={16}>
              <Col span={12}>
                <Form.Item name="tenNganh" label={<strong>Chọn ngành:</strong>}>
                  <Select
                    allowClear
                    options={majors}
                    mode="multiple"
                    placeholder="Chọn ngành..."
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="location"
                  label={<strong>Khu vực thành phố:</strong>}
                >
                  <Select
                    allowClear
                    options={location}
                    mode="multiple"
                    placeholder="Chọn khu vực thành phố..."
                  />
                </Form.Item>
              </Col>
            </Row>

            {/* Row 2 */}
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item
                  name="combinations"
                  label={<strong>Khối thi THPT:</strong>}
                >
                  <Input placeholder="Nhập khối thi (VD: A00, A01,...)" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="tenTruong"
                  label={<strong>Tìm theo tên trường:</strong>}
                >
                  <Input placeholder="Nhập tên trường..." />
                </Form.Item>
              </Col>
            </Row>

            {/* Row 3 */}
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item
                  name="diemtu"
                  label={<strong>Tìm theo mức điểm THPT:</strong>}
                >
                  <InputNumber
                    min={0}
                    max={30}
                    style={{ width: 260 }}
                    placeholder="Từ (0-30)"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="diemden" label="   ">
                  <InputNumber
                    min={0}
                    max={30}
                    style={{ width: 260 }}
                    placeholder="Đến (0-30)"
                  />
                </Form.Item>
              </Col>
            </Row>
            <FormItem>
              <p style={{ font: "small-caption" }}>
                <span style={{ color: "red" }}>** </span>
                Lưu ý: Dữ liệu về điểm chuẩn theo các phương thức xét tuyển của
                các trường đại học là mới nhất - Năm 2025
              </p>
            </FormItem>

            <FormItem>
              <button type="submit" className="btn_timTruong">
                Tìm trường
              </button>
            </FormItem>
          </Form>
        </Col>
      </Row>

      {/* Trả bảngg kết quả */}
      {check == true && (
        <Row style={{justifyContent:"center"}}>
          {universities.length > 0 ? (
            <>
              <ResultSchool prop={universities} />
            </>
          ) : (
            <>
              <p className="content_result">Không tìm thấy trường phù hợp</p>
            </>
          )}
        </Row>
      )}
    </>
  );
};

export default FindSchool;
