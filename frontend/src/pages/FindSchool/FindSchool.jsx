import { Row, Col, Button, Input, Form, Select  } from 'antd'
import "./FindSchool.css"
import FormItem from 'antd/es/form/FormItem'
const FindSchool = () => {
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
          <Form layout='vertical' style={{ background: "#ffff", height:500, padding: 40, borderRadius: 15}}>
            <Row className='form_item_school' gutter={16}>
              <Col span={12}>
                <Form.Item label={<strong>Chọn ngành:</strong>}>
                  <Select placeholder="Chọn ngành..."/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={<strong>Khu vực thành phố:</strong>}>
                  <Select mode='multiple' placeholder="Chọn khu vực thành phố..."/>
                </Form.Item>
              </Col>
            </Row>

            {/* Row 2 */}
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item label={<strong>Khối thi THPT:</strong>}>
                  <Input placeholder='Nhập khối thi (VD: A00, A01,...)'/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={<strong>Tìm theo tên trường:</strong>}>
                  <Input placeholder='Nhập tên trường...' />
                </Form.Item>
              </Col>
            </Row>

            {/* Row 3 */}
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item label={<strong>Tìm theo mức điểm THPT:</strong>} >
                  <Input placeholder='Từ (0-30)' />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="   " >
                  <Input placeholder='Đến (0-30)'/>
                </Form.Item>
              </Col>
            </Row>
            <FormItem  >
              <p style={{ font: "small-caption" }}>Lưu ý: Dữ liệu về điểm chuẩn theo các phương thức xét tuyển của các trường đại học là mới nhất - Năm 2025</p>
            </FormItem>

            <FormItem>
              <Button>Tìm trường</Button>
            </FormItem>
          </Form>
        </Col>
      </Row>

    </>
  )
}

export default FindSchool