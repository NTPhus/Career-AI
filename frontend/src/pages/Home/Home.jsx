import { Row, Col, Button } from 'antd'
import "./Home.css"
import { ArrowRightOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <div className='main'>
        <div className='sologan'>

          <Row span>
            <Col span={18}>
              <h1 style={{ color: "white" }} className=''>HỌC ĐÚNG NGÀNH LÀM ĐÚNG NGHỀ</h1>
              <p className='sologan_text'>cùng AI dẫn lối sự nghiệp - vững bước tương lai!</p>
            </Col>
          </Row>

          <div className='btn'>
            <Row span={8}>
              <Link to="/major-suggestion">
                <button className='btn_khampha'>Khám phá ngành ngay
                  <ArrowRightOutlined style={{ marginLeft: "20px" }} />
                </button></Link>

            </Row>

            <Row span={8}>
              <Link to="/chatAI">
                <button className='btn_ai'>
                  Tư vấn AI
                </button></Link>

            </Row>
          </div>
        </div>

      </div>
    </>
  )
}

export default Home