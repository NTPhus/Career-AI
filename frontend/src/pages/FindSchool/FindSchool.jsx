import { Row, Col, Button, Input,InputNumber, Form, Select  } from 'antd'
import "./FindSchool.css"
import FormItem from 'antd/es/form/FormItem'
import ResultSchool from './components/ResultSchool'
import { useEffect, useState } from 'react'
import { getAllLocation } from '../../services/locationService'
const FindSchool = () => {
  const [location, setLocation] = useState([])

useEffect(() => {
  const fetchLocation = async () => {
    const res = await getAllLocation();
    const options = res.map(item => ({
      label: item.name,
      value: item.name
    }));
    setLocation(options);
  };
  fetchLocation();
}, []);


 console.log(location)
  const onFinish = (values) => {
  console.log('Success:', values);
};
  return (
    <>
      <Row className='find__school'>
        <Col span={6} ></Col>
        <Col span={6} style={{marginTop: "10%", marginLeft:30}} >
          <h1 style={{color:"white"}}>Tìm trường</h1>
          <p className='text_find_school'>Biết mình làm gì</p>
          <p style={{marginLeft:30}} className='text_find_school'> - Học đâu cũng được </p>
        </Col>

        <Col span={10} style={{
          display: "flex",
          justifyContent: "center",  // căn giữa ngang
          alignItems: "center",
          marginLeft: 60,       // căn giữa dọc
        }}>
          <Form  onFinish={onFinish} layout='vertical' style={{ background: "#ffff", height:500, padding: 40, borderRadius: 15}}>
            <Row className='form_item_school' gutter={16}>
              <Col span={12}>
                <Form.Item name='tenNganh' label={<strong>Chọn ngành:</strong>}>
                  <Input placeholder="Chọn ngành..."/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name='location' label={<strong>Khu vực thành phố:</strong>}>
                  <Select allowClear options={location} mode='multiple' placeholder="Chọn khu vực thành phố..."/>
                </Form.Item>
              </Col>
            </Row>

            {/* Row 2 */}
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item name='combinations' label={<strong>Khối thi THPT:</strong>}>
                  <Input placeholder='Nhập khối thi (VD: A00, A01,...)'/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name='tenTruong' label={<strong>Tìm theo tên trường:</strong>}>
                  <Input placeholder='Nhập tên trường...' />
                </Form.Item>
              </Col>
            </Row>

            {/* Row 3 */}
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item name='diemtu'label={<strong>Tìm theo mức điểm THPT:</strong>} >
                  <InputNumber  min={0} max={30} style={{width: 260}} placeholder='Từ (0-30)' />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name='diemden' label="   " >
                  <InputNumber  min={0} max={30} style={{width: 260}} placeholder='Đến (0-30)'/>
                </Form.Item>
              </Col>
            </Row>
            <FormItem  >
              <p style={{ font: "small-caption" }}>
                <span style={{color:"red"}}>** </span>
                Lưu ý: Dữ liệu về điểm chuẩn theo các phương thức xét tuyển của các trường đại học là mới nhất - Năm 2025
                </p>
            </FormItem>

            <FormItem>
              <button type='submit' className='btn_timTruong'>Tìm trường</button>
            </FormItem>
          </Form>
        </Col>
      </Row>

      {/* Trả bảngg kết quả */}
      <Row>
        <ResultSchool/>
      </Row>

    </>
  )
}

export default FindSchool