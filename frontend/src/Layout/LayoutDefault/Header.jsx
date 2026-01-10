import { Row, Col } from "antd";
import "./LayoutDefault.css";
import { Link, NavLink } from "react-router-dom";
const Header = () => {
  return (
    <div className="headerStyle">
      <Row className="header">
        <Col className="header_logo" span={6}>
          <h2>
            <span style={{ color: "#EAB308" }}>Carrer</span>
            <span>AI</span>
          </h2>
        </Col>
        <Col span={2}></Col>
        <Col className="Navigate" span={8}>
          <div>
            <NavLink to="/" className="nav-item">
              Trang Chủ
            </NavLink>
          </div>
          <div>
            <NavLink className="nav-item" to="/major-suggestion">
              Gợi ý ngành
            </NavLink>
          </div>
          <div>
            <NavLink to="/find-school" className="nav-item">
              Tìm trường
            </NavLink>
          </div>
          <div>
            <NavLink to="/chatAI" className="nav-item">
              Tư vấn AI
            </NavLink>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
