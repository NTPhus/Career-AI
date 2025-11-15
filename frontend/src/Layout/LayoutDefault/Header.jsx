import { Row, Col } from 'antd'
import "./LayoutDefault.css"
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <div className='headerStyle'>
      <Row className='header'>
        <Col className='header_logo' span={6} >
          <h2>
            <span style={{ color: "#EAB308" }}>Carrer</span>
            <span>AI</span>
          </h2>
        </Col>
        <Col span={2}>

        </Col>
        <Col className='Navigate' span={8}>

          <div><Link to="/">Trang Chủ</Link></div>
          <div><Link to="/major-suggestion">Gợi ý ngành</Link></div>
          <div><Link to="/find-school">Tìm trường</Link></div>
          <div><Link to="/chatAI">Tư vấn AI</Link></div>

        </Col>
      </Row>

    </div>
  )
}

export default Header