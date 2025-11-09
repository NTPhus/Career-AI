import "./LayoutDefault.css"
import { Col, Row } from 'antd';

const Footer = () => {
  return (
    <div className="footer">
      <Row gutter={20}>
        <Col span={4} offset={2}>
          <h2 className="footer_logo">
            <span style={{ color: "#EAB308" }}>Career</span>
            <span style={{ color: "white" }}>AI</span>
          </h2>
          <p className="footer_logo--content">Trang web ứngAI tạo để phân tích năng lực sở thích và xu hướng của học sinh sinh viên từ đó gợi ý ngành học phù hợp giúp các bạn định hướng nghề nghiệp đúng đắn và xây dựng sự nghiệp bền vững.</p>
        </Col>
        <Col className="list__content" span={6} offset={3}>
          <ul>
            <li>
              Đánh giá nghề nghiệp toàn diện bằng AI
            </li>
            <li>
              Kết nối với các trường đại học
            </li>
            <li>
              Tư vấn thắc mắc cùng AI
            </li>
            <li>
              Hệ thống thân thiện an toàn
            </li>
          </ul>
        </Col>
        <Col className="list__product" span={6} offset={3}>
          <strong>Đội ngũ phát triển</strong>
          <p>Nguyễn Thiên Phú</p>
          <p>Nguyễn Diệu Linh</p>
          <p>Đặng Lê Huy</p>
          <p>Trần Thị Mỹ Dung</p>

        </Col>
      </Row>
      <Row>
        <Col className="copyright" span={12} offset={11}>
         © Coppyright 2025 XD HTT
        </Col>
      </Row>
    </div>
  )
}

export default Footer